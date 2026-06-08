import { useState, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { generateBlogListMeta, updateMetaTags } from '@/lib/seoMeta';
import { BlogSearch } from '@/components/BlogSearch';
import { trpc } from '@/lib/trpc';

export default function Blog() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');

  // 從 tRPC 獲取博客文章
  const { data: postsData, isLoading } = trpc.blog.posts.useQuery({
    page,
    limit: 12,
    category,
    sortBy,
    language: 'tw',
  });

  // Update SEO meta tags
  useEffect(() => {
    const meta = generateBlogListMeta(category);
    updateMetaTags(meta);
  }, [category]);

  const categories = ['台南設計', 'SEO 優化', '文化保存', 'PHP 開發', '品牌設計', '影像創作'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">部落格</h1>
          <p className="text-lg text-slate-300">
            探索台南網頁設計、文化保存、品牌策略的深度文章
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container py-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="max-w-md">
              <BlogSearch language="tw" />
            </div>
            {/* Sort Options */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={sortBy === 'newest' ? 'default' : 'outline'}
                onClick={() => setSortBy('newest')}
                size="sm"
              >
                最新發佈
              </Button>
              <Button
                variant={sortBy === 'oldest' ? 'default' : 'outline'}
                onClick={() => setSortBy('oldest')}
                size="sm"
              >
                最舊發佈
              </Button>
              <Button
                variant={sortBy === 'popular' ? 'default' : 'outline'}
                onClick={() => setSortBy('popular')}
                size="sm"
              >
                最受歡迎
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={category === undefined ? 'default' : 'outline'}
                onClick={() => setCategory(undefined)}
                size="sm"
              >
                全部分類
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? 'default' : 'outline'}
                  onClick={() => setCategory(cat)}
                  size="sm"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="h-96 bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : postsData?.posts && postsData.posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {postsData.posts.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <a className="group">
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Featured Image */}
                      <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden flex items-center justify-center">
                        {post.featuredImageUrl ? (
                          <img
                            src={post.featuredImageUrl}
                            alt={post.titleTw}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="text-center">
                            <div className="text-5xl font-bold text-slate-400 opacity-50">📝</div>
                            <p className="text-sm text-slate-500 opacity-70 mt-2 font-semibold">{post.category}</p>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                        {/* Category */}
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="w-4 h-4 text-slate-500" />
                          <span className="text-sm text-slate-600">{post.category}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.titleTw}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">
                          {post.excerptTw}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-slate-500 border-t pt-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.publishedAt
                              ? format(new Date(post.publishedAt), 'MMM d, yyyy', { locale: zhTW })
                              : '未發佈'}
                          </div>
                          <div className="flex items-center gap-1">
                            👁 {post.viewCount || 0}
                          </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                          閱讀文章 <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {postsData.total > 12 && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  上一頁
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">
                    第 {page} 頁
                  </span>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={postsData.posts.length < 12}
                >
                  下一頁
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">目前沒有文章</p>
            <Link href="/">
              <a>
                <Button>返回首頁</Button>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
