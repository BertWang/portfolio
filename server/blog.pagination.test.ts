import { beforeEach, describe, expect, it, vi } from "vitest";
import { MySqlDialect } from "drizzle-orm/mysql-core";
import { appRouter } from "./routers";
import { getDb } from "./db";
import type { TrpcContext } from "./_core/context";

vi.mock("./db", () => ({ getDb: vi.fn() }));

const dialect = new MySqlDialect();
const caller = () => appRouter.createCaller({ user: null } as TrpcContext);

function mockSelectResult(items: Record<string, unknown>[], total: number) {
  const filters: unknown[] = [];
  const offsets: number[] = [];
  const limits: number[] = [];
  const select = vi.fn((projection?: Record<string, unknown>) => ({
    from: () => ({
      where: (condition: unknown) => {
        filters.push(condition);
        if (projection?.total) return Promise.resolve([{ total }]);
        return {
          orderBy: () => ({
            limit: (limit: number) => {
              limits.push(limit);
              return {
                offset: (offset: number) => {
                  offsets.push(offset);
                  return Promise.resolve(items);
                },
              };
            },
          }),
        };
      },
    }),
  }));
  vi.mocked(getDb).mockResolvedValue({ select } as unknown as Awaited<ReturnType<typeof getDb>>);
  return { filters, offsets, limits };
}

describe("blog query filters and totals", () => {
  beforeEach(() => vi.clearAllMocks());

  it("counts all published filtered case studies, not only the second page", async () => {
    const data = Array.from({ length: 12 }, (_, index) => ({ id: index + 13, slug: `case-${index + 13}` }));
    const db = mockSelectResult(data, 27);
    const result = await caller().caseStudies.list({ page: 2, limit: 12, category: "網站設計" });
    expect(result.studies).toHaveLength(12);
    expect(result.total).toBe(27);
    expect(db.offsets).toEqual([12]);
    expect(db.limits).toEqual([12]);
    expect(db.filters).toHaveLength(2);
    const a = dialect.sqlToQuery(db.filters[0] as Parameters<typeof dialect.sqlToQuery>[0]);
    const b = dialect.sqlToQuery(db.filters[1] as Parameters<typeof dialect.sqlToQuery>[0]);
    expect(a.params).toEqual(b.params);
    expect(a.sql).toContain("is_published");
    expect(a.params).toContain("網站設計");
  });

  it("queries the server for Japanese terms beyond the former 100-post client cap", async () => {
    const db = mockSelectResult([{ slug: "older-post", titleTw: "中文", titleJp: "旅行記憶" }], 132);
    const result = await caller().blog.posts({ page: 1, limit: 8, language: "jp", search: "旅行" });
    expect(result.total).toBe(132);
    expect(result.posts).toHaveLength(1);
    expect(db.limits).toEqual([8]);
    const query = dialect.sqlToQuery(db.filters[0] as Parameters<typeof dialect.sqlToQuery>[0]);
    expect(query.sql).toContain("title_jp");
    expect(query.sql).toContain("title_tw");
    expect(query.params).toContain("%旅行%");
  });

  it("rejects search terms larger than the validated maximum", async () => {
    const db = mockSelectResult([], 0);
    await expect(caller().blog.posts({ search: "A".repeat(81) })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(db.filters).toHaveLength(0);
  });
});
