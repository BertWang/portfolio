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

// 示例文章數據
const SAMPLE_ARTICLES = [
  {
    id: 1,
    slug: "tainan-design-soul",
    title: "台南設計的靈魂：為什麼在地文化是最好的設計靈感",
    category: "台南設計",
    excerpt: "在台南進行了 18 年的設計工作後，我深刻理解到：最好的設計靈感不來自國際趨勢，而來自腳下這片土地的文化。",
    content: "在台南進行了 18 年的設計工作後，我深刻理解到：最好的設計靈感不來自國際趨勢，而來自腳下這片土地的文化。台南擁有豐富的古蹟、傳統工藝和集體記憶，這些都是創造具有靈魂的品牌設計的寶庫。",
    author: "王純瑋",
    publishedAt: "2024-06-01T00:00:00Z",
    featured: true,
    readingTime: 8,
    viewCount: 245,
    keywords: "台南設計,品牌設計,文化設計,視覺識別,設計靈感",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 2,
    slug: "ancient-to-modern",
    title: "從古蹟到現代：台南文化地景的視覺轉譯",
    category: "文化保存",
    excerpt: "台南的古蹟不是靜止的歷史遺跡，而是活動的文化資產。如何用現代設計語言來詮釋這些古蹟，讓年輕一代能夠與文化產生連結。",
    content: "台南的古蹟不是靜止的歷史遺跡，而是活動的文化資產。如何用現代設計語言來詮釋這些古蹟，讓年輕一代能夠與文化產生連結，是我多年來思考的核心問題。",
    author: "王純瑋",
    publishedAt: "2024-06-02T00:00:00Z",
    featured: true,
    readingTime: 7,
    viewCount: 189,
    keywords: "古蹟保存,文化遺產,台南古蹟,視覺設計,數位化",
    color: "from-red-400 to-pink-500",
  },
  {
    id: 3,
    slug: "sme-branding-breakthrough",
    title: "台南中小企業的品牌困境：如何用設計突圍",
    category: "品牌設計",
    excerpt: "台南有許多優秀的中小企業，但他們往往面臨一個共同的困境：如何在激烈的市場競爭中建立獨特的品牌形象？",
    content: "台南有許多優秀的中小企業，但他們往往面臨一個共同的困境：如何在激烈的市場競爭中建立獨特的品牌形象？答案不在於花費巨資進行廣告投放，而在於通過精心的設計來傳達品牌的核心價值。",
    author: "王純瑋",
    publishedAt: "2024-06-03T00:00:00Z",
    featured: false,
    readingTime: 6,
    viewCount: 156,
    keywords: "品牌設計,中小企業,台南企業,品牌策略,視覺識別",
    color: "from-blue-400 to-cyan-500",
  },
];

export default function Blog() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [postsData, setPostsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Update SEO meta tags
  useEffect(() => {
    const meta = generateBlogListMeta(category);
    updateMetaTags(meta);
  }, [category]);

  // 模擬從 API 獲取數據
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      let articles = [...SAMPLE_ARTICLES];
      
      // 篩選分類
      if (category) {
        articles = articles.filter(a => a.category === category);
      }
      
      // 排序
      if (sortBy === 'newest') {
        articles = articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      } else if (sortBy === 'oldest') {
        articles = articles.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
      } else if (sortBy === 'popular') {
        articles = articles.sort((a, b) => b.viewCount - a.viewCount);
      }
      
      // 分頁
      const start = (page - 1) * 12;
      const end = start + 12;
      const paginatedArticles = articles.slice(start, end);
      
      setPostsData({
        posts: paginatedArticles,
        total: articles.length,
        page,
        limit: 12,
      });
      setIsLoading(false);
    }, 300);
  }, [page, category, sortBy]);

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
                      <div className={`h-48 bg-gradient-to-br ${post.color} overflow-hidden flex items-center justify-center`}>
                        <div className="text-center">
                          <div className="text-5xl font-bold text-white opacity-80">📝</div>
                          <p className="text-sm text-white opacity-70 mt-2 font-semibold">{post.category}</p>
                        </div>
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
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">
                          {post.excerpt}
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
