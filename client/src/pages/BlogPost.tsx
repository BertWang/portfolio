import { useState, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { generateBlogPostMeta, updateMetaTags } from '@/lib/seoMeta';
import { SAMPLE_ARTICLES } from '@/data/articles';

export default function BlogPost() {
  const { user } = useAuth();
  const [match, params] = useRoute('/blog/:slug');
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  const slug = params?.slug as string;

  // 內部連結映射（根據 INTERNAL_LINKING_STRATEGY.md）
  const linkingMap: Record<number, number[]> = {
    1: [2, 4, 12],
    2: [1, 5, 6],
    3: [4, 12, 13],
    5: [2, 6, 7],
    7: [8, 9, 10],
    8: [7, 9, 10],
    9: [7, 8, 11],
    10: [9, 7, 11],
    11: [7, 10, 20],
    12: [1, 4, 13],
    13: [3, 10, 12]
  };

  // 模擬從 API 獲取數據
  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);
    setTimeout(() => {
      const foundPost = SAMPLE_ARTICLES.find(a => a.slug === slug);
      if (foundPost) {
        setPost(foundPost);
        // 獲取相關文章（基於內部連結策略）
        const relatedIds = linkingMap[foundPost.id] || [];
        const related = SAMPLE_ARTICLES.filter(
          a => relatedIds.includes(a.id)
        ).slice(0, 3);
        
        // 如果沒有基於連結策略的相關文章，則使用分類相關
        if (related.length === 0) {
          const categoryRelated = SAMPLE_ARTICLES.filter(
            a => a.category === foundPost.category && a.id !== foundPost.id
          ).slice(0, 3);
          setRelatedPosts(categoryRelated);
        } else {
          setRelatedPosts(related);
        }
      }
      setIsLoading(false);
    }, 300);
  }, [slug]);

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
      {/* Header with Featured Image */}
      <div className={`bg-gradient-to-r ${post.color} text-white py-20`}>
        <div className="container">
          <Link href="/blog">
            <a className="flex items-center gap-2 text-white hover:opacity-80 mb-6 w-fit">
              <ArrowLeft className="w-4 h-4" />
              返回部落格
            </a>
          </Link>
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-white opacity-90">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(post.publishedAt), 'MMMM d, yyyy', { locale: zhTW })}
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {post.category}
            </div>
            <div className="flex items-center gap-2">
              ⏱ {post.readingTime} 分鐘閱讀
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
              {post.content.split('\n').map((line: string, i: number) => {
                if (line.startsWith('# ')) {
                  return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>;
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={i} className="font-bold text-slate-800">{line.slice(2, -2)}</p>;
                }
                if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
                  return <li key={i} className="ml-6 mb-2">{line.slice(3)}</li>;
                }
                if (line.trim() === '') {
                  return <div key={i} className="h-4" />;
                }
                return <p key={i} className="mb-4 text-slate-700">{line}</p>;
              })}
            </div>
          </div>

          {/* Author Info */}
          <Card className="p-6 mb-12 bg-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{post.author}</h3>
                <p className="text-slate-600">台南網頁設計師 | 品牌設計顧問 | 文化保存倡導者</p>
              </div>
            </div>
          </Card>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">相關文章</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <a className="group">
                      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                        <div className={`h-32 bg-gradient-to-br ${relatedPost.color}`} />
                        <div className="p-4">
                          <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-slate-600 line-clamp-2">{relatedPost.excerpt}</p>
                        </div>
                      </Card>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="border-t pt-6 flex items-center gap-4">
            <span className="text-slate-600">分享此文章：</span>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              分享
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
