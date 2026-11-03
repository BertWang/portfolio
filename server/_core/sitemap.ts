/**
 * Extend the verified static homepage sitemap with *published* database posts.
 * DB's updatedAt changes when viewCount increments; it is NOT a valid content
 * lastmod. Use publishedAt conservatively until content-edit timestamps exist.
 */
const SITE_URL = "https://bertfolio-vncqhm2r.manus.space";

export interface SitemapPost {
  slug: string;
  publishedAt?: Date | null;
  isPublished?: boolean | null;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function renderPublishedSitemap(staticXml: string, posts: SitemapPost[]): string {
  if (!staticXml.includes("</urlset>")) {
    throw new Error("Invalid static sitemap: missing closing urlset");
  }

  const unique = new Set<string>();
  const urls = posts.flatMap(post => {
    if (!post.slug || post.isPublished === false || unique.has(post.slug)) return [];
    unique.add(post.slug);
    const loc = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`;
    const date = post.publishedAt instanceof Date && !Number.isNaN(post.publishedAt.valueOf())
      ? post.publishedAt.toISOString().slice(0, 10)
      : undefined;
    return [`  <url>
    <loc>${escapeXml(loc)}</loc>
${date ? `    <lastmod>${date}</lastmod>\n` : ""}  </url>`];
  });
  return staticXml.replace("</urlset>", `${urls.join("\n")}${urls.length ? "\n" : ""}</urlset>`);
}
