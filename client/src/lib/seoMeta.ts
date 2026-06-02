/**
 * SEO Meta Tags Manager
 * Handles dynamic meta tags for blog posts and case studies
 */

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage?: string;
  canonicalUrl: string;
  schema?: Record<string, any>;
}

/**
 * Generate SEO meta tags for blog post
 */
export function generateBlogPostMeta(post: any): SEOMeta {
  const baseUrl = window.location.origin;
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.titleTw} | 王純瑋 - 台南網頁設計`,
    description: post.excerptTw || post.contentTw?.substring(0, 160),
    keywords: `${post.category}, 台南網頁設計, ${post.keywords || ''}`,
    ogTitle: post.titleTw,
    ogDescription: post.excerptTw,
    ogImage: post.featuredImageUrl,
    ogUrl: postUrl,
    twitterTitle: post.titleTw,
    twitterDescription: post.excerptTw,
    twitterImage: post.featuredImageUrl,
    canonicalUrl: postUrl,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.titleTw,
      description: post.excerptTw,
      image: post.featuredImageUrl,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: '王純瑋',
        url: baseUrl,
      },
      publisher: {
        '@type': 'Organization',
        name: '王純瑋 - 台南網頁設計',
        url: baseUrl,
      },
    },
  };
}

/**
 * Generate SEO meta tags for case study
 */
export function generateCaseStudyMeta(study: any): SEOMeta {
  const baseUrl = window.location.origin;
  const studyUrl = `${baseUrl}/case-studies/${study.slug}`;

  return {
    title: `${study.titleTw} | 案例研究 | 王純瑋`,
    description: study.summaryTw || study.challengeTw?.substring(0, 160),
    keywords: `${study.projectCategory}, 案例研究, 台南網頁設計, ${study.technologies?.join(', ') || ''}`,
    ogTitle: study.titleTw,
    ogDescription: study.summaryTw,
    ogImage: study.featuredImageUrl,
    ogUrl: studyUrl,
    twitterTitle: study.titleTw,
    twitterDescription: study.summaryTw,
    twitterImage: study.featuredImageUrl,
    canonicalUrl: studyUrl,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: study.titleTw,
      description: study.summaryTw,
      image: study.featuredImageUrl,
      creator: {
        '@type': 'Person',
        name: '王純瑋',
        url: baseUrl,
      },
      dateCreated: study.createdAt,
      keywords: study.projectCategory,
    },
  };
}

/**
 * Generate SEO meta tags for blog listing page
 */
export function generateBlogListMeta(category?: string): SEOMeta {
  const baseUrl = window.location.origin;
  const blogUrl = `${baseUrl}/blog`;

  const title = category
    ? `${category} - 部落格 | 王純瑋`
    : '部落格 | 王純瑋 - 台南網頁設計與文化保存';

  const description = category
    ? `探索${category}相關的深度文章和最佳實踐`
    : '台南網頁設計、SEO 優化、文化保存、品牌策略的深度文章';

  return {
    title,
    description,
    keywords: `部落格, 台南設計, ${category || '網頁設計, SEO, 文化保存'}`,
    ogTitle: title,
    ogDescription: description,
    ogUrl: blogUrl,
    twitterTitle: title,
    twitterDescription: description,
    canonicalUrl: blogUrl,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description: description,
      url: blogUrl,
      publisher: {
        '@type': 'Organization',
        name: '王純瑋',
        url: baseUrl,
      },
    },
  };
}

/**
 * Update document meta tags
 */
export function updateMetaTags(meta: SEOMeta) {
  // Title
  document.title = meta.title;

  // Meta description
  updateMetaTag('description', meta.description);

  // Keywords
  updateMetaTag('keywords', meta.keywords);

  // Open Graph
  updateMetaTag('og:title', meta.ogTitle, 'property');
  updateMetaTag('og:description', meta.ogDescription, 'property');
  updateMetaTag('og:url', meta.ogUrl, 'property');
  updateMetaTag('og:type', 'article', 'property');
  if (meta.ogImage) {
    updateMetaTag('og:image', meta.ogImage, 'property');
  }

  // Twitter Card
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', meta.twitterTitle);
  updateMetaTag('twitter:description', meta.twitterDescription);
  if (meta.twitterImage) {
    updateMetaTag('twitter:image', meta.twitterImage);
  }

  // Canonical URL
  updateCanonicalLink(meta.canonicalUrl);

  // Schema.org structured data
  if (meta.schema) {
    updateStructuredData(meta.schema);
  }
}

/**
 * Update or create meta tag
 */
function updateMetaTag(
  name: string,
  content: string,
  attribute: 'name' | 'property' = 'name'
) {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

/**
 * Update canonical link
 */
function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]');

  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }

  link.setAttribute('href', url);
}

/**
 * Update structured data (JSON-LD)
 */
function updateStructuredData(schema: Record<string, any>) {
  // Remove existing structured data
  const existing = document.querySelector('script[type="application/ld+json"]');
  if (existing) {
    existing.remove();
  }

  // Create new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
