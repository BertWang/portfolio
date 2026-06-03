import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';

interface BlogSearchProps {
  language?: 'tw' | 'jp' | 'my';
}

const SEARCH_LABELS = {
  tw: {
    placeholder: '搜尋文章...',
    noResults: '未找到相關文章',
    searchBlog: '搜尋部落格',
  },
  jp: {
    placeholder: '記事を検索...',
    noResults: '関連する記事が見つかりません',
    searchBlog: 'ブログを検索',
  },
  my: {
    placeholder: 'Cari artikel...',
    noResults: 'Tidak ada artikel yang relevan',
    searchBlog: 'Cari Blog',
  },
};

export function BlogSearch({ language = 'tw' }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const labels = SEARCH_LABELS[language];

  // 獲取所有文章
  const { data: allPosts } = trpc.blog.posts.useQuery({
    page: 1,
    limit: 100,
    language,
  });

  // 客戶端搜尋過濾
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !allPosts) return [];

    const query = searchQuery.toLowerCase();
    const posts = Array.isArray(allPosts) ? allPosts : (allPosts as any)?.posts || [];

    return posts
      .filter((post: any) => {
        const title =
          language === 'tw'
            ? post.titleTw
            : language === 'jp'
            ? post.titleJp
            : post.titleMy;
        const excerpt =
          language === 'tw'
            ? post.excerptTw
            : language === 'jp'
            ? post.excerptJp
            : post.excerptMy;

        return (
          (title && title.toLowerCase().includes(query)) ||
          (excerpt && excerpt.toLowerCase().includes(query))
        );
      })
      .slice(0, 5);
  }, [searchQuery, allPosts, language]);

  return (
    <div className="relative">
      {/* 搜尋框 */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
        <Search size={18} className="text-gray-600" />
        <input
          type="text"
          placeholder={labels.placeholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="p-1 hover:bg-gray-300 rounded transition-colors"
          >
            <X size={16} className="text-gray-600" />
          </button>
        )}
      </div>

      {/* 搜尋結果下拉框 */}
      {isOpen && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {searchResults.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slugTw}`}
                  onClick={() => {
                    setSearchQuery('');
                    setIsOpen(false);
                  }}
                  className="block p-4 hover:bg-gray-50 transition-colors group"
                >
                  <h4 className="font-medium text-gray-900 group-hover:text-[#8B7355] line-clamp-2">
                    {language === 'tw'
                      ? post.titleTw
                      : language === 'jp'
                      ? post.titleJp
                      : post.titleMy}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {language === 'tw'
                      ? post.excerptTw
                      : language === 'jp'
                      ? post.excerptJp
                      : post.excerptMy}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">{labels.noResults}</div>
          )}
        </div>
      )}

      {/* 背景遮罩 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
