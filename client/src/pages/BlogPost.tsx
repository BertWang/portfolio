import { useRoute } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { Streamdown } from 'streamdown';
import { useEffect } from 'react';
import { generateBlogPostMeta, updateMetaTags } from '@/lib/seoMeta';

export default function BlogPost() {
  const { user } = useAuth();
  const [match, params] = useRoute('/blog/:slug');

  const slug = params?.slug as string;

  const { data: post, isLoading, error } = trpc.blog.postBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  const { data: relatedData } = trpc.blog.relatedPosts.useQuery(
    { category: post?.category || '', limit: 3 },
    { enabled: !!post?.category }
  );

  // Update SEO meta tags
  useEffect(() => {
    if (post) {
      const meta = generateBlogPostMeta(post);
      updateMetaTags(meta);
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-12">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="h-10 bg-slate-200 rounded animate-pulse" />
            <div className="h-96 bg-slate-200 rounded animate-pulse" />
            <div className="h-64 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
          <Link href="/blog">
            <a>
              <Button>返回部落格</Button>
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container max-w-3xl">
          <Link href="/blog">
            <a className="flex items-center gap-2 text-slate-300 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              返回部落格
            </a>
          </Link>
          <h1 className="text-4xl font-bold mb-4">{post.titleTw}</h1>
          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {post.publishedAt
                ? format(new Date(post.publishedAt), 'PPP', { locale: zhTW })
                : '未發佈'}
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {post.category}
            </div>
            <div className="flex items-center gap-2">
              👁 {post.viewCount || 0} 次瀏覽
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-3xl py-12">
        {/* Featured Image */}
        {post.featuredImageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.featuredImageUrl}
              alt={post.titleTw}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <Streamdown>{post.contentTw || ''}</Streamdown>
        </article>

        {/* Share */}
        <div className="border-t border-b py-6 mb-12">
          <div className="flex items-center gap-4">
            <span className="font-semibold">分享文章：</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const url = window.location.href;
                const text = `${post.titleTw} - ${post.excerptTw}`;
                navigator.share?.({ title: post.titleTw, text, url });
              }}
            >
              <Share2 className="w-4 h-4 mr-2" />
              分享
            </Button>
          </div>
        </div>

        {/* Author Info */}
        <Card className="p-6 mb-12 bg-slate-50">
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-lg">王純瑋</h3>
              <p className="text-slate-600 text-sm">
                18 年台南網頁設計與 PHP 開發經驗，專注於品牌設計、文化保存與社會責任。
              </p>
              <Link href="/">
                <a className="text-blue-600 hover:text-blue-700 text-sm font-semibold mt-2 inline-block">
                  了解更多 →
                </a>
              </Link>
            </div>
          </div>
        </Card>

        {/* Related Posts */}
        {relatedData && relatedData.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">相關文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedData.map((relatedPost: any) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <a className="group">
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                      {relatedPost.featuredImageUrl && (
                        <div className="h-40 bg-slate-200 overflow-hidden">
                          <img
                            src={relatedPost.featuredImageUrl}
                            alt={relatedPost.titleTw}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                          {relatedPost.titleTw}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {relatedPost.excerptTw}
                        </p>
                      </div>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
