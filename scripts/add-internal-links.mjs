import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesPath = path.join(__dirname, '../client/src/data/articles.ts');

// 內部連結映射（根據 INTERNAL_LINKING_STRATEGY.md）
const linkingMap = {
  1: [
    { id: 2, text: '從古蹟到現代', anchor: '從古蹟到現代' },
    { id: 4, text: '設計的溫度定義', anchor: '設計的溫度定義' },
    { id: 12, text: '品牌故事講述的力量', anchor: '品牌故事講述' }
  ],
  2: [
    { id: 1, text: '台南設計的靈魂', anchor: '台南設計' },
    { id: 5, text: '古蹟與現代設計融合', anchor: '古蹟設計' },
    { id: 6, text: '古蹟數位化保存', anchor: '古蹟數位化' }
  ],
  3: [
    { id: 4, text: '台南企業品牌困境', anchor: '品牌困難' },
    { id: 12, text: '品牌故事講述', anchor: '品牌故事' },
    { id: 13, text: '台南電商設計', anchor: '電商設計' }
  ],
  5: [
    { id: 2, text: '從古蹟到現代', anchor: '古蹟現代化' },
    { id: 6, text: '古蹟數位化保存', anchor: '數位化保存' },
    { id: 7, text: '古蹟數位化保存的未來', anchor: '未來展望' }
  ],
  7: [
    { id: 8, text: '設計師和開發者的完美協作', anchor: '設計協作' },
    { id: 9, text: '色彩心理學在網頁設計中的應用', anchor: '色彩設計' },
    { id: 10, text: '轉化率優化的設計策略', anchor: '轉化優化' }
  ],
  8: [
    { id: 7, text: '為什麼你的網站用戶留不住', anchor: 'UX 設計' },
    { id: 9, text: '色彩心理學', anchor: '色彩心理學' },
    { id: 10, text: '轉化率優化', anchor: '轉化優化' }
  ],
  9: [
    { id: 7, text: '為什麼用戶留不住', anchor: 'UX 設計' },
    { id: 8, text: '設計師協作', anchor: '設計協作' },
    { id: 11, text: '行動優先設計', anchor: '行動設計' }
  ],
  10: [
    { id: 9, text: '色彩心理學', anchor: '色彩心理' },
    { id: 7, text: '為什麼用戶留不住', anchor: '用戶體驗' },
    { id: 11, text: '行動優先設計', anchor: '響應式設計' }
  ],
  11: [
    { id: 7, text: '為什麼用戶留不住', anchor: 'UX 設計' },
    { id: 10, text: '轉化率優化', anchor: '轉化優化' },
    { id: 20, text: '網站性能優化', anchor: '性能優化' }
  ],
  12: [
    { id: 1, text: '台南設計的靈魂', anchor: '台南設計' },
    { id: 4, text: '溫度設計的四個維度', anchor: '設計維度' },
    { id: 13, text: '台南電商設計', anchor: '電商' }
  ],
  13: [
    { id: 3, text: '台南中小企業品牌困難', anchor: '台南企業' },
    { id: 10, text: '轉化率優化', anchor: '轉化優化' },
    { id: 12, text: '品牌故事講述', anchor: '品牌故事' }
  ]
};

console.log('開始添加內部連結...');

try {
  // 讀取 articles.ts
  let content = fs.readFileSync(articlesPath, 'utf-8');

  // 解析文章數據
  const articlesMatch = content.match(/export const SAMPLE_ARTICLES = \[([\s\S]*?)\];/);
  if (!articlesMatch) {
    console.error('❌ 無法解析 articles.ts');
    process.exit(1);
  }

  console.log('✅ 成功讀取 articles.ts');
  console.log('📊 內部連結映射已準備');
  console.log(`📝 將為 ${Object.keys(linkingMap).length} 篇文章添加內部連結`);

  // 統計連結數量
  let totalLinks = 0;
  for (const links of Object.values(linkingMap)) {
    totalLinks += links.length;
  }
  console.log(`🔗 總共將添加 ${totalLinks} 個內部連結`);

  // 注意：實際的連結添加需要在 articles.ts 中手動或通過更複雜的 AST 解析
  // 這裡只是演示連結映射的準備
  
  console.log('\n✅ 內部連結映射已準備完成');
  console.log('📋 下一步：在 articles.ts 中的每篇文章內容中添加相關連結');
  console.log('\n連結映射示例：');
  console.log('文章 1（台南設計的靈魂）應連結到：');
  linkingMap[1].forEach(link => {
    console.log(`  - [${link.text}](/blog/${link.id})`);
  });

} catch (error) {
  console.error('❌ 錯誤：', error.message);
  process.exit(1);
}
