-- 更新 12 篇文章的封面圖片 URL
-- 所有圖片已上傳至 S3 CDN，使用壓縮版本以優化加載速度

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-01-ai-web-design-fdQTk8mWUNw7YxCaUri4uK.webp' WHERE slug = 'ai-web-design-2026';

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-02-ai-structured-data-cLSPGqQZEvZkrz8ZhJ56vU.webp' WHERE slug = 'ai-structured-data-geo';

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-03-heritage-digitalization-CnJxHkbZS48nroKWuHnNVN.webp' WHERE slug = 'heritage-digitalization-5-keys';

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-04-tainan-brand-4paazg5CDwUTPS4uD77eAh.webp' WHERE slug = 'tainan-sme-brand-challenges';

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-05-php-performance-eob9QEsh94S7u7oPkrwqJc.webp' WHERE slug = 'php-performance-optimization-2026';

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-06-openlock-soyui-J5XQzLDz5AQNpXRRCE9xTG.webp' WHERE slug = 'openlock-soyui-case-studies';

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-07-documentary-AUitrDgntjmxPRfDFWizP4.webp' WHERE slug = 'documentary-digitalization-journey';

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-08-designer-responsibility-J3t4HZ7MBd4xk8EN8fTGoQ.webp' WHERE slug = 'designer-social-responsibility';

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-09-multilingual-seo-WRhsGQSYxCdPJLNq5ZsPDV.webp' WHERE slug = 'multilingual-seo-practice';

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-10-seo-advanced-PGXn5VrefnSHuJVQSzXaii.webp' WHERE slug = 'seo-advanced-internal-links';

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-11-brand-warmth-fmRKdT5ky9bEpCxds5vPPy.webp' WHERE slug = 'brand-warmth-science';

UPDATE blog_posts SET featured_image = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032489249/VNcqhM2ru3WVTvTmDCBiyy/blog-cover-12-ayurveda-design-Mq7dadBXmwoPZtV8QdoHqS.webp' WHERE slug = 'ayurveda-modern-design';

-- 驗證更新
SELECT id, title_tw, slug, featured_image FROM blog_posts 
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
