import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('='.repeat(60));
console.log('🔍 性能基準測試報告');
console.log('='.repeat(60));

// 1. 文件大小分析
console.log('\n📊 1. 編譯產物大小分析');
console.log('-'.repeat(60));

const distPath = path.join(__dirname, 'dist', 'public');
const htmlPath = path.join(distPath, 'index.html');
const cssPath = path.join(distPath, 'assets', 'index-DT4YJ_zr.css');
const jsPath = path.join(distPath, 'assets', 'index-xtJjgFfa.js');

const htmlSize = fs.statSync(htmlPath).size;
const cssSize = fs.statSync(cssPath).size;
const jsSize = fs.statSync(jsPath).size;
const totalSize = htmlSize + cssSize + jsSize;

console.log(`HTML 文件:     ${(htmlSize / 1024).toFixed(2)} KB`);
console.log(`CSS 文件:      ${(cssSize / 1024).toFixed(2)} KB`);
console.log(`JS 文件:       ${(jsSize / 1024).toFixed(2)} KB`);
console.log(`總大小:        ${(totalSize / 1024).toFixed(2)} KB`);

// 2. Gzip 壓縮估算
console.log('\n📦 2. Gzip 壓縮估算');
console.log('-'.repeat(60));

const cssGzipEstimate = cssSize * 0.15;
const jsGzipEstimate = jsSize * 0.29;
const htmlGzipEstimate = htmlSize * 0.25;
const totalGzipEstimate = cssGzipEstimate + jsGzipEstimate + htmlGzipEstimate;

console.log(`HTML Gzip:     ${(htmlGzipEstimate / 1024).toFixed(2)} KB (約 25%)`);
console.log(`CSS Gzip:      ${(cssGzipEstimate / 1024).toFixed(2)} KB (約 15%)`);
console.log(`JS Gzip:       ${(jsGzipEstimate / 1024).toFixed(2)} KB (約 29%)`);
console.log(`總 Gzip:       ${(totalGzipEstimate / 1024).toFixed(2)} KB`);
console.log(`壓縮率:        ${((1 - totalGzipEstimate / totalSize) * 100).toFixed(1)}%`);

// 3. HTML 結構分析
console.log('\n📄 3. HTML 結構分析');
console.log('-'.repeat(60));

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const metaCount = (htmlContent.match(/<meta/g) || []).length;
const linkCount = (htmlContent.match(/<link/g) || []).length;
const scriptCount = (htmlContent.match(/<script/g) || []).length;
const imgCount = (htmlContent.match(/<img/g) || []).length;

console.log(`Meta 標籤:     ${metaCount}`);
console.log(`Link 標籤:     ${linkCount}`);
console.log(`Script 標籤:   ${scriptCount}`);
console.log(`Img 標籤:      ${imgCount}`);

// 4. CSS 分析
console.log('\n🎨 4. CSS 分析');
console.log('-'.repeat(60));

const cssContent = fs.readFileSync(cssPath, 'utf-8');
const cssRules = (cssContent.match(/\{[^}]*\}/g) || []).length;
const cssSelectors = (cssContent.match(/[^,{]+(?=\{)/g) || []).length;
const cssKeyframes = (cssContent.match(/@keyframes/g) || []).length;
const cssImports = (cssContent.match(/@import/g) || []).length;

console.log(`CSS 規則數:    ${cssRules}`);
console.log(`選擇器數:      ${cssSelectors}`);
console.log(`Keyframes:     ${cssKeyframes}`);
console.log(`@import:       ${cssImports}`);

// 5. 性能指標評估
console.log('\n⚡ 5. 性能指標評估');
console.log('-'.repeat(60));

const metrics = {
  'HTML 大小': { value: htmlSize / 1024, unit: 'KB', threshold: 400, status: htmlSize / 1024 < 400 ? '✅' : '⚠️' },
  'CSS 大小': { value: cssSize / 1024, unit: 'KB', threshold: 150, status: cssSize / 1024 < 150 ? '✅' : '⚠️' },
  'JS 大小': { value: jsSize / 1024, unit: 'KB', threshold: 500, status: jsSize / 1024 < 500 ? '✅' : '⚠️' },
  'Gzip 總大小': { value: totalGzipEstimate / 1024, unit: 'KB', threshold: 250, status: totalGzipEstimate / 1024 < 250 ? '✅' : '⚠️' },
  'Meta 標籤': { value: metaCount, unit: '個', threshold: 30, status: metaCount < 30 ? '✅' : '⚠️' },
};

Object.entries(metrics).forEach(([key, metric]) => {
  console.log(`${metric.status} ${key.padEnd(15)} ${metric.value.toFixed(2)} ${metric.unit} (閾值: ${metric.threshold})`);
});

// 6. 建議和優化方向
console.log('\n💡 6. 優化建議');
console.log('-'.repeat(60));

const recommendations = [];

if (jsSize / 1024 > 500) {
  recommendations.push('• JS 文件過大（>500KB），建議進行代碼分割（Code Splitting）');
}

if (cssSize / 1024 > 150) {
  recommendations.push('• CSS 文件較大（>150KB），建議檢查未使用的 Tailwind 類');
}

if (htmlSize / 1024 > 400) {
  recommendations.push('• HTML 文件較大（>400KB），考慮延遲加載非關鍵內容');
}

if (metaCount > 30) {
  recommendations.push('• Meta 標籤過多，可能影響頁面加載速度');
}

if (recommendations.length === 0) {
  recommendations.push('✅ 所有指標都在合理範圍內');
} else {
  recommendations.forEach(rec => console.log(rec));
}

// 7. 總體評分
console.log('\n📈 7. 性能評分');
console.log('-'.repeat(60));

let score = 100;
if (jsSize / 1024 > 500) score -= 15;
if (cssSize / 1024 > 150) score -= 10;
if (htmlSize / 1024 > 400) score -= 10;
if (metaCount > 30) score -= 5;

const performanceGrade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';

console.log(`性能評分: ${score}/100 (等級: ${performanceGrade})`);
console.log(`\n評分說明:`);
console.log(`  A (90-100): 優秀 - 性能指標全面達標`);
console.log(`  B (80-89):  良好 - 大部分指標達標`);
console.log(`  C (70-79):  中等 - 需要進行優化`);
console.log(`  D (<70):    較差 - 需要大幅優化`);

// 8. 對比基準
console.log('\n📊 8. 業界基準對比');
console.log('-'.repeat(60));

const benchmarks = {
  '小型網站': { js: 100, css: 50, total: 200 },
  '中型網站': { js: 300, css: 100, total: 500 },
  '大型應用': { js: 800, css: 200, total: 1200 },
};

console.log('當前網站指標:');
console.log(`  JS: ${(jsSize / 1024).toFixed(0)} KB | CSS: ${(cssSize / 1024).toFixed(0)} KB | 總計: ${(totalSize / 1024).toFixed(0)} KB`);
console.log('\n業界基準:');
Object.entries(benchmarks).forEach(([type, sizes]) => {
  const status = jsSize / 1024 <= sizes.js && cssSize / 1024 <= sizes.css ? '✅' : '⚠️';
  console.log(`  ${status} ${type}: JS ${sizes.js}KB | CSS ${sizes.css}KB | 總計 ${sizes.total}KB`);
});

console.log('\n' + '='.repeat(60));
console.log('✅ 性能基準測試完成');
console.log('='.repeat(60));
