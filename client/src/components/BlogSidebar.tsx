import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface BlogSidebarProps {
  currentCategory?: string;
  currentSlug?: string;
  language?: 'tw' | 'jp' | 'my';
  onCategoryChange?: (category: string) => void;
}

const CATEGORY_LABELS = {
  tw: {
    '台南設計': '台南設計',
    '文化保存': '文化保存',
    'SEO優化': 'SEO 優化',
    'PHP開發': 'PHP 開發',
    '案例研究': '案例研究',
  },
  jp: {
    '台南設計': '台南デザイン',
    '文化保存': '文化保存',
    'SEO優化': 'SEO最適化',
    'PHP開發': 'PHP開発',
    '案例研究': 'ケーススタディ',
  },
  my: {
    '台南設計': 'Desain Tainan',
    '文化保存': 'Pelestarian Budaya',
    'SEO優化': 'Optimasi SEO',
    'PHP開發': 'Pengembangan PHP',
    '案例研究': 'Studi Kasus',
  },
};

const SIDEBAR_LABELS = {
  tw: {
    categories: '分類',
    popularPosts: '熱門文章',
    relatedPosts: '相關文章',
    viewMore: '查看更多',
  },
  jp: {
    categories: 'カテゴリー',
    popularPosts: '人気記事',
    relatedPosts: '関連記事',
    viewMore: 'もっと見る',
  },
  my: {
    categories: 'Kategori',
    popularPosts: 'Artikel Populer',
    relatedPosts: 'Artikel Terkait',
    viewMore: 'Lihat Lebih Banyak',
  },
};

export function BlogSidebar({
  currentCategory,
  currentSlug,
  language = 'tw',
  onCategoryChange,
}: BlogSidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(currentCategory || null);
  const labels = SIDEBAR_LABELS[language];
  const categoryLabels = CATEGORY_LABELS[language];

  // 獲取所有分類
  const { data: allPosts } = trpc.blog.posts.useQuery({
    page: 1,
    limit: 100,
    language,
  });

  // 獲取熱門文章
  const { data: popularPosts } = trpc.blog.posts.useQuery({
    page: 1,
    limit: 5,
    sortBy: 'popular',
    language,
  });

  // 獲取相關文章
  const { data: relatedPosts } = trpc.blog.relatedPosts.useQuery(
    { slug: currentSlug || '', language } as any,
    { enabled: !!currentSlug }
  );

  // 提取唯一的分類
  const categories = useMemo(() => {
    if (!allPosts) return [];
    const posts = Array.isArray(allPosts) ? allPosts : (allPosts as any)?.posts || [];
    const uniqueCategories = Array.from(
      new Set(posts.map((post: any) => post.categoryTw))
    );
    return uniqueCategories;
  }, [allPosts]);

  const handleCategoryClick = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
    onCategoryChange?.(category);
  };

  return (
    <aside className="space-y-8">
      {/* 分類篩選 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{labels.categories}</h3>
        <div className="space-y-2">
          {(categories as string[]).map((category: string) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                currentCategory === category
                  ? 'bg-[#8B7355] text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="font-medium">
                {categoryLabels[category as keyof typeof categoryLabels] || category}
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  expandedCategory === category ? 'rotate-180' : ''
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* 熱門文章 */}
      {popularPosts && (Array.isArray(popularPosts) ? popularPosts.length > 0 : (popularPosts as any)?.posts?.length > 0) && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{labels.popularPosts}</h3>
          <div className="space-y-3">
            {(Array.isArray(popularPosts) ? popularPosts : (popularPosts as any)?.posts || []).slice(0, 5).map((post: any) => (
              <Link
                key={post.id}
                href={`/blog/${post.slugTw}`}
                className="block group"
              >
                <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#8B7355] line-clamp-2">
                    {language === 'tw'
                      ? post.titleTw
                      : language === 'jp'
                      ? post.titleJp
                      : post.titleMy}
                  </h4>
                  <p className="text-xs text-gray-500 mt-2">
                    👁️ {post.viewCount || 0} views
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 相關文章 */}
      {relatedPosts && (Array.isArray(relatedPosts) ? relatedPosts.length > 0 : (relatedPosts as any)?.posts?.length > 0) && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{labels.relatedPosts}</h3>
          <div className="space-y-3">
            {(Array.isArray(relatedPosts) ? relatedPosts : (relatedPosts as any)?.posts || []).slice(0, 3).map((post: any) => (
              <Link
                key={post.id}
                href={`/blog/${post.slugTw}`}
                className="block group"
              >
                <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors">
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#8B7355] line-clamp-2">
                    {language === 'tw'
                      ? post.titleTw
                      : language === 'jp'
                      ? post.titleJp
                      : post.titleMy}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 訂閱框 */}
      <div className="bg-gradient-to-br from-[#8B7355] to-[#6B5344] rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">📧 訂閱更新</h3>
        <p className="text-sm text-white/90 mb-4">
          {language === 'tw'
            ? '訂閱我的部落格，獲取最新的設計文章和案例研究'
            : language === 'jp'
            ? '私のブログを購読して、最新のデザイン記事とケーススタディを取得してください'
            : 'Berlangganan blog saya untuk mendapatkan artikel desain dan studi kasus terbaru'}
        </p>
        <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder={language === 'tw' ? '您的郵箱' : language === 'jp' ? 'メールアドレス' : 'Email Anda'}
            className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="w-full px-3 py-2 rounded bg-white text-[#8B7355] font-medium hover:bg-white/90 transition-colors"
          >
            {language === 'tw' ? '訂閱' : language === 'jp' ? '購読' : 'Berlangganan'}
          </button>
        </form>
      </div>
    </aside>
  );
}
