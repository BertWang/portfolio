import fs from 'fs';
import path from 'path';

const blogContentDir = '/home/ubuntu/bert_wang_portfolio/blog-content';
const outputFile = '/home/ubuntu/bert_wang_portfolio/client/src/data/articles.ts';

// 文章顏色映射
const colorMap = {
  '01': 'from-amber-400 to-orange-500',
  '02': 'from-red-400 to-pink-500',
  '03': 'from-blue-400 to-cyan-500',
  '04': 'from-purple-400 to-pink-500',
  '05': 'from-green-400 to-teal-500',
  '06': 'from-indigo-400 to-blue-500',
  '07': 'from-yellow-400 to-orange-500',
  '08': 'from-rose-400 to-red-500',
};

// 分類映射
const categoryMap = {
  'tainan-design': '台南設計',
  'ancient-to-modern': '文化保存',
  'sme-branding': '品牌設計',
  'design-warmth': '台南設計',
  'heritage': '文化保存',
  'seo': 'SEO 優化',
  'ux': '用戶體驗',
  'designer': '設計協作',
  'color': '設計心理學',
  'conversion': '轉化優化',
  'accessible': '無障礙設計',
};

function getCategoryFromSlug(slug) {
  for (const [key, value] of Object.entries(categoryMap)) {
    if (slug.includes(key)) {
      return value;
    }
  }
  return '設計文章';
}

function getColorFromSlug(slug) {
  const prefix = slug.split('-')[0];
  return colorMap[prefix] || 'from-slate-400 to-slate-600';
}

function extractMetadata(content) {
  const lines = content.split('\n');
  const metadata = {};
  
  for (const line of lines) {
    if (line.includes('發佈日期')) {
      const match = line.match(/(\d{4}-\d{2}-\d{2})/);
      if (match) metadata.publishedAt = match[1];
    }
    if (line.includes('分類')) {
      const match = line.match(/：(.+)/);
      if (match) metadata.category = match[1].trim();
    }
    if (line.includes('閱讀時間')) {
      const match = line.match(/(\d+)/);
      if (match) metadata.readingTime = parseInt(match[1]);
    }
    if (line.includes('關鍵詞')) {
      const match = line.match(/：(.+)/);
      if (match) metadata.keywords = match[1].trim();
    }
  }
  
  return metadata;
}

function extractTitle(content) {
  const match = content.match(/^# (.+)/m);
  return match ? match[1] : 'Untitled';
}

function extractExcerpt(content) {
  const lines = content.split('\n');
  let startIdx = 0;
  
  // 跳過標題和元數據
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('##')) {
      startIdx = i + 1;
      break;
    }
  }
  
  // 提取前 150 個字符作為摘要
  let excerpt = '';
  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('#') && line.length > 0) {
      excerpt += line + ' ';
      if (excerpt.length > 150) break;
    }
  }
  
  return excerpt.substring(0, 150).trim() + '...';
}

function processArticles() {
  const files = fs.readdirSync(blogContentDir)
    .filter(f => f.endsWith('.md'))
    .sort();
  
  const articles = [];
  let id = 1;
  
  for (const file of files) {
    const filePath = path.join(blogContentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 提取 slug（移除 .md 和編號前綴）
    const slug = file
      .replace(/^\d+-/, '')
      .replace(/\.md$/, '');
    
    const title = extractTitle(content);
    const metadata = extractMetadata(content);
    const excerpt = extractExcerpt(content);
    const category = metadata.category || getCategoryFromSlug(slug);
    const color = getColorFromSlug(slug);
    
    articles.push({
      id,
      slug,
      title,
      category,
      excerpt,
      content,
      author: '王純瑋',
      publishedAt: metadata.publishedAt || '2024-06-01',
      featured: id <= 3,
      readingTime: metadata.readingTime || 6,
      viewCount: Math.floor(Math.random() * 300) + 100,
      keywords: metadata.keywords || '',
      color,
    });
    
    id++;
  }
  
  return articles;
}

function generateTypeScriptFile(articles) {
  let content = `// Auto-generated article data\n\n`;
  content += `export const SAMPLE_ARTICLES = [\n`;
  
  for (const article of articles) {
    const contentEscaped = article.content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');
    
    content += `  {\n`;
    content += `    id: ${article.id},\n`;
    content += `    slug: "${article.slug}",\n`;
    content += `    title: "${article.title.replace(/"/g, '\\"')}",\n`;
    content += `    category: "${article.category}",\n`;
    content += `    excerpt: "${article.excerpt.replace(/"/g, '\\"')}",\n`;
    content += `    content: \`${contentEscaped}\`,\n`;
    content += `    author: "${article.author}",\n`;
    content += `    publishedAt: "${article.publishedAt}T00:00:00Z",\n`;
    content += `    featured: ${article.featured},\n`;
    content += `    readingTime: ${article.readingTime},\n`;
    content += `    viewCount: ${article.viewCount},\n`;
    content += `    keywords: "${article.keywords}",\n`;
    content += `    color: "${article.color}",\n`;
    content += `  },\n`;
  }
  
  content += `];\n`;
  
  return content;
}

try {
  console.log('開始轉換文章...');
  const articles = processArticles();
  console.log(`找到 ${articles.length} 篇文章`);
  
  const tsContent = generateTypeScriptFile(articles);
  
  // 確保目錄存在
  const dir = path.dirname(outputFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(outputFile, tsContent);
  console.log(`✅ 成功生成 ${outputFile}`);
  console.log(`包含 ${articles.length} 篇文章`);
  
} catch (error) {
  console.error('❌ 轉換失敗:', error.message);
  process.exit(1);
}
