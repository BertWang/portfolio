import { useState, useEffect } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { Link, useRoute } from 'wouter';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { generateBlogPostMeta, updateMetaTags } from '@/lib/seoMeta';

// 示例文章數據
const SAMPLE_ARTICLES = [
  {
    id: 1,
    slug: "tainan-design-soul",
    title: "台南設計的靈魂：為什麼在地文化是最好的設計靈感",
    category: "台南設計",
    excerpt: "在台南進行了 18 年的設計工作後，我深刻理解到：最好的設計靈感不來自國際趨勢，而來自腳下這片土地的文化。",
    content: `# 台南設計的靈魂：為什麼在地文化是最好的設計靈感

在台南進行了 18 年的設計工作後，我深刻理解到：最好的設計靈感不來自國際趨勢，而來自腳下這片土地的文化。台南擁有豐富的古蹟、傳統工藝和集體記憶，這些都是創造具有靈魂的品牌設計的寶庫。

## 為什麼台南的文化如此獨特

台南是台灣最古老的城市，擁有超過 400 年的歷史。這裡不僅有著名的古蹟建築（如赤嵌樓、祀典武廟、大天后宮），還有深厚的工藝傳統和獨特的飲食文化。

但更重要的是，台南的文化不是博物館裡的陳列品，而是活生生的、融入日常生活的。台南人對自己的文化有著深刻的認同感和自豪感。

## 案例一：天喜の記憶——古蹟保存與品牌設計的結合

天喜の記憶是一個致力於保存台南古蹟故事的項目。在為這個項目進行品牌設計時，我面臨的挑戰是：如何用視覺語言傳達對文化的尊重和保存的使命？

我沒有選擇現代極簡主義或科技感十足的設計風格。相反，我從台南的古蹟建築、傳統工藝和集體記憶中汲取靈感。設計中融入了古蹟的紅磚紋理、傳統工藝的手工感、以及台南人對家鄉的情感認同。

## 設計原理：從文化到視覺

經過多年的實踐，我總結了幾個關鍵的設計原理：

**首先是「地域性」**。每個地域都有其獨特的色彩、紋理和形態。台南的古蹟建築提供了豐富的色彩靈感。

**其次是「故事性」**。台南的每一個地點、每一個傳統工藝都承載著深刻的故事。優秀的設計應該能夠傳達這些故事。

**第三是「人文性」**。設計最終是為了人。好的設計應該能夠與人文情感產生共鳴。

## 結論

台南的設計靈魂不在於追隨國際趨勢，而在於深入挖掘本地文化，將其轉化為現代、有力的視覺語言。`,
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
    content: `# 從古蹟到現代：台南文化地景的視覺轉譯

台南的古蹟不是靜止的歷史遺跡，而是活動的文化資產。如何用現代設計語言來詮釋這些古蹟，讓年輕一代能夠與文化產生連結，是我多年來思考的核心問題。

## 古蹟的視覺語言

台南擁有眾多的古蹟，包括赤嵌樓、祀典武廟、大天后宮等。這些建築不僅是歷史的見證，更是台南文化的象徵。

但問題是：如何讓這些古蹟對年輕人產生吸引力？傳統的歷史介紹方式往往顯得沉悶和距離感很遠。

## 設計方案：數位化與視覺化

我的方案是將古蹟進行數位化和視覺化。通過高質量的攝影、3D 建模和互動式設計，我們可以以全新的方式呈現這些古蹟。

例如，在《南蚵一夢》紀錄片項目中，我不僅拍攝了古蹟的外觀，還深入挖掘了古蹟背後的故事——那些在這些地方發生過的人物故事、社會變遷、文化傳承。

## 結論

古蹟的保存不僅是物理上的維護，更重要的是通過現代設計和視覺語言，讓這些文化資產重新獲得生命力，與當代社會產生對話。`,
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
    content: `# 台南中小企業的品牌困境：如何用設計突圍

台南有許多優秀的中小企業，但他們往往面臨一個共同的困境：如何在激烈的市場競爭中建立獨特的品牌形象？

## 中小企業的品牌困境

許多台南的中小企業面臨以下挑戰：

1. **資金限制**：無法像大企業那樣進行大規模的廣告投放
2. **市場飽和**：在電商平台上，相似的產品眾多
3. **品牌認知度低**：消費者不知道他們的存在
4. **設計投資不足**：許多企業認為設計是奢侈品，而非必需品

## 設計突圍的方案

答案不在於花費巨資進行廣告投放，而在於通過精心的設計來傳達品牌的核心價值。

**第一步是明確品牌定位**。你的企業與競爭對手的區別是什麼？你的獨特價值主張是什麼？

**第二步是建立視覺識別系統**。一個強大的視覺識別系統可以幫助消費者快速識別你的品牌。

**第三步是建立內容策略**。通過部落格、社交媒體等渠道，分享你的品牌故事和價值觀。

## 成功案例

我與多個台南中小企業合作，通過設計幫助他們建立了獨特的品牌形象。結果是顯著的——品牌認知度提高、客戶忠誠度增加、銷售額上升。

## 結論

設計不是奢侈品，而是中小企業在市場競爭中的必需品。通過精心的設計，台南的中小企業可以建立獨特的品牌形象，實現突圍。`,
    author: "王純瑋",
    publishedAt: "2024-06-03T00:00:00Z",
    featured: false,
    readingTime: 6,
    viewCount: 156,
    keywords: "品牌設計,中小企業,台南企業,品牌策略,視覺識別",
    color: "from-blue-400 to-cyan-500",
  },
];

export default function BlogPost() {
  const { user } = useAuth();
  const [match, params] = useRoute('/blog/:slug');
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  const slug = params?.slug as string;

  // 模擬從 API 獲取數據
  useEffect(() => {
    if (!slug) return;

    setIsLoading(true);
    setTimeout(() => {
      const foundPost = SAMPLE_ARTICLES.find(a => a.slug === slug);
      if (foundPost) {
        setPost(foundPost);
        // 獲取相關文章
        const related = SAMPLE_ARTICLES.filter(
          a => a.category === foundPost.category && a.id !== foundPost.id
        ).slice(0, 3);
        setRelatedPosts(related);
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
