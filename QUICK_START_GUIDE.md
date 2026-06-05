# 12 週定期發佈計畫 - 快速開始指南

## 🚀 5 分鐘快速開始

### 第 1 步：驗證文章導入（已完成 ✅）

12 篇文章已導入數據庫。驗證：

```bash
# 檢查文章數量
cd /home/ubuntu/bert_wang_portfolio

# 查看數據庫中的文章
mysql -u root -p -e "SELECT COUNT(*) as total FROM blog_posts WHERE slug LIKE 'ai-%' OR slug LIKE 'heritage-%' OR slug LIKE 'php-%' OR slug LIKE 'brand-%' OR slug LIKE 'designer-%' OR slug LIKE 'documentary-%' OR slug LIKE 'multilingual-%' OR slug LIKE 'seo-%' OR slug LIKE 'openlock-%' OR slug LIKE 'tainan-%' OR slug LIKE 'ayurveda-%';"
```

**預期結果**：`total: 12`

### 第 2 步：設置 Heartbeat 定時任務（5 分鐘）

```bash
# 創建 Heartbeat 任務
manus-heartbeat create \
  --name publish-scheduled-articles \
  --cron "0 * * * * *" \
  --path /api/scheduled/publish-articles \
  --description "自動發佈已排期的文章（12 週發佈計畫）"

# 驗證任務創建
manus-heartbeat list
```

### 第 3 步：測試發佈系統（2 分鐘）

```bash
# 手動觸發任務（測試）
manus-heartbeat trigger publish-scheduled-articles

# 查看日誌
manus-heartbeat logs publish-scheduled-articles --tail 10
```

**預期日誌**：
```
[2026-06-09 XX:XX:XX] 執行開始
[2026-06-09 XX:XX:XX] 查詢待發佈文章...
[2026-06-09 XX:XX:XX] 找到 0 篇待發佈文章（因為發佈時間未到）
[2026-06-09 XX:XX:XX] 執行完成 (成功)
```

### 第 4 步：設置 SEO 監測（3 分鐘）

1. 訪問 [Google Sheets](https://sheets.google.com)
2. 創建新試算表，命名為「王純瑋作品集 - SEO 監測儀表板」
3. 複製 `/SEO_MONITORING_SHEETS_TEMPLATE.md` 中的表單結構
4. 連接 Google Analytics 4 和 Google Search Console

---

## 📋 完整檢查清單

在正式啟動前，請確認以下項目：

### 數據庫準備

- [ ] 12 篇文章已導入數據庫
- [ ] 所有文章的 `isPublished` = false
- [ ] 所有文章的 `publishedAt` 時間已設置
- [ ] 文章內容完整（包含 FAQ）

**驗證命令**：
```sql
SELECT id, title_tw, published_at, is_published, LENGTH(content_tw) as content_length
FROM blog_posts 
WHERE slug IN ('ai-web-design-2026', 'ai-structured-data-geo', ...)
ORDER BY published_at;
```

### 後端準備

- [ ] `/api/scheduled/publish-articles` 端點已實現
- [ ] 端點支持 POST 請求
- [ ] 端點進行了身份驗證
- [ ] 錯誤處理已實現
- [ ] 日誌記錄已啟用

**測試命令**：
```bash
curl -X POST http://localhost:3000/api/scheduled/publish-articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Heartbeat 準備

- [ ] Heartbeat 任務已創建
- [ ] 任務狀態為 Active
- [ ] Cron 表達式正確
- [ ] 任務已測試成功

**驗證命令**：
```bash
manus-heartbeat status publish-scheduled-articles
```

### 前端準備

- [ ] 博客列表頁面只顯示已發佈的文章
- [ ] 發佈日期正確顯示
- [ ] 相關文章推薦已實現

**測試步驟**：
1. 訪問 `/blog`
2. 確認只有已發佈的文章顯示
3. 檢查文章發佈日期

### SEO 準備

- [ ] `llms.txt` 已配置
- [ ] `robots.txt` 已優化
- [ ] 結構化數據已添加
- [ ] Google Search Console 已連接
- [ ] Google Analytics 4 已連接

**驗證步驟**：
1. 訪問 `https://bertfolio-vncqhm2r.manus.space/llms.txt`
2. 訪問 `https://bertfolio-vncqhm2r.manus.space/robots.txt`
3. 在 Google Search Console 中檢查結構化數據

---

## 📅 12 週發佈日程

### 第 1-2 週（6 月）

| 日期 | 文章標題 | 關鍵詞 | 預期流量 |
|------|--------|------|--------|
| 6/9 | AI 時代的網頁設計 | AI、GEO、設計 | 150-200 |
| 6/16 | 為什麼 AI 看不懂你的網站 | 結構化數據、GEO | 150-200 |
| 6/23 | 古蹟數位化的 5 個關鍵 | 古蹟、數位化 | 100-150 |
| 6/30 | 台南中小企業品牌困境 | 台南、品牌 | 120-180 |

### 第 3-4 週（7 月上半月）

| 日期 | 文章標題 | 關鍵詞 | 預期流量 |
|------|--------|------|--------|
| 7/7 | PHP 開發者必讀 | PHP、性能、優化 | 150-200 |
| 7/14 | 從 OpenLock 到 SOYUI | PHP、案例 | 130-180 |
| 7/21 | 紀錄片製作者的數位化之路 | 紀錄片、數位化 | 100-150 |
| 7/28 | 設計師的社會責任 | 社會責任、設計 | 120-170 |

### 第 5-6 週（7 月下半月 - 8 月上半月）

| 日期 | 文章標題 | 關鍵詞 | 預期流量 |
|------|--------|------|--------|
| 8/4 | 多語言 SEO 實戰 | 多語言、SEO、國際化 | 140-190 |
| 8/11 | SEO 進階技巧 | 內部連結、AEO | 160-210 |
| 8/18 | 品牌溫度的科學 | 品牌、溫度、設計 | 130-180 |
| 8/25 | 阿育吠陀與現代設計 | 阿育吠陀、身心靈 | 110-160 |

---

## 📊 預期成效

### 第 1-4 週

✅ **有機流量**：+10-15%（從基線增長）
✅ **排名變化**：-2 到 +2 位
✅ **AI 引用**：+20-30%
✅ **新用戶**：+15-20%

**目標**：建立基礎，讓 AI 爬蟲發現新內容

### 第 5-8 週

✅ **有機流量**：+25-35%
✅ **排名變化**：+2 到 +5 位
✅ **AI 引用**：+40-60%
✅ **新用戶**：+30-40%

**目標**：內容開始在搜尋結果中排名，AI 引用率明顯提升

### 第 9-12 週

✅ **有機流量**：+40-60%
✅ **排名變化**：+5 到 +8 位
✅ **AI 引用**：+50-80%
✅ **新用戶**：+50-70%

**目標**：建立品牌權威，被 GEO/AEO 監測工具收入

---

## 🔧 故障排查

### 問題 1：文章沒有自動發佈

**症狀**：到了發佈時間，文章仍未發佈

**解決方案**：
```bash
# 1. 檢查 Heartbeat 任務狀態
manus-heartbeat status publish-scheduled-articles

# 2. 查看最近的日誌
manus-heartbeat logs publish-scheduled-articles --tail 20

# 3. 手動觸發測試
manus-heartbeat trigger publish-scheduled-articles

# 4. 檢查數據庫
SELECT * FROM blog_posts 
WHERE is_published = false 
AND published_at <= NOW()
ORDER BY published_at;
```

### 問題 2：Heartbeat 任務失敗

**症狀**：任務執行失敗，顯示錯誤

**解決方案**：
```bash
# 1. 查看詳細錯誤日誌
manus-heartbeat logs publish-scheduled-articles --verbose

# 2. 檢查 API 端點
curl -X POST http://localhost:3000/api/scheduled/publish-articles

# 3. 檢查數據庫連接
mysql -u root -p -e "SELECT 1;"

# 4. 查看服務器日誌
tail -f /var/log/application.log
```

### 問題 3：排名沒有提升

**症狀**：文章發佈後排名沒有改善

**解決方案**：
1. 確保文章內容質量高（> 950 字）
2. 增加內部連結
3. 優化標題和描述
4. 改進核心網絡指標
5. 等待 2-4 週讓搜尋引擎重新評估

### 問題 4：AI 引用率沒有提升

**症狀**：在 AI 系統中沒有看到引用

**解決方案**：
1. 確認 `llms.txt` 和 `robots.txt` 配置正確
2. 檢查結構化數據是否有效
3. 確保內容對 AI 友善
4. 等待 AI 爬蟲重新索引（1-2 週）

---

## 📞 支持文檔

| 文檔 | 用途 |
|------|------|
| `/IMPLEMENTATION_SUMMARY.md` | 完整實施總結 |
| `/HEARTBEAT_SETUP_GUIDE.md` | Heartbeat 詳細設置 |
| `/SEO_MONITORING_SHEETS_TEMPLATE.md` | Google Sheets 儀表板 |
| `/AUTOMATED_PUBLISHING_SETUP.md` | 自動發佈系統詳細指南 |
| `/SEO_MONITORING_DASHBOARD.md` | SEO 監測指南 |
| `/PUBLISHING_SCHEDULE_12WEEKS.md` | 12 週發佈計畫 |

---

## ✅ 最終檢查清單

在啟動前，請確認：

- [ ] 所有 12 篇文章已導入數據庫
- [ ] Heartbeat 任務已創建並測試
- [ ] `/api/scheduled/publish-articles` 端點已實現
- [ ] 博客頁面只顯示已發佈的文章
- [ ] Google Search Console 已連接
- [ ] Google Analytics 4 已連接
- [ ] Google Sheets 儀表板已創建
- [ ] `llms.txt` 和 `robots.txt` 已配置
- [ ] 所有文檔已準備好
- [ ] 團隊已收到通知

---

## 🎯 成功標誌

### 第 1 週（6/9）

✅ 第一篇文章在 6/9 09:00 自動發佈
✅ 文章在前端正確顯示
✅ Heartbeat 任務執行成功

### 第 2 週（6/16）

✅ 第二篇文章在 6/16 09:00 自動發佈
✅ 第一篇文章開始獲得流量
✅ 在 Google Search Console 中看到文章

### 第 4 週（6/30）

✅ 4 篇文章已發佈
✅ 有機流量開始增長（+10-15%）
✅ 在 Cairrot 中看到 AI 引用

### 第 12 週（8/25）

✅ 所有 12 篇文章已發佈
✅ 有機流量增長 40-60%
✅ AI 引用率增長 50-80%
✅ 被 GEO/AEO 監測工具收入

---

## 🚀 立即開始

### 現在就可以做的事情：

1. **驗證文章導入**
   ```bash
   # 查看已導入的文章
   mysql -u root -p -e "SELECT COUNT(*) FROM blog_posts WHERE slug LIKE '%2026%';"
   ```

2. **設置 Heartbeat**
   ```bash
   # 創建定時任務
   manus-heartbeat create --name publish-scheduled-articles --cron "0 * * * * *" --path /api/scheduled/publish-articles
   ```

3. **設置 Google Sheets**
   - 訪問 Google Sheets
   - 創建新試算表
   - 複製儀表板模板

4. **連接 Google Analytics**
   - 在 Google Sheets 中安裝 GA4 附加元件
   - 授權連接
   - 開始導入數據

### 下週要做的事情：

1. 驗證第一篇文章在 6/9 自動發佈
2. 檢查 Heartbeat 日誌
3. 開始監測 Google Search Console 和 Analytics
4. 準備第二篇文章的發佈

---

## 💡 提示和最佳實踐

### 1. 定期監測

- 每天檢查 Heartbeat 日誌
- 每週更新 Google Sheets 儀表板
- 每月生成報告

### 2. 內容優化

- 確保每篇文章都有 3-5 個內部連結
- 在文章中包含相關的長尾關鍵詞
- 定期更新舊文章的內部連結

### 3. 推廣策略

- 在社群媒體上分享新文章
- 邀請相關網站連結到你的文章
- 在行業論壇中提及你的文章

### 4. 數據分析

- 追蹤每篇文章的性能
- 識別表現最好的文章類型
- 根據數據調整內容策略

---

## 📞 需要幫助？

如有問題，請參考相應的文檔或聯繫技術支持。

**祝你成功！** 🎉

---

**最後更新**：2026 年 6 月 9 日
**版本**：1.0
**狀態**：✅ 準備就緒
