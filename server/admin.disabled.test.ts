import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("admin legacy importer disabled", () => {
  it("rejects unauthenticated access to the former public importer", async () => {
    const caller = appRouter.createCaller({ user: null } as TrpcContext);
    await expect(caller.admin.importBlogArticles()).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });

  it("does not claim a successful import, even for administrators", async () => {
    const caller = appRouter.createCaller({
      user: { id: 1, role: "admin" },
    } as TrpcContext);
    await expect(caller.admin.importBlogArticles()).rejects.toMatchObject({
      code: "NOT_IMPLEMENTED",
    });
    await expect(caller.admin.getImportStatus()).rejects.toMatchObject({
      code: "NOT_IMPLEMENTED",
    });
  });
});
