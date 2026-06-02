/**
 * Blog Router
 * Handles blog posts and case studies API endpoints
 */

import { publicProcedure } from '../_core/trpc';
import { z } from 'zod';
import { getDb } from '../db';
import { blogPosts, caseStudies } from '../../drizzle/schema';
import { eq, and, desc, asc } from 'drizzle-orm';

/**
 * Get blog posts with pagination and filtering
 */
export const getBlogPostsRouter = publicProcedure
  .input(
    z.object({
      page: z.number().int().positive().default(1),
      limit: z.number().int().positive().max(100).default(12),
      category: z.string().optional(),
      sortBy: z.enum(['newest', 'oldest', 'popular']).default('newest'),
      language: z.enum(['tw', 'jp', 'my']).default('tw'),
    })
  )
  .query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    const { page, limit, category, sortBy, language } = input;
    const offset = (page - 1) * limit;

    // Build where conditions
    let whereConditions = [eq(blogPosts.isPublished, true)];
    if (category) {
      whereConditions.push(eq(blogPosts.category, category));
    }

    // Build query with sorting
    let query = db.select().from(blogPosts).where(and(...whereConditions)) as any;

    if (sortBy === 'newest') {
      query = query.orderBy(desc(blogPosts.publishedAt));
    } else if (sortBy === 'oldest') {
      query = query.orderBy(asc(blogPosts.publishedAt));
    } else if (sortBy === 'popular') {
      query = query.orderBy(desc(blogPosts.viewCount));
    }

    // Execute query with pagination
    const posts = await query.limit(limit).offset(offset);

    return {
      posts,
      page,
      limit,
      total: posts.length,
    };
  });

/**
 * Get a single blog post by slug
 */
export const getBlogPostBySlugRouter = publicProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    const posts = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, input.slug), eq(blogPosts.isPublished, true)))
      .limit(1);

    if (posts.length === 0) {
      throw new Error('Blog post not found');
    }

    // Increment view count
    await db
      .update(blogPosts)
      .set({ viewCount: (posts[0].viewCount || 0) + 1 })
      .where(eq(blogPosts.id, posts[0].id));

    return posts[0];
  });

/**
 * Get case studies with pagination and filtering
 */
export const getCaseStudiesRouter = publicProcedure
  .input(
    z.object({
      page: z.number().int().positive().default(1),
      limit: z.number().int().positive().max(100).default(12),
      category: z.string().optional(),
      sortBy: z.enum(['newest', 'oldest']).default('newest'),
    })
  )
  .query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    const { page, limit, category, sortBy } = input;
    const offset = (page - 1) * limit;

    // Build where conditions
    let whereConditions = [eq(caseStudies.isPublished, true)];
    if (category) {
      whereConditions.push(eq(caseStudies.projectCategory, category));
    }

    // Build query with sorting
    let query = db.select().from(caseStudies).where(and(...whereConditions)) as any;

    if (sortBy === 'newest') {
      query = query.orderBy(desc(caseStudies.createdAt));
    } else if (sortBy === 'oldest') {
      query = query.orderBy(asc(caseStudies.createdAt));
    }

    // Execute query with pagination
    const studies = await query.limit(limit).offset(offset);

    return {
      studies,
      page,
      limit,
      total: studies.length,
    };
  });

/**
 * Get a single case study by slug
 */
export const getCaseStudyBySlugRouter = publicProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    const studies = await db
      .select()
      .from(caseStudies)
      .where(and(eq(caseStudies.slug, input.slug), eq(caseStudies.isPublished, true)))
      .limit(1);

    if (studies.length === 0) {
      throw new Error('Case study not found');
    }

    return studies[0];
  });

/**
 * Get related blog posts
 */
export const getRelatedBlogPostsRouter = publicProcedure
  .input(z.object({ category: z.string(), limit: z.number().int().positive().max(10).default(3) }))
  .query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    const posts = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.isPublished, true), eq(blogPosts.category, input.category)))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(input.limit);

    return posts;
  });

/**
 * Get related case studies
 */
export const getRelatedCaseStudiesRouter = publicProcedure
  .input(z.object({ category: z.string(), limit: z.number().int().positive().max(10).default(3) }))
  .query(async ({ input }) => {
    const db = await getDb();
    if (!db) throw new Error('Database not available');

    const studies = await db
      .select()
      .from(caseStudies)
      .where(and(eq(caseStudies.isPublished, true), eq(caseStudies.projectCategory, input.category)))
      .orderBy(desc(caseStudies.createdAt))
      .limit(input.limit);

    return studies;
  });
