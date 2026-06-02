#!/usr/bin/env python3
"""
批量生成部落格文章的 Python 腳本
使用 LLM 根據內容策略生成高質量的 Markdown 文章
"""

import os
import json
from datetime import datetime, timedelta

# 文章配置
ARTICLES = [
    {
        "id": 3,
        "title": "台南中小企業的品牌困境：如何用設計突圍",
        "slug": "sme-branding-breakthrough",
        "category": "台南設計",
        "keywords": "中小企業品牌、品牌設計、視覺識別、台南企業",
        "excerpt": "分析台南中小企業的品牌現狀，提供設計解決方案",
        "length": "1800-2200 字"
    },
    {
        "id": 4,
        "title": "設計思維在台南社區營造中的應用",
        "slug": "design-thinking-community",
        "category": "台南設計",
        "keywords": "社區設計、設計思維、社區營造、台南社區",
        "excerpt": "探討設計如何助力台南社區發展和文化保存",
        "length": "1500-1800 字"
    },
    {
        "id": 5,
        "title": "台南食文化的視覺故事：美食品牌設計案例",
        "slug": "tainan-food-branding",
        "category": "台南設計",
        "keywords": "食品品牌、美食設計、台南美食、品牌故事",
        "excerpt": "通過 SOYUI COFFEE 等案例，展示台南美食品牌的設計策略",
        "length": "1600-2000 字"
    },
    {
        "id": 6,
        "title": "18 年台南設計之路：從傳統到數位的轉變",
        "slug": "18-years-design-journey",
        "category": "台南設計",
        "keywords": "設計師故事、台南設計、職業發展、數位轉型",
        "excerpt": "個人職業發展故事，強調適應變化和持續學習",
        "length": "2000-2500 字"
    },
    {
        "id": 7,
        "title": "用影像保存記憶：《南蚵一夢》和《雁難飛》的故事",
        "slug": "documentaries-memory",
        "category": "文化保存",
        "keywords": "紀錄片、文化保存、社會責任、台南文化",
        "excerpt": "介紹兩部紀錄片的製作背景和文化意義",
        "length": "1800-2200 字"
    },
    {
        "id": 8,
        "title": "古蹟保存不只是修復：赤嵌樓、祀典武廟的數位記錄",
        "slug": "heritage-digital-preservation",
        "category": "文化保存",
        "keywords": "古蹟保存、數位檔案、文化遺產、台南古蹟",
        "excerpt": "探討古蹟保存的多維度方法，包括物理修復和數位記錄",
        "length": "1600-2000 字"
    },
    {
        "id": 9,
        "title": "社區參與的力量：文化保存的新模式",
        "slug": "community-heritage-preservation",
        "category": "文化保存",
        "keywords": "社區參與、文化保存、社會責任、公民參與",
        "excerpt": "討論如何通過社區參與推動文化保存",
        "length": "1500-1900 字"
    },
    {
        "id": 10,
        "title": "設計師的社會責任：為什麼我投身文化保存",
        "slug": "designer-social-responsibility",
        "category": "文化保存",
        "keywords": "社會責任、設計倫理、文化保存、職業使命",
        "excerpt": "個人視角，探討設計師在文化保存中的角色",
        "length": "1400-1800 字"
    },
    {
        "id": 11,
        "title": "2024 年台南企業網站設計趨勢：從響應式到 AI 集成",
        "slug": "web-design-trends-2024",
        "category": "網頁設計",
        "keywords": "網頁設計趨勢、響應式設計、AI 設計、2024 設計",
        "excerpt": "分析當前網頁設計的最新趨勢和最佳實踐",
        "length": "2000-2500 字"
    },
    {
        "id": 12,
        "title": "用戶體驗設計：為什麼你的網站用戶留不住",
        "slug": "ux-design-retention",
        "category": "網頁設計",
        "keywords": "用戶體驗、UX 設計、網站優化、轉化率",
        "excerpt": "深入探討 UX 設計原理和常見錯誤",
        "length": "1800-2200 字"
    }
]

def print_article_info():
    """打印文章信息"""
    print("=" * 80)
    print("部落格文章批量生成計畫")
    print("=" * 80)
    print(f"\n計畫生成 {len(ARTICLES)} 篇文章：\n")
    
    for article in ARTICLES:
        print(f"[{article['id']:02d}] {article['title']}")
        print(f"      分類：{article['category']} | 長度：{article['length']}")
        print(f"      Slug：{article['slug']}\n")
    
    print("=" * 80)
    print("\n下一步：")
    print("1. 使用 LLM 根據每篇文章的配置生成內容")
    print("2. 保存為 Markdown 文件")
    print("3. 創建數據導入腳本")
    print("4. 批量導入到數據庫")
    print("\n" + "=" * 80)

def create_article_template(article):
    """創建文章模板"""
    template = f"""# {article['title']}

**發佈日期**：{datetime.now().strftime('%Y-%m-%d')}  
**分類**：{article['category']}  
**閱讀時間**：8 分鐘  
**關鍵詞**：{article['keywords']}

---

## 引言

[在這裡添加引言段落 - 150-200 字]

## 主要內容

[在這裡添加主要內容 - 800-1500 字]

### 核心要點 1

[詳細說明]

### 核心要點 2

[詳細說明]

### 核心要點 3

[詳細說明]

## 實踐應用

[在這裡添加實踐建議 - 200-300 字]

## 結論

[在這裡添加結論 - 150-200 字]

---

**關鍵要點**：
- [要點 1]
- [要點 2]
- [要點 3]

**立即咨詢**：[開始你的項目 →](/contact)

---

**相關閱讀**：
- [相關文章 1](/blog/related-1)
- [相關文章 2](/blog/related-2)
"""
    return template

if __name__ == "__main__":
    print_article_info()
    
    # 創建輸出目錄
    os.makedirs("blog-content", exist_ok=True)
    
    # 創建文章模板
    print("\n正在創建文章模板...\n")
    for article in ARTICLES:
        filename = f"blog-content/{article['id']:02d}-{article['slug']}.md"
        template = create_article_template(article)
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(template)
        
        print(f"✓ 已創建：{filename}")
    
    print("\n✅ 所有文章模板已創建！")
    print("\n下一步：使用 LLM 填充每篇文章的內容")

