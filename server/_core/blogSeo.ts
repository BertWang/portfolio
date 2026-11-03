import type { BlogPost } from "../../drizzle/schema";

// The production Express server supplies crawler-visible HTML for blog routes.
// React replaces the fallback content after hydration in a normal browser.
const SITE_URL = "https://bertfolio-vncqhm2r.manus.space";

type SeoPost = Pick<BlogPost, "slug" | "titleTw" | "excerptTw" | "contentTw" | "featuredImageUrl" | "publishedAt">;
type SeoListPost = Pick<BlogPost, "slug" | "titleTw" | "excerptTw">;

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[char]!);
}

function plainText(markdown: string): string {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/[*_`~]/g, "")
    .trim();
}

type SeoDocument = {
  title: string;
  description: string;
  canonical: string;
  image?: string | null;
  schema: Record<string, unknown>;
  fallback: string;
  status?: number;
  robots?: string;
};

function withSeo(template: string, page: SeoDocument): string {
  // Replacing existing tags avoids conflicting homepage metadata for crawlers.
  const image = page.image?.startsWith("https://")
    ? page.image
    : `${SITE_URL}/images/bert-profile.jpg`;
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  const tags: Array<[string, string, string]> = [
    ["name", "description", page.description],
    ["property", "og:type", page.canonical.endsWith("/blog") ? "website" : "article"],
    ["property", "og:title", page.title],
    ["property", "og:description", page.description],
    ["property", "og:url", page.canonical],
    ["property", "og:image", image],
    ["name", "twitter:title", page.title],
    ["name", "twitter:description", page.description],
    ["name", "twitter:url", page.canonical],
    ["name", "twitter:image", image],
    ["name", "robots", page.robots ?? "index, follow"],
  ];
  for (const [attr, key, value] of tags) {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const matcher = new RegExp(`<meta\\s+${attr}="${escapedKey}"[^>]*\\/?>`, "i");
    const markup = `<meta ${attr}="${key}" content="${escapeHtml(value)}" />`;
    if (matcher.test(html)) html = html.replace(matcher, markup);
    else html = html.replace("</head>", `  ${markup}\n</head>`);
  }
  html = html.replace(/<link\s+rel="canonical"[^>]*\/?\s*>/i,
    `<link rel="canonical" href="${escapeHtml(page.canonical)}" />`);
  // Homepage LocalBusiness data must not remain on unrelated blog pages.
  html = html.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, "");
  const jsonLd = JSON.stringify(page.schema).replace(/</g, "\\u003c");
  html = html.replace("</head>", `  <script type="application/ld+json">${jsonLd}</script>\n</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${page.fallback}</div>`);
  return html;
}

export function renderBlogListHtml(template: string, posts: SeoListPost[]): string {
  const title = "部落格 | 王純瑋 - 台南網頁設計與文化保存";
  const description = "台南網頁設計、SEO 優化、文化保存、品牌策略的深度文章。";
  const list = posts.map(post =>
    `<li><a href="/blog/${encodeURIComponent(post.slug)}">${escapeHtml(post.titleTw)}</a>${post.excerptTw ? `<p>${escapeHtml(post.excerptTw)}</p>` : ""}</li>`
  ).join("");
  return withSeo(template, {
    title, description, canonical: `${SITE_URL}/blog`,
    schema: { "@context": "https://schema.org", "@type": "CollectionPage", name: title,
      description, url: `${SITE_URL}/blog` },
    fallback: `<main><h1>${escapeHtml(title)}</h1><ul>${list}</ul></main>`,
  });
}

export function renderBlogPostHtml(template: string, post: SeoPost): string {
  const canonical = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`;
  const description = post.excerptTw || plainText(post.contentTw).slice(0, 160);
  const title = `${post.titleTw} | 王純瑋 - 台南網頁設計`;
  const content = escapeHtml(plainText(post.contentTw).slice(0, 20000));
  const date = post.publishedAt?.toISOString();
  return withSeo(template, {
    title, description, canonical, image: post.featuredImageUrl,
    schema: {
      "@context": "https://schema.org", "@type": "BlogPosting",
      headline: post.titleTw, description, mainEntityOfPage: canonical,
      ...(date ? { datePublished: date } : {}),
      author: { "@type": "Person", name: "王純瑋" },
    },
    fallback: `<main><article><h1>${escapeHtml(post.titleTw)}</h1><p>${escapeHtml(description)}</p><div style="white-space:pre-wrap">${content}</div></article></main>`,
  });
}

export function renderBlogUnavailableHtml(template: string, status: 404 | 503): string {
  const missing = status === 404;
  return withSeo(template, {
    title: missing ? "文章未找到 | Bertfolio" : "文章暫時無法讀取 | Bertfolio",
    description: missing ? "找不到指定的文章。" : "部落格暫時無法讀取，請稍後再試。",
    canonical: `${SITE_URL}/blog`,
    robots: "noindex, follow",
    status,
    schema: { "@context": "https://schema.org", "@type": "WebPage",
      name: missing ? "文章未找到" : "文章暫時無法讀取" },
    fallback: `<main><h1>${missing ? "文章未找到" : "文章暫時無法讀取"}</h1><a href="/blog">返回部落格</a></main>`,
  });
}
