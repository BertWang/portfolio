import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';

interface BlogSearchProps {
  language?: 'tw' | 'jp' | 'my';
}

interface SearchPost {
  id: number;
  slug: string;
  titleTw: string;
  titleJp?: string | null;
  titleMy?: string | null;
  excerptTw?: string | null;
  excerptJp?: string | null;
  excerptMy?: string | null;
}

const SEARCH_LABELS = {
  tw: { placeholder: '搜尋文章...', noResults: '未找到相關文章', loading: '搜尋中...', error: '暫時無法搜尋，請稍後重試' },
  jp: { placeholder: '記事を検索...', noResults: '関連する記事が見つかりません', loading: '検索中...', error: '検索できません。しばらくしてからお試しください' },
  my: { placeholder: 'Cari artikel...', noResults: 'Tidak ada artikel yang relevan', loading: 'Mencari...', error: 'Pencarian tidak tersedia, coba lagi nanti' },
};

export function BlogSearch({ language = 'tw' }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const labels = SEARCH_LABELS[language];

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchQuery.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  // Search the published database, not just the first 100 posts.
  const { data, isFetching, isError } = trpc.blog.posts.useQuery({
    page: 1, limit: 8, language, search: debouncedSearch,
  }, {
    enabled: debouncedSearch.length > 0,
    staleTime: 30_000,
    retry: 1,
  });
  const results = (data?.posts ?? []) as SearchPost[];
  const showResults = isOpen && searchQuery.trim().length > 0;
  const pending = searchQuery.trim() !== debouncedSearch || isFetching;

  const localized = (post: SearchPost) => ({
    title: (language === 'jp' ? post.titleJp : language === 'my' ? post.titleMy : post.titleTw) || post.titleTw,
    excerpt: (language === 'jp' ? post.excerptJp : language === 'my' ? post.excerptMy : post.excerptTw) || post.excerptTw,
  });

  return (
    <div className="relative">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
        <Search size={18} className="text-gray-600" />
        <input
          type="search"
          aria-label={labels.placeholder}
          aria-expanded={showResults}
          placeholder={labels.placeholder}
          value={searchQuery}
          maxLength={80}
          onChange={e => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={e => { if (e.key === 'Escape') setIsOpen(false); }}
          className="flex-1 min-w-0 bg-transparent outline-none text-gray-900 placeholder-gray-500"
        />
        {searchQuery && (
          <button type="button" aria-label="Clear search" onClick={() => { setSearchQuery(''); setIsOpen(false); }}
            className="p-1 hover:bg-gray-300 rounded transition-colors">
            <X size={16} className="text-gray-600" />
          </button>
        )}
      </div>
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          {pending ? (
            <p className="p-4 text-center text-gray-500" role="status">{labels.loading}</p>
          ) : isError ? (
            <p className="p-4 text-center text-gray-500" role="alert">{labels.error}</p>
          ) : results.length ? (
            <div className="divide-y divide-gray-200">
              {results.map(post => {
                const copy = localized(post);
                return (
                  <Link key={post.id} href={`/blog/${post.slug}`}
                    onClick={() => { setSearchQuery(''); setIsOpen(false); }}
                    className="block p-4 hover:bg-gray-50 transition-colors group">
                    <h4 className="font-medium text-gray-900 group-hover:text-[#8B7355] line-clamp-2">{copy.title}</h4>
                    {copy.excerpt && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{copy.excerpt}</p>}
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="p-4 text-center text-gray-500" role="status">{labels.noResults}</p>
          )}
        </div>
      )}
      {showResults && <button type="button" aria-label="Close search results" className="fixed inset-0 z-40 cursor-default"
        onClick={() => setIsOpen(false)} />}
    </div>
  );
}
