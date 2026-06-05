# Heartbeat 定時任務設置指南

## 概述

本指南說明如何設置 Heartbeat 定時任務，自動發佈已排期的 12 篇文章。

---

## 第一步：驗證後端 API 端點

在設置 Heartbeat 之前，確認後端已準備好接收發佈請求。

### 檢查清單

- [ ] `/api/scheduled/publish-articles` 端點已實現
- [ ] 端點支持 POST 請求
- [ ] 端點進行了身份驗證（cron-only）
- [ ] 錯誤處理已實現

### 測試端點

```bash
# 本地測試（開發環境）
curl -X POST http://localhost:3000/api/scheduled/publish-articles \
  -H "Authorization: Bearer YOUR_CRON_TOKEN"

# 預期響應
{
  "ok": true,
  "published": 0,
  "timestamp": "2026-06-09T09:00:00Z"
}
```

---

## 第二步：創建 Heartbeat 定時任務

### 方法 1：使用 CLI（推薦）

```bash
# 每小時檢查一次是否有待發佈的文章
manus-heartbeat create \
  --name publish-scheduled-articles \
  --cron "0 * * * * *" \
  --path /api/scheduled/publish-articles \
  --description "自動發佈已排期的文章（12 週發佈計畫）"
```

**Cron 表達式說明**：
- `0 * * * * *` = 每小時的第 0 分鐘執行
- `0 0 * * * *` = 每天午夜執行
- `0 9 * * * *` = 每天上午 9 點執行
- `0 9 * * 1 *` = 每週一上午 9 點執行

### 方法 2：通過管理員界面

1. 訪問 `https://bertfolio-vncqhm2r.manus.space/admin`
2. 進入「Heartbeat 任務」部分
3. 點擊「創建新任務」
4. 填寫以下信息：
   - **名稱**：publish-scheduled-articles
   - **路徑**：/api/scheduled/publish-articles
   - **Cron 表達式**：0 * * * * *
   - **描述**：自動發佈已排期的文章

---

## 第三步：驗證 Heartbeat 任務

### 檢查任務狀態

```bash
# 查看所有 Heartbeat 任務
manus-heartbeat list

# 查看特定任務的詳情
manus-heartbeat status publish-scheduled-articles
```

### 預期輸出

```
任務名稱：publish-scheduled-articles
狀態：Active
Cron 表達式：0 * * * * *
最後執行：2026-06-09 09:00:00
下次執行：2026-06-09 10:00:00
執行次數：1
成功次數：1
失敗次數：0
```

### 手動觸發任務（用於測試）

```bash
# 立即執行任務一次
manus-heartbeat trigger publish-scheduled-articles
```

---

## 第四步：監測任務執行

### 查看執行日誌

```bash
# 查看最近的執行日誌
manus-heartbeat logs publish-scheduled-articles --tail 20

# 查看特定日期的日誌
manus-heartbeat logs publish-scheduled-articles --date 2026-06-09
```

### 預期日誌

```
[2026-06-09 09:00:00] 執行開始
[2026-06-09 09:00:01] 查詢待發佈文章...
[2026-06-09 09:00:02] 找到 0 篇待發佈文章
[2026-06-09 09:00:02] 執行完成 (成功)

[2026-06-16 09:00:00] 執行開始
[2026-06-16 09:00:01] 查詢待發佈文章...
[2026-06-16 09:00:02] 找到 1 篇待發佈文章
[2026-06-16 09:00:03] 發佈文章 ID: 1
[2026-06-16 09:00:04] 執行完成 (成功)
```

---

## 第五步：設置監測告警

### 配置失敗通知

```bash
# 設置失敗時發送郵件通知
manus-heartbeat configure publish-scheduled-articles \
  --on-failure email \
  --email admin@example.com
```

### 配置成功通知

```bash
# 設置成功時發送 Slack 通知
manus-heartbeat configure publish-scheduled-articles \
  --on-success slack \
  --webhook-url https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

---

## 第六步：12 週發佈日程

### 發佈時間表

| 週次 | 日期 | 文章數 | 文章標題 | 發佈時間 |
|------|------|------|--------|--------|
| 1 | 6/9 | 1 | AI 時代的網頁設計 | 09:00 |
| 1 | 6/16 | 1 | 為什麼 AI 看不懂你的網站 | 09:00 |
| 2 | 6/23 | 1 | 古蹟數位化的 5 個關鍵 | 09:00 |
| 3 | 6/30 | 1 | 台南中小企業品牌困境 | 09:00 |
| 4 | 7/7 | 1 | PHP 開發者必讀 | 09:00 |
| 5 | 7/14 | 1 | 從 OpenLock 到 SOYUI | 09:00 |
| 6 | 7/21 | 1 | 紀錄片製作者的數位化之路 | 09:00 |
| 7 | 7/28 | 1 | 設計師的社會責任 | 09:00 |
| 8 | 8/4 | 1 | 多語言 SEO 實戰 | 09:00 |
| 9 | 8/11 | 1 | SEO 進階技巧 | 09:00 |
| 10 | 8/18 | 1 | 品牌溫度的科學 | 09:00 |
| 12 | 8/25 | 1 | 阿育吠陀與現代設計 | 09:00 |

### 驗證發佈時間

所有文章的 `publishedAt` 時間已設置。可以通過以下查詢驗證：

```sql
SELECT id, title_tw, published_at, is_published 
FROM blog_posts 
WHERE slug IN (
  'ai-web-design-2026',
  'ai-structured-data-geo',
  'heritage-digitalization-5-keys',
  'tainan-sme-brand-challenges',
  'php-performance-optimization-2026',
  'openlock-soyui-case-studies',
  'documentary-digitalization-journey',
  'designer-social-responsibility',
  'multilingual-seo-practice',
  'seo-advanced-internal-links',
  'brand-warmth-science',
  'ayurveda-modern-design'
)
ORDER BY published_at;
```

---

## 故障排查

### 問題 1：Heartbeat 任務沒有執行

**症狀**：任務沒有在預定時間執行

**解決方案**：
1. 檢查任務是否處於 Active 狀態
2. 檢查 Cron 表達式是否正確
3. 查看服務器日誌
4. 檢查 API 端點是否可訪問

```bash
# 檢查任務狀態
manus-heartbeat status publish-scheduled-articles

# 查看最近的日誌
manus-heartbeat logs publish-scheduled-articles --tail 5

# 手動觸發測試
manus-heartbeat trigger publish-scheduled-articles
```

### 問題 2：文章沒有被發佈

**症狀**：任務執行成功，但文章仍未發佈

**解決方案**：
1. 檢查 `isPublished` 欄位是否為 false
2. 檢查 `publishedAt` 時間是否已過期
3. 檢查數據庫連接
4. 查看 API 響應日誌

```sql
-- 檢查待發佈文章
SELECT id, title_tw, published_at, is_published 
FROM blog_posts 
WHERE is_published = false 
AND published_at <= NOW()
ORDER BY published_at;
```

### 問題 3：Heartbeat 任務失敗

**症狀**：任務執行失敗，顯示錯誤信息

**解決方案**：
1. 查看詳細的錯誤日誌
2. 檢查 API 端點的錯誤處理
3. 檢查數據庫權限
4. 檢查網絡連接

```bash
# 查看詳細日誌
manus-heartbeat logs publish-scheduled-articles --verbose

# 查看特定失敗的詳情
manus-heartbeat logs publish-scheduled-articles --filter failed
```

---

## 優化建議

### 1. 調整執行頻率

根據需求調整 Cron 表達式：

```bash
# 每 30 分鐘檢查一次（更頻繁）
manus-heartbeat update publish-scheduled-articles \
  --cron "0,30 * * * * *"

# 每天只在上午 9 點檢查一次（更節省資源）
manus-heartbeat update publish-scheduled-articles \
  --cron "0 9 * * * *"
```

### 2. 添加預發佈通知

在文章發佈前 24 小時發送通知：

```bash
# 創建預發佈通知任務
manus-heartbeat create \
  --name notify-upcoming-articles \
  --cron "0 9 * * * *" \
  --path /api/scheduled/notify-upcoming \
  --description "發送即將發佈的文章通知"
```

### 3. 監測性能指標

定期檢查任務性能：

```bash
# 查看任務統計
manus-heartbeat stats publish-scheduled-articles

# 預期輸出
總執行次數：12
成功次數：12
失敗次數：0
平均執行時間：2.3 秒
最長執行時間：3.5 秒
最短執行時間：1.8 秒
```

---

## 檢查清單

在部署前，請確認以下項目：

- [ ] 後端 API 端點已實現和測試
- [ ] Heartbeat 任務已創建
- [ ] 任務狀態為 Active
- [ ] 所有 12 篇文章已導入數據庫
- [ ] 文章的 `publishedAt` 時間已正確設置
- [ ] 文章的 `isPublished` 欄位為 false
- [ ] 手動觸發任務測試成功
- [ ] 監測告警已配置
- [ ] 日誌記錄已啟用
- [ ] 故障排查文檔已準備

---

## 成功指標

### 第 1 週（6/9 - 6/16）

✅ 第一篇文章在 6/9 09:00 自動發佈
✅ 第二篇文章在 6/16 09:00 自動發佈
✅ Heartbeat 任務執行 2 次，全部成功
✅ 文章在前端正確顯示

### 第 2-4 週

✅ 所有文章按時發佈
✅ 沒有任務失敗
✅ 有機流量開始增長
✅ AI 引用開始出現

### 第 5-12 週

✅ 所有 12 篇文章已發佈
✅ 任務執行成功率 100%
✅ 有機流量增長 40-60%
✅ AI 引用率增長 50-80%

---

## 支持和聯繫

如有問題，請參考：
- `/AUTOMATED_PUBLISHING_SETUP.md` - 自動發佈系統詳細指南
- `/SEO_MONITORING_DASHBOARD.md` - SEO 監測指南
- `/IMPLEMENTATION_SUMMARY.md` - 完整實施總結
