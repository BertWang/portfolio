import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Tag, Share2, Copy, Check } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { generateBlogPostMeta, updateMetaTags } from '@/lib/seoMeta';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { Streamdown } from 'streamdown';

/**
 * Memoized article content component for performance optimization
 */
const ArticleContent = ({ content }: { content: string }) => {
  const memoizedContent = useMemo(() => (
    <div className="prose prose-lg max-w-none mb-12">
      <Streamdown>{content}</Streamdown>
    </div>
  ), [content]);
  
  return memoizedContent;
};

export default function BlogPost() {
  const { user } = useAuth();
  const [match, params] = useRoute('/blog/:slug');
  const [copied, setCopied] = useState(false);

  const slug = params?.slug as string;

  // 從 tRPC 獲取文章詳情（使用 5 分鐘緩存）
  const { data: post, isLoading: postLoading } = trpc.blog.postBySlug.useQuery(
    { slug },
    { 
      enabled: !!slug,
      staleTime: 5 * 60 * 1000, // 5 分鐘內不重新查詢
      gcTime: 10 * 60 * 1000,   // 10 分鐘後清除緩存
    }
  );

  // 從 tRPC 獲取相關文章（使用 10 分鐘緩存）
  const { data: relatedPosts, isLoading: relatedLoading } = trpc.blog.relatedPosts.useQuery(
    { category: post?.category || '', limit: 3 },
    { 
      enabled: !!post?.category,
      staleTime: 10 * 60 * 1000, // 10 分鐘內不重新查詢
      gcTime: 20 * 60 * 1000,    // 20 分鐘後清除緩存
    }
  );

  // Update SEO meta tags
  useEffect(() => {
    if (post) {
      const meta = generateBlogPostMeta(post);
      updateMetaTags(meta);
    }
  }, [post]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/blog/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('連結已複製到剪貼簿');
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const url = `${window.location.origin}/blog/${slug}`;
    const title = post?.titleTw || '查看這篇文章';
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const isLoading = postLoading;

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

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">文章未找到</h1>
            <p className="text-slate-600 mb-6">抱歉，我們找不到您要查看的文章。</p>
            <Link href="/blog">
              <a>
                <Button>返回部落格</Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container py-4">
          <Link href="/blog">
            <a className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
              <ArrowLeft className="w-4 h-4" />
              返回部落格
            </a>
          </Link>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
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

          {/* Article Header */}
          <div className="mb-8">
            {/* Category & Date */}
            <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                {post.category}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.publishedAt
                  ? format(new Date(post.publishedAt), 'MMM d, yyyy', { locale: zhTW })
                  : '未發佈'}
              </div>
              <div className="flex items-center gap-1">
                👁 {post.viewCount || 0} 次瀏覽
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mb-4">{post.titleTw}</h1>

            {/* Excerpt */}
            <p className="text-xl text-slate-600 mb-6">{post.excerptTw}</p>

            {/* Author */}
            <div className="flex items-center gap-4 pb-6 border-b">
              <div>
                <p className="font-semibold text-slate-900">{post.author || 'Bert Wang'}</p>
                <p className="text-sm text-slate-600">台南網頁設計師 | 品牌策略顧問</p>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mb-8 p-4 bg-slate-50 rounded-lg flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-slate-700">分享文章：</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="gap-2"
            >
              <Share2 className="w-4 h-4" />
              LinkedIn
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  已複製
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  複製連結
                </>
              )}
            </Button>
          </div>

          {/* Article Content */}
          <ArticleContent content={post.contentTw} />

          {/* SEO Keywords */}
          {post.seoKeywordsTw && (
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-slate-700 mb-2">關鍵詞：</p>
              <div className="flex flex-wrap gap-2">
                {post.seoKeywordsTw.split(',').map((keyword: string) => (
                  <span
                    key={keyword.trim()}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-6">相關文章</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost: any) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <a className="group">
                      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Featured Image */}
                        <div className="h-40 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                          {relatedPost.featuredImageUrl ? (
                            <img
                              src={relatedPost.featuredImageUrl}
                              alt={relatedPost.titleTw}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="text-4xl opacity-20">📝</div>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          {/* Category */}
                          <div className="flex items-center gap-2 mb-2">
                            <Tag className="w-3 h-3 text-slate-500" />
                            <span className="text-xs text-slate-600">{relatedPost.category}</span>
                          </div>

                          {/* Title */}
                          <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {relatedPost.titleTw}
                          </h3>

                          {/* Excerpt */}
                          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                            {relatedPost.excerptTw}
                          </p>

                          {/* Date */}
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Calendar className="w-3 h-3" />
                            {relatedPost.publishedAt
                              ? format(new Date(relatedPost.publishedAt), 'MMM d', { locale: zhTW })
                              : '未發佈'}
                          </div>
                        </div>
                      </Card>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">想要開始您的項目？</h3>
            <p className="text-slate-600 mb-6">
              如果您對本文內容感興趣，歡迎與我聯繫討論您的網頁設計或品牌策略需求。
            </p>
            <Button size="lg">立即咨詢</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
