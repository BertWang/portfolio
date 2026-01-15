import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services, portfolio, documentaries, testimonials, personalInfo } from "@/data/portfolio";

/**
 * 王純瑋接案平台 - 完整版
 * 設計理念：當代人文主義 × 台南在地認同 × 靈性溫度
 * 
 * 視覺策略：
 * - 英雄背景：台南地標（林百貨、風神廟、開基武廟）
 * - 個人照片：粘性側邊欄展示
 * - 動畫：視差、hover、計數器、脈衝效果
 * - SEO：區域化關鍵詞（台南、高雄、日本、馬來西亞）
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("taiwan");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 區域化文案與 SEO 策略
  const regionalContent = {
    taiwan: {
      title: "台南網頁設計 × 高雄品牌官網",
      subtitle: "18 年資歷，為台灣在地企業打造溫度品牌",
      keywords: ["台南網頁設計", "高雄網站製作", "台南 PHP 開發", "台南 SEO 優化"],
      cta: "台南、高雄企業接案中",
    },
    japan: {
      title: "日本向け ウェブデザイン",
      subtitle: "台湾と日本の文化を融合したデザイン",
      keywords: ["日本向けウェブサイト", "台湾デザイナー", "文化保存プロジェクト"],
      cta: "日本企業のご相談承ります",
    },
    malaysia: {
      title: "馬來西亞網頁設計服務",
      subtitle: "跨文化品牌故事設計，連接東南亞市場",
      keywords: ["馬來西亞網站設計", "東南亞品牌設計", "中文網站開發"],
      cta: "馬來西亞客戶接案中",
    },
  };

  const currentContent = regionalContent[selectedRegion as keyof typeof regionalContent];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 導航 - 區域選擇 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="text-xl font-bold">王純瑋 × 微波林克</div>
          <div className="flex gap-2">
            <Button
              variant={selectedRegion === "taiwan" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRegion("taiwan")}
            >
              台灣
            </Button>
            <Button
              variant={selectedRegion === "japan" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRegion("japan")}
            >
              日本
            </Button>
            <Button
              variant={selectedRegion === "malaysia" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRegion("malaysia")}
            >
              馬來西亞
            </Button>
          </div>
        </div>
      </nav>

      {/* 英雄區域 - 台南地標背景 + 視差效果 */}
      <section
        className="relative h-screen bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url(/images/hero-background.jpg)",
          backgroundAttachment: "fixed",
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container h-full flex items-center justify-between">
          {/* 左側：文案 */}
          <div className="max-w-2xl text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              {currentContent.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              {currentContent.subtitle}
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700">
                查看服務
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                立即接案
              </Button>
            </div>
            <p className="text-sm text-gray-200 mt-6">
              📞 {personalInfo.phone} | 📧 {personalInfo.email}
            </p>
          </div>

          {/* 右側：個人照片 - 粘性側邊欄 */}
          <div className="hidden lg:block sticky top-20 h-fit">
            <div className="relative w-64 h-80 rounded-lg overflow-hidden shadow-2xl border-4 border-amber-600 animate-float">
              <img
                src="/images/bert-profile.jpg"
                alt="王純瑋 - 網頁設計師"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-bold text-lg">{personalInfo.name}</p>
                <p className="text-sm text-gray-200">{personalInfo.alias}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 服務項目 - 動畫卡片 */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">服務項目</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, idx) => (
              <Card
                key={service.id}
                className="p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                style={{
                  animationDelay: `${idx * 100}ms`,
                }}
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">
                  {service.icon}
                </div>
                <h3 className="font-bold mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 作品集 - 可點擊卡片 */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">代表作品</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {portfolio.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{project.tagline}</p>
                    <p className="text-sm mb-4">{project.description.substring(0, 100)}...</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.highlights.slice(0, 2).map((h, idx) => (
                        <span key={idx} className="text-xs bg-amber-100 text-amber-900 px-2 py-1 rounded">
                          {h}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-amber-600 font-semibold">
                      → 點擊查看完整網站
                    </p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 紀錄片 - YouTube 嵌入 */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">文史保存紀錄片</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {documentaries.map((doc) => (
              <div key={doc.id} className="group">
                <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  <iframe
                    width="100%"
                    height="100%"
                    src={doc.videoUrl}
                    title={doc.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-bold mt-4">{doc.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{doc.year}</p>
                <p className="text-sm text-amber-600 font-semibold mb-2">🏆 {doc.award}</p>
                <p className="text-sm">{doc.description}</p>
                {doc.awardLink && (
                  <a
                    href={doc.awardLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline mt-2 inline-block"
                  >
                    查看獲獎詳情 →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 客戶評價 - 旋轉動畫 */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">客戶評價</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-sm mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 聯絡區域 - 脈衝 CTA */}
      <section className="py-20 bg-amber-600 text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">準備好開始了嗎？</h2>
          <p className="text-xl mb-8 text-amber-100">
            {currentContent.cta}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100 animate-pulse"
            >
              立即聯絡
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              查看更多
            </Button>
          </div>
          <p className="text-sm mt-8">
            📞 {personalInfo.phone} | 📧 {personalInfo.email}
          </p>
        </div>
      </section>

      {/* 頁腳 */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 王純瑋 × 微波林克. All rights reserved.</p>
          <p className="mt-2">
            網頁設計 × PHP 程式 × SEO 優化 × 影片剪輯 × 影片拍攝
          </p>
        </div>
      </footer>

      {/* 動畫樣式 */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
