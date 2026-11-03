import { describe, expect, it } from "vitest";
import { renderPublishedSitemap } from "./_core/sitemap";

const base = `<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>https://bertfolio-vncqhm2r.manus.space/tw/</loc></url>
</urlset>`;

describe("published article sitemap", () => {
  it("adds real published links without placing unpublished drafts in XML", () => {
    const xml = renderPublishedSitemap(base, [
      { slug: "public-one", isPublished: true, publishedAt: new Date("2026-10-01T00:00:00Z") },
      { slug: "draft-two", isPublished: false, publishedAt: new Date("2026-10-02T00:00:00Z") },
      { slug: "public-one", isPublished: true },
    ]);
    expect(xml).toContain("/tw/");
    expect(xml).toContain("/blog/public-one");
    expect(xml).toContain("<lastmod>2026-10-01</lastmod>");
    expect(xml).not.toContain("draft-two");
    expect(xml.match(/<loc>[^<]*public-one/g)?.length).toBe(1);
  });

  it("escapes URLs and omits lastmod when content date is not known", () => {
    const xml = renderPublishedSitemap(base, [{ slug: "x&<y>", publishedAt: null }]);
    expect(xml).toContain("x%26%3Cy%3E");
    expect(xml).not.toContain("<lastmod>");
  });

  it("uses published date, never view-driven updatedAt as content timestamp", () => {
    const xml = renderPublishedSitemap(base, [{
      slug: "read-often", publishedAt: new Date("2026-01-01T00:00:00Z"),
      updatedAt: new Date("2026-11-03T00:00:00Z"),
    } as Parameters<typeof renderPublishedSitemap>[1][number]]);
    expect(xml).toContain("<lastmod>2026-01-01</lastmod>");
    expect(xml).not.toContain("2026-11-03");
  });

  it("rejects malformed base XML", () => {
    expect(() => renderPublishedSitemap("<xml>", [])).toThrow("Invalid static sitemap");
  });
});
