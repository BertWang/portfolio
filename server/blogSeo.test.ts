import { describe, expect, it } from "vitest";
import { renderBlogListHtml, renderBlogPostHtml, renderBlogUnavailableHtml } from "./_core/blogSeo";

const template = `<!doctype html><html lang="zh-TW"><head>
<title>首頁舊標題</title>
<meta name="description" content="首頁描述" />
<meta property="og:type" content="website" />
<meta property="og:title" content="首頁 OG" />
<meta property="og:image" content="/images/bert-profile.jpg" />
<meta name="twitter:title" content="首頁 Twitter" />
<meta name="robots" content="index,follow" />
<link rel="canonical" href="https://example.com/" />
<script type="application/ld+json">{"@type":"LocalBusiness"}</script>
</head><body><div id="root"></div><script type="module" src="/assets/app.js"></script></body></html>`;

describe("server blog crawler HTML", () => {
  it("adds accurate indexable article metadata and readable fallback content", () => {
    const html = renderBlogPostHtml(template, {
      slug: "history-2026", titleTw: "文化保存與設計", excerptTw: "台南的歷史故事",
      contentTw: "# 文化保存\n\n這是文章正文。", featuredImageUrl: null,
      publishedAt: new Date("2026-06-02T00:00:00Z"),
    });
    expect(html).toContain("<title>文化保存與設計 | 王純瑋 - 台南網頁設計</title>");
    expect(html).toContain('href="https://bertfolio-vncqhm2r.manus.space/blog/history-2026"');
    expect(html).toContain('property="og:type" content="article"');
    expect(html).toContain("這是文章正文。");
    expect(html).toContain('"@type":"BlogPosting"');
    expect(html).not.toContain('"@type":"LocalBusiness"');
    expect(html).not.toContain("首頁舊標題");
  });

  it("escapes attacker-controlled article text and JSON-LD", () => {
    const html = renderBlogPostHtml(template, {
      slug: "test", titleTw: '<script>alert("x")</script>',
      excerptTw: "A & B", contentTw: "</article><script>alert(1)</script>",
      featuredImageUrl: null, publishedAt: null,
    });
    expect(html).not.toContain('<script>alert("x")</script>');
    expect(html).not.toContain("</article><script>alert(1)</script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("A &amp; B");
  });

  it("renders crawlable listing links without JavaScript", () => {
    const html = renderBlogListHtml(template, [{
      slug: "post-one", titleTw: "第一篇文章", excerptTw: "文章摘要",
    }]);
    expect(html).toContain('<a href="/blog/post-one">第一篇文章</a>');
    expect(html).toContain('"@type":"CollectionPage"');
    expect(html).toContain("<title>部落格 | 王純瑋 - 台南網頁設計與文化保存</title>");
  });

  it("marks missing and unavailable posts as noindex", () => {
    for (const status of [404, 503] as const) {
      const html = renderBlogUnavailableHtml(template, status);
      expect(html).toContain('name="robots" content="noindex, follow"');
      expect(html).toContain("返回部落格");
    }
  });
});
