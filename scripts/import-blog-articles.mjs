import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from '../dist/server/db.js';
import { blogPosts } from '../drizzle/schema.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogContentDir = path.join(__dirname, '../blog-content');

// 讀取 Markdown 文件並解析 frontmatter
function parseMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!frontmatterMatch) {
    console.error(`Invalid markdown format in ${filePath}`);
    return null;
  }

  const frontmatterStr = frontmatterMatch[1];
  const body = frontmatterMatch[2];

  // 簡單的 YAML 解析
  const frontmatter = {};
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      // 移除引號
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // 轉換布爾值
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      // 轉換數字
      if (!isNaN(value) && value !== '') value = parseInt(value);
      frontmatter[key.trim()] = value;
    }
  });

  return {
    ...frontmatter,
    content: body.trim(),
  };
}

// 主函數
async function importArticles() {
  try {
    console.log('開始導入部落格文章...');
    
    const files = fs.readdirSync(blogContentDir)
      .filter(f => f.endsWith('.md'))
      .sort();

    console.log(`找到 ${files.length} 篇文章`);

    let importedCount = 0;
    let skippedCount = 0;

    for (const file of files) {
      const filePath = path.join(blogContentDir, file);
      const article = parseMarkdown(filePath);

      if (!article) {
        skippedCount++;
        continue;
      }

      // 檢查是否已存在
      const existing = await db.query.blogPosts.findFirst({
        where: (posts, { eq }) => eq(posts.slug, article.slug),
      });

      if (existing) {
        console.log(`⏭️  跳過已存在的文章: ${article.title}`);
        skippedCount++;
        continue;
      }

      // 準備數據
      const articleData = {
        title: article.title || '未命名文章',
        slug: article.slug || file.replace('.md', ''),
        category: article.category || '其他',
        excerpt: article.excerpt || '',
        content: article.content,
        author: article.author || '王純瑋',
        publishedAt: new Date(article.publishedAt || new Date()),
        updatedAt: new Date(article.updatedAt || new Date()),
        featured: article.featured === true,
        readingTime: article.readingTime || 5,
        viewCount: 0,
        keywords: article.keywords || '',
        metaDescription: article.excerpt || '',
        ogImage: article.ogImage || null,
        // 三語言支持
        titleJa: article.titleJa || article.title,
        titleMs: article.titleMs || article.title,
        excerptJa: article.excerptJa || article.excerpt,
        excerptMs: article.excerptMs || article.excerpt,
        contentJa: article.contentJa || article.content,
        contentMs: article.contentMs || article.content,
        keywordsJa: article.keywordsJa || article.keywords,
        keywordsMs: article.keywordsMs || article.keywords,
      };

      try {
        await db.insert(blogPosts).values(articleData);
        console.log(`✅ 導入成功: ${article.title}`);
        importedCount++;
      } catch (error) {
        console.error(`❌ 導入失敗 ${article.title}:`, error.message);
        skippedCount++;
      }
    }

    console.log(`\n導入完成！`);
    console.log(`✅ 成功導入: ${importedCount} 篇`);
    console.log(`⏭️  跳過: ${skippedCount} 篇`);
    console.log(`📊 總計: ${files.length} 篇`);

  } catch (error) {
    console.error('導入過程出錯:', error);
    process.exit(1);
  }
}

// 運行導入
importArticles().then(() => {
  console.log('導入腳本完成');
  process.exit(0);
}).catch(error => {
  console.error('導入腳本失敗:', error);
  process.exit(1);
});
