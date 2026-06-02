import { mysqlTable, varchar, text, longtext, timestamp, int, boolean, json, date } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

/**
 * Blog Posts Table
 * Stores blog articles with multi-language support
 */
export const blogPosts = mysqlTable('blog_posts', {
  id: int('id').primaryKey().autoincrement(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  
  // Titles in different languages
  titleTw: varchar('title_tw', { length: 255 }).notNull(),
  titleJp: varchar('title_jp', { length: 255 }),
  titleMy: varchar('title_my', { length: 255 }),
  
  // Excerpts in different languages
  excerptTw: text('excerpt_tw'),
  excerptJp: text('excerpt_jp'),
  excerptMy: text('excerpt_my'),
  
  // Full content in Markdown format
  contentTw: longtext('content_tw').notNull(),
  contentJp: longtext('content_jp'),
  contentMy: longtext('content_my'),
  
  // Metadata
  category: varchar('category', { length: 50 }), // e.g., "台南設計", "文化保存", "SEO優化"
  tags: json('tags').$type<string[]>(), // JSON array of tags
  featuredImageUrl: varchar('featured_image_url', { length: 500 }),
  author: varchar('author', { length: 100 }).default('Bert Wang'),
  
  // SEO
  seoKeywordsTw: varchar('seo_keywords_tw', { length: 255 }),
  seoKeywordsJp: varchar('seo_keywords_jp', { length: 255 }),
  seoKeywordsMy: varchar('seo_keywords_my', { length: 255 }),
  
  // Publishing
  isPublished: boolean('is_published').default(true),
  publishedAt: timestamp('published_at').default(sql`CURRENT_TIMESTAMP`),
  
  // Engagement
  viewCount: int('view_count').default(0),
  
  // Timestamps
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

/**
 * Case Studies Table
 * Stores project case studies with multi-language support
 */
export const caseStudies = mysqlTable('case_studies', {
  id: int('id').primaryKey().autoincrement(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  
  // Titles in different languages
  titleTw: varchar('title_tw', { length: 255 }).notNull(),
  titleJp: varchar('title_jp', { length: 255 }),
  titleMy: varchar('title_my', { length: 255 }),
  
  // Descriptions
  descriptionTw: text('description_tw'),
  descriptionJp: text('description_jp'),
  descriptionMy: text('description_my'),
  
  // Challenge section
  challengeTw: longtext('challenge_tw'),
  challengeJp: longtext('challenge_jp'),
  challengeMy: longtext('challenge_my'),
  
  // Solution section
  solutionTw: longtext('solution_tw'),
  solutionJp: longtext('solution_jp'),
  solutionMy: longtext('solution_my'),
  
  // Results section
  resultsTw: longtext('results_tw'),
  resultsJp: longtext('results_jp'),
  resultsMy: longtext('results_my'),
  
  // Project metadata
  clientName: varchar('client_name', { length: 100 }),
  projectCategory: varchar('project_category', { length: 50 }), // e.g., "網頁設計", "PHP開發"
  technologies: json('technologies').$type<string[]>(), // JSON array of tech stack
  projectUrl: varchar('project_url', { length: 500 }),
  completionDate: date('completion_date'),
  
  // Images
  featuredImageUrl: varchar('featured_image_url', { length: 500 }),
  projectImages: json('project_images').$type<string[]>(), // JSON array of image URLs
  
  // Publishing
  isPublished: boolean('is_published').default(true),
  
  // Timestamps
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

/**
 * Blog Post Comments Table (optional)
 * Stores comments on blog posts
 */
export const blogComments = mysqlTable('blog_comments', {
  id: int('id').primaryKey().autoincrement(),
  postId: int('post_id').notNull(),
  authorName: varchar('author_name', { length: 100 }).notNull(),
  authorEmail: varchar('author_email', { length: 100 }).notNull(),
  content: text('content').notNull(),
  isApproved: boolean('is_approved').default(false),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

// Export types for use in application
export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type CaseStudy = typeof caseStudies.$inferSelect;
export type NewCaseStudy = typeof caseStudies.$inferInsert;
export type BlogComment = typeof blogComments.$inferSelect;
export type NewBlogComment = typeof blogComments.$inferInsert;
