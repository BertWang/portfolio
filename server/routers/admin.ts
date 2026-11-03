import { adminProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

// These legacy import endpoints never imported anything. Keep their route
// names temporarily for compatibility but always return an explicit error.
// No public user may invoke administrative data maintenance.
const importUnavailable = (): never => {
  throw new TRPCError({
    code: "NOT_IMPLEMENTED",
    message: "文章匯入與狀態查詢尚未啟用；請改用經審核的離線匯入流程。",
  });
};

export const adminRouter = router({
  importBlogArticles: adminProcedure.mutation(importUnavailable),
  getImportStatus: adminProcedure.query(importUnavailable),
});
