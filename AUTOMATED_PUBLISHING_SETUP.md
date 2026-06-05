# 自動發佈系統設置指南

## 概述

本文檔說明如何設置自動發佈系統，使用 Heartbeat 定時任務在預定時間自動發佈文章。

---

## 第一部分：系統架構

### 組件

1. **數據庫層**
   - `blogPosts` 表的 `publishedAt` 欄位
   - `isPublished` 布爾值控制發佈狀態

2. **後端層**
   - tRPC 路由：文章管理和發佈
   - Heartbeat 定時任務：自動發佈

3. **前端層**
   - 發佈日程管理界面
   - 文章列表（只顯示已發佈）

### 數據流

```
計畫的發佈時間 → Heartbeat 觸發 → 後端任務執行 → 數據庫更新 → 前端顯示
```

---

## 第二部分：後端實現

### 1. 建立發佈任務的 tRPC 路由

在 `server/routers.ts` 中添加以下代碼：

```typescript
// 發佈文章
export const blog = router({
  // ... 現有路由

  // 發佈文章（受保護，僅管理員）
  publishArticle: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const now = new Date();
      const result = await db
        .update(blogPosts)
        .set({
          isPublished: true,
          publishedAt: now,
          updatedAt: now,
        })
        .where(eq(blogPosts.id, input.id));

      return { success: true, publishedAt: now };
    }),

  // 獲取待發佈文章
  getScheduledArticles: protectedProcedure
    .query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const now = new Date();
      const articles = await db
        .select()
        .from(blogPosts)
        .where(
          and(
            eq(blogPosts.isPublished, false),
            lte(blogPosts.publishedAt, now)
          )
        )
        .orderBy(blogPosts.publishedAt);

      return articles;
    }),

  // 更新文章發佈時間
  updatePublishTime: protectedProcedure
    .input(z.object({
      id: z.number(),
      publishedAt: z.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const result = await db
        .update(blogPosts)
        .set({
          publishedAt: input.publishedAt,
          updatedAt: new Date(),
        })
        .where(eq(blogPosts.id, input.id));

      return { success: true };
    }),
});
```

### 2. 建立 Heartbeat 回調處理器

在 `server/_core/index.ts` 中添加以下代碼：

```typescript
import { sdk } from "./sdk";
import { db } from "../db";
import { blogPosts } from "../../drizzle/schema";
import { eq, and, lte } from "drizzle-orm";

// 自動發佈文章的 Heartbeat 回調
app.post("/api/scheduled/publish-articles", async (req, res) => {
  try {
    const user = await sdk.authenticateRequest(req);
    
    // 確認這是一個 cron 請求
    if (!user.isCron) {
      return res.status(403).json({ error: "cron-only" });
    }

    const now = new Date();
    
    // 查找所有應該發佈的文章（已過期且未發佈）
    const articlesToPublish = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.isPublished, false),
          lte(blogPosts.publishedAt, now)
        )
      );

    if (articlesToPublish.length === 0) {
      return res.json({ ok: true, published: 0 });
    }

    // 發佈所有待發佈的文章
    const publishedIds = articlesToPublish.map(a => a.id);
    
    await db
      .update(blogPosts)
      .set({
        isPublished: true,
        updatedAt: now,
      })
      .where(
        and(
          eq(blogPosts.isPublished, false),
          lte(blogPosts.publishedAt, now)
        )
      );

    // 記錄發佈事件
    console.log(`[Auto-Publish] Published ${publishedIds.length} articles at ${now}`);

    // 可選：發送通知給管理員
    await notifyOwner({
      title: "📰 文章已自動發佈",
      content: `已自動發佈 ${publishedIds.length} 篇文章。\n\nID: ${publishedIds.join(', ')}`,
    });

    return res.json({
      ok: true,
      published: publishedIds.length,
      articleIds: publishedIds,
      timestamp: now,
    });
  } catch (error) {
    console.error("[Auto-Publish Error]", error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      context: { url: req.url },
      timestamp: new Date(),
    });
  }
});
```

---

## 第三部分：設置 Heartbeat 定時任務

### 方法 1：使用 CLI 創建定時任務（推薦）

在部署前，運行以下命令創建定時任務：

```bash
# 每小時檢查一次是否有待發佈的文章
manus-heartbeat create \
  --name publish-scheduled-articles \
  --cron "0 * * * * *" \
  --path /api/scheduled/publish-articles \
  --description "自動發佈已排期的文章"
```

**Cron 表達式說明**：
- `0 * * * * *` = 每小時的第 0 分鐘執行
- 也可以改為 `0 0 * * * *` = 每天午夜執行
- 或 `0 9 * * * *` = 每天上午 9 點執行

### 方法 2：通過 tRPC 創建定時任務

在管理員界面中添加以下代碼：

```typescript
import { parse as parseCookie } from "cookie";
import { COOKIE_NAME } from "@shared/const";
import { createHeartbeatJob } from "../_core/heartbeat";

const sessionToken = parseCookie(ctx.req.headers.cookie ?? "")[COOKIE_NAME] ?? "";

const job = await createHeartbeatJob({
  name: "publish-scheduled-articles",
  cron: "0 * * * * *", // 每小時執行
  path: "/api/scheduled/publish-articles",
  description: "自動發佈已排期的文章",
}, sessionToken);

// 保存 taskUid 到數據庫或配置中
```

---

## 第四部分：前端實現

### 1. 發佈日程管理組件

創建 `client/src/pages/PublishingSchedule.tsx`：

```typescript
import { useEffect, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

export default function PublishingSchedule() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const scheduledArticles = trpc.blog.getScheduledArticles.useQuery();
  const publishArticle = trpc.blog.publishArticle.useMutation();
  const updatePublishTime = trpc.blog.updatePublishTime.useMutation();

  useEffect(() => {
    if (scheduledArticles.data) {
      setArticles(scheduledArticles.data);
      setLoading(false);
    }
  }, [scheduledArticles.data]);

  const handlePublishNow = async (id: number) => {
    await publishArticle.mutateAsync({ id });
    scheduledArticles.refetch();
  };

  const handleUpdateTime = async (id: number, newTime: Date) => {
    await updatePublishTime.mutateAsync({
      id,
      publishedAt: newTime,
    });
    scheduledArticles.refetch();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">發佈日程管理</h1>

      {loading ? (
        <p>加載中...</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-500">沒有待發佈的文章</p>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{article.titleTw}</h3>
                  <p className="text-sm text-gray-500">
                    計畫發佈時間：{format(
                      new Date(article.publishedAt),
                      'yyyy-MM-dd HH:mm',
                      { locale: zhTW }
                    )}
                  </p>
                </div>
                <div className="space-x-2">
                  <Button
                    onClick={() => handlePublishNow(article.id)}
                    size="sm"
                  >
                    立即發佈
                  </Button>
                  <Button
                    onClick={() => {
                      const newTime = new Date(
                        new Date().getTime() + 24 * 60 * 60 * 1000
                      );
                      handleUpdateTime(article.id, newTime);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    延後 24 小時
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 2. 在博客列表中隱藏未發佈文章

修改 `client/src/pages/Blog.tsx`：

```typescript
// 只顯示已發佈的文章
const visibleArticles = SAMPLE_ARTICLES.filter(
  article => article.isPublished && new Date(article.publishedAt) <= new Date()
);
```

---

## 第五部分：12 週發佈計畫的實施

### 第 1 週（6 月 9 日）

**文章 1**：AI 時代的網頁設計
```sql
INSERT INTO blog_posts (
  slug, title_tw, excerpt_tw, content_tw, category, 
  is_published, published_at, created_at
) VALUES (
  'ai-web-design-2026',
  'AI 時代的網頁設計：從 ChatGPT 到 Perplexity 的設計新機遇',
  '在 2026 年，AI 已不再是未來科技...',
  '[完整文章內容]',
  'Design',
  false,
  '2026-06-09 09:00:00',
  NOW()
);
```

### 第 1 週（6 月 16 日）

**文章 2**：為什麼 AI 看不懂你的網站
```sql
INSERT INTO blog_posts (
  slug, title_tw, excerpt_tw, content_tw, category,
  is_published, published_at, created_at
) VALUES (
  'ai-structured-data-geo',
  '為什麼 AI 看不懂你的網站？結構化數據與 GEO 優化指南',
  '你的網站對人類訪客來說可能看起來完美...',
  '[完整文章內容]',
  'SEO',
  false,
  '2026-06-16 09:00:00',
  NOW()
);
```

（以此類推，為所有 12 篇文章設置相應的發佈時間）

---

## 第六部分：監測和維護

### 監測指標

1. **發佈成功率**
   - 監測 Heartbeat 任務的執行成功率
   - 查看 `/api/scheduled/publish-articles` 的日誌

2. **發佈時間準確性**
   - 確認文章在計畫時間發佈
   - 允許 1-5 分鐘的誤差

3. **用戶反應**
   - 監測新文章的訪問量
   - 追蹤 AI 系統的引用

### 故障排查

**問題 1**：文章沒有按時發佈
- 檢查 Heartbeat 任務是否正在運行
- 檢查 `isPublished` 和 `publishedAt` 欄位的值
- 檢查時區設置

**問題 2**：Heartbeat 任務失敗
- 查看錯誤日誌
- 檢查數據庫連接
- 確認 API 端點可訪問

**問題 3**：文章發佈後不顯示
- 清除前端緩存
- 檢查前端過濾邏輯
- 檢查 SEO 元數據是否正確

---

## 第七部分：優化建議

### 1. 提前發佈通知

在文章發佈前 24 小時發送通知：

```typescript
// 在 Heartbeat 任務中添加
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const articlesComingSoon = await db
  .select()
  .from(blogPosts)
  .where(
    and(
      eq(blogPosts.isPublished, false),
      between(blogPosts.publishedAt, now, tomorrow)
    )
  );

// 發送通知
```

### 2. 社群媒體自動發佈

集成社群媒體 API，自動在 Facebook、Twitter、LinkedIn 上分享新文章。

### 3. 郵件訂閱通知

當新文章發佈時，自動發送郵件給訂閱者。

### 4. 分析和優化

追蹤每篇文章的性能，根據數據優化發佈時間和內容。

---

## 結論

通過設置自動發佈系統，王純瑋的作品集網站可以：
- ✅ 保持內容更新的一致性
- ✅ 提高 SEO 排名
- ✅ 提升 AI 引用率
- ✅ 建立讀者期待
- ✅ 節省手動發佈的時間

預計在 12 週內，網站將發佈 12 篇新文章，總計 11,427 字的高質量內容，預期提升有機流量 40-60%。
