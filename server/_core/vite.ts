import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import { and, desc, eq } from "drizzle-orm";
import { blogPosts } from "../../drizzle/schema";
import { getDb } from "../db";
import { renderBlogListHtml, renderBlogPostHtml, renderBlogUnavailableHtml } from "./blogSeo";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Serve indexable blog metadata and readable content from the database.
  // This does not require an external prerendering service or Manus AI credits.
  // Route this before static SPA fallback so non-JS crawlers get the correct title.
  const templatePath = path.resolve(distPath, "index.html");
  app.get("/blog", async (_req, res) => {
    const template = await fs.promises.readFile(templatePath, "utf-8");
    try {
      const db = await getDb();
      if (!db) throw new Error("Blog database unavailable");
      const posts = await db.select({
        slug: blogPosts.slug,
        titleTw: blogPosts.titleTw,
        excerptTw: blogPosts.excerptTw,
      }).from(blogPosts)
        .where(eq(blogPosts.isPublished, true))
        .orderBy(desc(blogPosts.publishedAt))
        .limit(30);
      res.setHeader("Cache-Control", "public, max-age=300");
      res.type("html").send(renderBlogListHtml(template, posts));
    } catch (error) {
      console.error("[Blog SEO] Failed to render list:", error);
      res.setHeader("Cache-Control", "no-store");
      res.status(503).type("html").send(renderBlogUnavailableHtml(template, 503));
    }
  });
  app.get("/blog/:slug", async (req, res) => {
    const template = await fs.promises.readFile(templatePath, "utf-8");
    try {
      const db = await getDb();
      if (!db) throw new Error("Blog database unavailable");
      const posts = await db.select().from(blogPosts)
        .where(and(eq(blogPosts.slug, req.params.slug), eq(blogPosts.isPublished, true)))
        .limit(1);
      if (posts.length === 0) {
        res.status(404).type("html").send(renderBlogUnavailableHtml(template, 404));
        return;
      }
      res.setHeader("Cache-Control", "public, max-age=300");
      res.type("html").send(renderBlogPostHtml(template, posts[0]));
    } catch (error) {
      console.error("[Blog SEO] Failed to render article:", error);
      res.setHeader("Cache-Control", "no-store");
      res.status(503).type("html").send(renderBlogUnavailableHtml(template, 503));
    }
  });

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
