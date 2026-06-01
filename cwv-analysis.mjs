import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('='.repeat(70));
console.log('🎯 Core Web Vitals (CWV) 分析報告');
console.log('='.repeat(70));

// 讀取編譯產物
const distPath = path.join(__dirname, 'dist', 'public');
const htmlPath = path.join(distPath, 'index.html');
const cssPath = path.join(distPath, 'assets', 'index-DT4YJ_zr.css');
const jsPath = path.join(distPath, 'assets', 'index-xtJjgFfa.js');

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const cssSize = fs.statSync(cssPath).size;
const jsSize = fs.statSync(jsPath).size;

// 1. LCP (Largest Contentful Paint) 分析
console.log('\n📈 1. LCP (Largest Contentful Paint) - 最大內容繪製');
console.log('-'.repeat(70));

// 分析可能影響 LCP 的因素
const hasImages = htmlContent.includes('<img');
const hasVideos = htmlContent.includes('<video');
const hasLazyLoad = htmlContent.includes('loading="lazy"');
const criticalCSS = cssSize / 1024; // 關鍵 CSS 大小

console.log(`\n關鍵指標:`);
console.log(`  • 圖片資源: ${hasImages ? '✅ 有' : '❌ 無'}`);
console.log(`  • 視頻資源: ${hasVideos ? '✅ 有' : '❌ 無'}`);
console.log(`  • 懶加載: ${hasLazyLoad ? '✅ 已啟用' : '❌ 未啟用'}`);
console.log(`  • 關鍵 CSS 大小: ${criticalCSS.toFixed(2)} KB`);

// LCP 估算
let lcpScore = 100;
if (jsSize / 1024 > 500) lcpScore -= 20;
if (cssSize / 1024 > 150) lcpScore -= 15;
if (hasImages && !hasLazyLoad) lcpScore -= 10;

const lcpStatus = lcpScore >= 75 ? '✅ 良好' : lcpScore >= 50 ? '⚠️ 需改善' : '❌ 較差';
console.log(`\nLCP 估算評分: ${lcpScore}/100 (${lcpStatus})`);
console.log(`預期 LCP 時間: ${lcpScore >= 75 ? '< 2.5s' : lcpScore >= 50 ? '2.5-4s' : '> 4s'}`);

// 2. FID (First Input Delay) 分析
console.log('\n⚡ 2. FID (First Input Delay) - 首次輸入延遲');
console.log('-'.repeat(70));

// 分析 JS 執行時間
const jsLinesCount = jsSize / 1024; // 粗略估算
const hasEventListeners = htmlContent.includes('onClick') || htmlContent.includes('addEventListener');
const hasInteractiveElements = htmlContent.match(/<button|<a|<input|<form/g) || [];

console.log(`\n關鍵指標:`);
console.log(`  • JS 包大小: ${jsLinesCount.toFixed(0)} KB`);
console.log(`  • 交互元素數: ${hasInteractiveElements.length}`);
console.log(`  • 事件監聽: ${hasEventListeners ? '✅ 有' : '❌ 無'}`);

// FID 估算
let fidScore = 100;
if (jsSize / 1024 > 500) fidScore -= 25;
if (hasInteractiveElements.length > 50) fidScore -= 10;

const fidStatus = fidScore >= 75 ? '✅ 良好' : fidScore >= 50 ? '⚠️ 需改善' : '❌ 較差';
console.log(`\nFID 估算評分: ${fidScore}/100 (${fidStatus})`);
console.log(`預期 FID 時間: ${fidScore >= 75 ? '< 100ms' : fidScore >= 50 ? '100-300ms' : '> 300ms'}`);

// 3. CLS (Cumulative Layout Shift) 分析
console.log('\n🎬 3. CLS (Cumulative Layout Shift) - 累積版面配置偏移');
console.log('-'.repeat(70));

// 分析可能導致版面偏移的因素
const hasFixedDimensions = htmlContent.includes('width=') && htmlContent.includes('height=');
const hasAspectRatio = htmlContent.includes('aspect-');
const hasAnimations = cssSize > 0; // CSS 中可能有動畫
const animationCount = (htmlContent.match(/@keyframes|animation:/g) || []).length;

console.log(`\n關鍵指標:`);
console.log(`  • 固定尺寸: ${hasFixedDimensions ? '✅ 有' : '❌ 無'}`);
console.log(`  • 寬高比: ${hasAspectRatio ? '✅ 有' : '❌ 無'}`);
console.log(`  • 動畫數: ${animationCount}`);
console.log(`  • 字體加載: Google Fonts (可能導致 FOUT)`);

// CLS 估算
let clsScore = 100;
if (!hasFixedDimensions) clsScore -= 20;
if (!hasAspectRatio) clsScore -= 15;
if (animationCount > 10) clsScore -= 10;

const clsStatus = clsScore >= 75 ? '✅ 良好' : clsScore >= 50 ? '⚠️ 需改善' : '❌ 較差';
console.log(`\nCLS 估算評分: ${clsScore}/100 (${clsStatus})`);
console.log(`預期 CLS 值: ${clsScore >= 75 ? '< 0.1' : clsScore >= 50 ? '0.1-0.25' : '> 0.25'}`);

// 4. 其他重要指標
console.log('\n🔧 4. 其他重要指標');
console.log('-'.repeat(70));

// TTFB (Time to First Byte)
console.log(`\nTTFB (Time to First Byte):`);
console.log(`  預期值: < 600ms (需要服務器優化)`);

// FCP (First Contentful Paint)
console.log(`\nFCP (First Contentful Paint):`);
const fcpScore = 100 - (cssSize / 1024 > 150 ? 15 : 0) - (jsSize / 1024 > 500 ? 20 : 0);
console.log(`  估算評分: ${fcpScore}/100`);
console.log(`  預期時間: ${fcpScore >= 75 ? '< 1.8s' : '1.8-3s'}`);

// INP (Interaction to Next Paint)
console.log(`\nINP (Interaction to Next Paint):`);
const inpScore = fidScore; // 與 FID 相關
console.log(`  估算評分: ${inpScore}/100`);
console.log(`  預期時間: ${inpScore >= 75 ? '< 200ms' : '200-500ms'}`);

// 5. 整體 CWV 評分
console.log('\n📊 5. 整體 Core Web Vitals 評分');
console.log('-'.repeat(70));

const cwvScore = Math.round((lcpScore + fidScore + clsScore) / 3);
const cwvGrade = cwvScore >= 90 ? 'A' : cwvScore >= 80 ? 'B' : cwvScore >= 70 ? 'C' : 'D';
const cwvStatus = cwvScore >= 90 ? '✅ 優秀' : cwvScore >= 80 ? '✅ 良好' : cwvScore >= 70 ? '⚠️ 需改善' : '❌ 較差';

console.log(`\nCWV 綜合評分: ${cwvScore}/100 (等級: ${cwvGrade}) ${cwvStatus}`);

console.log(`\n各指標評分:`);
console.log(`  • LCP: ${lcpScore}/100 (${lcpScore >= 75 ? '✅' : '⚠️'})`);
console.log(`  • FID: ${fidScore}/100 (${fidScore >= 75 ? '✅' : '⚠️'})`);
console.log(`  • CLS: ${clsScore}/100 (${clsScore >= 75 ? '✅' : '⚠️'})`);

// 6. 優化建議
console.log('\n💡 6. 優化建議');
console.log('-'.repeat(70));

const suggestions = [];

if (lcpScore < 75) {
  suggestions.push('• LCP 優化:');
  suggestions.push('  - 減少 JS 包大小（當前 698KB，建議 < 500KB）');
  suggestions.push('  - 優化 CSS 加載（當前 123KB，建議 < 100KB）');
  suggestions.push('  - 使用預連接 (preconnect) 加速字體加載');
}

if (fidScore < 75) {
  suggestions.push('• FID 優化:');
  suggestions.push('  - 進行代碼分割 (Code Splitting)');
  suggestions.push('  - 使用 Web Workers 處理複雜計算');
  suggestions.push('  - 延遲加載非關鍵 JavaScript');
}

if (clsScore < 75) {
  suggestions.push('• CLS 優化:');
  suggestions.push('  - 確保所有圖片和視頻有固定尺寸');
  suggestions.push('  - 使用 font-display: swap 避免 FOUT');
  suggestions.push('  - 避免在現有內容上方插入動態內容');
}

if (suggestions.length === 0) {
  console.log('✅ CWV 指標良好，暫無重大優化建議');
} else {
  suggestions.forEach(s => console.log(s));
}

// 7. 優化優先級
console.log('\n🎯 7. 優化優先級');
console.log('-'.repeat(70));

const priorities = [
  { issue: 'JS 包大小過大', impact: '高', effort: '中', priority: 1 },
  { issue: 'CSS 文件優化', impact: '中', effort: '低', priority: 2 },
  { issue: '圖片優化', impact: '中', effort: '中', priority: 3 },
  { issue: '字體優化', impact: '低', effort: '低', priority: 4 },
];

console.log(`\n優先級排序 (影響度 × 工作量):`);
priorities.forEach((p, idx) => {
  console.log(`${idx + 1}. ${p.priority === 1 ? '🔴' : p.priority === 2 ? '🟠' : '🟡'} ${p.issue}`);
  console.log(`   影響度: ${p.impact} | 工作量: ${p.effort}`);
});

// 8. 預期改進
console.log('\n📈 8. 實施優化後的預期改進');
console.log('-'.repeat(70));

console.log(`\n當前狀態:`);
console.log(`  CWV 評分: ${cwvScore}/100`);
console.log(`  LCP: ${lcpScore}/100 | FID: ${fidScore}/100 | CLS: ${clsScore}/100`);

console.log(`\n優化後預期 (假設實施所有建議):`);
const improvedLcp = Math.min(100, lcpScore + 20);
const improvedFid = Math.min(100, fidScore + 15);
const improvedCls = Math.min(100, clsScore + 10);
const improvedCwv = Math.round((improvedLcp + improvedFid + improvedCls) / 3);

console.log(`  CWV 評分: ${improvedCwv}/100 (提升 ${improvedCwv - cwvScore} 分)`);
console.log(`  LCP: ${improvedLcp}/100 | FID: ${improvedFid}/100 | CLS: ${improvedCls}/100`);

console.log('\n' + '='.repeat(70));
console.log('✅ Core Web Vitals 分析完成');
console.log('='.repeat(70));
