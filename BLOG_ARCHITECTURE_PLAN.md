# 📝 部落格/案例研究頁面架構規劃

**目標**：建立部落格或案例研究頁面，展示台南網頁設計、文化保存相關文章，提升 SEO 排名和有機流量。

---

## 1. 架構決策

### 1.1 部落格 vs 案例研究

| 維度 | 部落格 | 案例研究 | 建議 |
|------|--------|---------|------|
| **內容類型** | 文章、觀點、教學 | 項目成果、數據、結果 | **混合模式** |
| **更新頻率** | 定期（每週/每月） | 不定期（按項目） | 部落格為主 |
| **SEO 效果** | 高（長尾關鍵詞） | 高（品牌關鍵詞） | 部落格優先 |
| **轉化效果** | 中等（建立權威） | 高（直接展示成果） | 案例研究補充 |

**決策**：採用「部落格 + 案例研究」混合模式
- **部落格**：定期發佈文章（每月 2-4 篇），優化 SEO
- **案例研究**：展示代表作品的深度分析（4-6 個案例）

---

## 2. 數據模型設計

### 2.1 Blog Posts 表結構

```sql
CREATE TABLE blog_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(255) UNIQUE NOT NULL,           -- URL 友善的標識符
  title_tw VARCHAR(255) NOT NULL,              -- 繁體中文標題
  title_jp VARCHAR(255),                       -- 日文標題
  title_my VARCHAR(255),                       -- 馬來語標題
  excerpt_tw TEXT,                             -- 繁體中文摘要
  excerpt_jp TEXT,
  excerpt_my TEXT,
  content_tw LONGTEXT NOT NULL,                -- 繁體中文內容（Markdown）
  content_jp LONGTEXT,
  content_my LONGTEXT,
  category VARCHAR(50),                        -- 分類（如：台南設計、文化保存、SEO優化）
  tags JSON,                                   -- 標籤（JSON 陣列）
  featured_image_url VARCHAR(500),             -- 特色圖片 URL
  author VARCHAR(100) DEFAULT 'Bert Wang',     -- 作者
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  view_count INT DEFAULT 0,                    -- 瀏覽次數
  is_published BOOLEAN DEFAULT TRUE,           -- 發佈狀態
  seo_keywords_tw VARCHAR(255),                -- SEO 關鍵詞（繁體中文）
  seo_keywords_jp VARCHAR(255),
  seo_keywords_my VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 Case Studies 表結構

```sql
CREATE TABLE case_studies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_tw VARCHAR(255) NOT NULL,
  title_jp VARCHAR(255),
  title_my VARCHAR(255),
  description_tw TEXT,                         -- 簡短描述
  description_jp TEXT,
  description_my TEXT,
  challenge_tw LONGTEXT,                       -- 挑戰
  challenge_jp LONGTEXT,
  challenge_my LONGTEXT,
  solution_tw LONGTEXT,                        -- 解決方案
  solution_jp LONGTEXT,
  solution_my LONGTEXT,
  results_tw LONGTEXT,                         -- 成果
  results_jp LONGTEXT,
  results_my LONGTEXT,
  client_name VARCHAR(100),                    -- 客戶名稱
  project_category VARCHAR(50),                -- 項目分類（網頁設計、PHP 開發等）
  technologies JSON,                           -- 使用技術
  featured_image_url VARCHAR(500),
  project_images JSON,                         -- 項目圖片 URL 陣列
  project_url VARCHAR(500),                    -- 項目網址
  completion_date DATE,                        -- 完成日期
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. 內容策略

### 3.1 部落格文章主題

| 序號 | 主題 | 關鍵詞 | 目標 | 優先級 |
|------|------|--------|------|--------|
| 1 | 台南網頁設計的 5 個趨勢 | 台南網頁設計、設計趨勢 | 建立權威 | 🔴 |
| 2 | 為什麼中小企業需要 SEO 優化 | 台南 SEO、搜尋引擎優化 | 長尾關鍵詞 | 🔴 |
| 3 | 文化保存與品牌設計的結合 | 文化保存、品牌設計 | 差異化定位 | 🟠 |
| 4 | PHP 開發在現代網頁的角色 | PHP 開發、後端工程 | 技術權威 | 🟠 |
| 5 | 台南古蹟保存計畫分享 | 台南古蹟、文化記憶 | 社會責任 | 🟠 |
| 6 | 如何用紀錄片講述品牌故事 | 品牌故事、影像創作 | 創意差異 | 🟡 |

### 3.2 案例研究主題

| 序號 | 項目名稱 | 分類 | 亮點 | 優先級 |
|------|---------|------|------|--------|
| 1 | 天喜の記憶 | 網頁設計 + 文化保存 | 文化與設計結合 | 🔴 |
| 2 | SOYUI COFFEE | 網頁設計 + 品牌 | 咖啡館品牌故事 | 🔴 |
| 3 | 強匠鎖店 | 網頁設計 + PHP 開發 | 傳統行業數位轉型 | 🔴 |
| 4 | 溫ㄟ宅修 | 網頁設計 + SEO | 本地服務 SEO 優化 | 🟠 |
| 5 | 朱婕老師阿育吠陀筆記 | 數位化 + 網站架設 | 知識保存與分享 | 🟠 |
| 6 | 紀錄片製作 | 影像創作 | 社會責任與文化 | 🟠 |

---

## 4. 頁面結構設計

### 4.1 部落格列表頁 (/blog)

**布局**：
- **頂部 Hero 區域**：標題「王純瑋的設計筆記」+ 簡介
- **搜尋和篩選**：
  - 搜尋框（按標題、內容）
  - 分類篩選（台南設計、文化保存、SEO優化、影像創作）
  - 排序選項（最新、最熱門、最相關）
- **文章卡片網格**：
  - 特色圖片
  - 標題、摘要、作者、發佈日期
  - 閱讀時間估計
  - 分類標籤
  - 「閱讀全文」按鈕
- **分頁**：每頁 12 篇文章
- **側邊欄**（桌面版）：
  - 熱門文章
  - 分類列表
  - 訂閱表單

**響應式設計**：
- 桌面：3 欄網格
- 平板：2 欄網格
- 手機：1 欄

### 4.2 部落格詳細頁 (/blog/:slug)

**布局**：
- **文章頭部**：
  - 特色圖片（全寬）
  - 標題、作者、發佈日期、閱讀時間
  - 分類和標籤
- **文章內容**：
  - Markdown 渲染（支援代碼塊、引用、列表等）
  - 自動生成目錄（Table of Contents）
  - 代碼高亮
- **文章底部**：
  - 作者簡介卡片
  - 社交分享按鈕
  - 相關文章推薦（3 篇）
- **評論區**（可選）：
  - Disqus 或自建評論系統

**SEO 優化**：
- Meta 標籤（title、description、keywords）
- Open Graph 標籤
- Schema.org 結構化數據（Article、BlogPosting）
- 內部連結策略

### 4.3 案例研究列表頁 (/case-studies)

**布局**：
- **頂部 Hero 區域**：標題「代表作品」+ 簡介
- **篩選選項**：
  - 項目分類（網頁設計、PHP 開發、品牌設計、影像創作）
  - 排序（最新、最相關）
- **案例卡片**：
  - 特色圖片
  - 項目名稱、簡短描述
  - 分類標籤
  - 「查看案例」按鈕
- **響應式設計**：
  - 桌面：2-3 欄
  - 平板：2 欄
  - 手機：1 欄

### 4.4 案例研究詳細頁 (/case-studies/:slug)

**布局**：
- **項目頭部**：
  - 大型特色圖片
  - 項目名稱、分類、完成日期
  - 快速統計（如：提升流量 150%、轉化率提升 80%）
- **項目內容**：
  - **挑戰**：客戶面臨的問題
  - **解決方案**：我們的方法和技術
  - **成果**：具體數據和結果
  - **使用技術**：技術棧（標籤）
- **項目圖片**：
  - 項目截圖或設計稿
  - 圖片輪播或網格
- **項目連結**：
  - 「訪問網站」按鈕（如果公開）
- **相關案例推薦**：
  - 3 個相似項目

---

## 5. SEO 優化策略

### 5.1 關鍵詞策略

| 分類 | 關鍵詞 | 搜尋意圖 | 優先級 |
|------|--------|---------|--------|
| **地理 + 服務** | 台南網頁設計、台南 PHP 開發 | 本地搜尋 | 🔴 |
| **服務 + 特性** | 文化保存設計、響應式網頁設計 | 特定需求 | 🔴 |
| **教育 + 長尾** | 如何優化網站 SEO、網頁設計最佳實踐 | 學習 | 🟠 |
| **品牌 + 社會** | 台南文化保存、社會責任設計 | 品牌認知 | 🟠 |

### 5.2 內部連結策略

```
首頁
├─ 部落格列表 (/blog)
│  ├─ 部落格文章 1 (/blog/seo-optimization)
│  │  └─ 相關案例 (溫ㄟ宅修)
│  ├─ 部落格文章 2 (/blog/cultural-preservation)
│  │  └─ 相關案例 (天喜の記憶)
│  └─ ...
├─ 案例研究列表 (/case-studies)
│  ├─ 案例 1 (/case-studies/tian-xi)
│  │  └─ 相關文章 (文化保存與設計)
│  ├─ 案例 2 (/case-studies/soyui-coffee)
│  │  └─ 相關文章 (品牌故事)
│  └─ ...
└─ 推薦理由區塊
   └─ 連結到相關案例和文章
```

### 5.3 Schema.org 結構化數據

**BlogPosting Schema**：
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "台南網頁設計的 5 個趨勢",
  "image": "https://...",
  "datePublished": "2026-06-01",
  "dateModified": "2026-06-01",
  "author": {
    "@type": "Person",
    "name": "王純瑋"
  },
  "publisher": {
    "@type": "Organization",
    "name": "微波林克",
    "logo": "https://..."
  }
}
```

**BreadcrumbList Schema**：
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://..." },
    { "@type": "ListItem", "position": 2, "name": "部落格", "item": "https://.../blog" },
    { "@type": "ListItem", "position": 3, "name": "文章標題", "item": "https://.../blog/slug" }
  ]
}
```

---

## 6. 技術實現細節

### 6.1 後端 API 端點

| 端點 | 方法 | 功能 | 認證 |
|------|------|------|------|
| `/api/blog/posts` | GET | 獲取文章列表（支援分頁、篩選、搜尋） | 公開 |
| `/api/blog/posts/:slug` | GET | 獲取單篇文章 | 公開 |
| `/api/blog/posts` | POST | 創建文章 | 管理員 |
| `/api/blog/posts/:id` | PUT | 編輯文章 | 管理員 |
| `/api/blog/posts/:id` | DELETE | 刪除文章 | 管理員 |
| `/api/case-studies` | GET | 獲取案例列表 | 公開 |
| `/api/case-studies/:slug` | GET | 獲取單個案例 | 公開 |

### 6.2 前端組件

| 組件 | 功能 | 複用性 |
|------|------|--------|
| `BlogPostCard` | 文章卡片 | 高 |
| `CaseStudyCard` | 案例卡片 | 高 |
| `BlogPostList` | 文章列表（含篩選） | 高 |
| `BlogPostDetail` | 文章詳細頁 | 中 |
| `CaseStudyDetail` | 案例詳細頁 | 中 |
| `RelatedPosts` | 相關文章推薦 | 高 |
| `TableOfContents` | 目錄生成 | 中 |

---

## 7. 三語言支持

### 7.1 翻譯策略

- **台灣版本 (Traditional Chinese)**：主要語言，優先完成
- **日本版本 (日本語)**：使用 Google Translate API 或人工翻譯
- **馬來西亞版本 (Bahasa Melayu)**：使用 Google Translate API 或人工翻譯

### 7.2 URL 結構

```
/tw/blog/...              # 台灣版部落格
/jp/blog/...              # 日本版部落格
/my/blog/...              # 馬來西亞版部落格

/tw/case-studies/...      # 台灣版案例研究
/jp/case-studies/...      # 日本版案例研究
/my/case-studies/...      # 馬來西亞版案例研究
```

---

## 8. 實施時間表

| 階段 | 工作項目 | 預計時間 | 優先級 |
|------|---------|---------|--------|
| **第 1 週** | 數據庫設計、後端 API 開發 | 3-4 天 | 🔴 |
| **第 2 週** | 前端頁面開發（列表 + 詳細） | 3-4 天 | 🔴 |
| **第 3 週** | SEO 優化、內部連結、結構化數據 | 2-3 天 | 🔴 |
| **第 4 週** | 內容創建（初始 6 篇文章 + 4 個案例） | 4-5 天 | 🟠 |
| **第 5 週** | 測試、優化、發布 | 2-3 天 | 🟠 |

---

## 9. 成功指標

### 9.1 SEO 指標

- 目標關鍵詞排名進入前 10（3 個月內）
- 有機流量增加 50%（6 個月內）
- 文章頁面平均停留時間 > 3 分鐘

### 9.2 用戶參與度

- 文章平均瀏覽次數 > 100/月
- 相關文章點擊率 > 15%
- 案例研究到咨詢表單的轉化率 > 5%

### 9.3 業務指標

- 通過部落格/案例研究獲得的咨詢 > 2/月
- 客戶轉化率 > 20%

---

## 10. 下一步行動

1. ✅ **架構規劃完成**（本文件）
2. 🔄 **建立數據庫表和後端 API**（Phase 2）
3. 🔄 **開發前端頁面**（Phase 3）
4. 🔄 **SEO 優化和內容創建**（Phase 4）
5. 🔄 **測試和發布**（Phase 5）

---

**文件完成時間**: 2026-06-01  
**下一步**: 開始 Phase 2 - 建立數據庫表和後端 API
