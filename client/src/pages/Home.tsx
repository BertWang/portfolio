import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services, portfolio, documentaries, testimonials, personalInfo } from "@/data/portfolio";

/**
 * 王純瑋接案平台 - 個性化重設計版本
 * 設計理念：「溫度敘事」× 個人魅力 × 使用者心理
 * 
 * 核心改進：
 * 1. 英雄區域：棕褐色漸層 + 個人照片焦點 + 清晰文案
 * 2. 手機優化：堆疊式布局，無內容被吃掉
 * 3. 個人魅力：身份宣言 → 價值主張 → 行動號召
 * 4. 動畫設計：微妙而有意義，強化溫度感
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("taiwan");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 區域化文案
  const regionalContent = {
    taiwan: {
      identity: "網頁設計師 × 文史保存者 × 靈性創作者",
      valueProposition: "用溫度設計，為品牌注入靈魂",
      actionCTA: "讓您的故事被好好記住",
      keywords: ["台南網頁設計", "高雄品牌官網", "台灣在地企業"],
    },
    japan: {
      identity: "ウェブデザイナー × 文化保存者 × 精神的創作者",
      valueProposition: "温度でデザイン、ブランドに魂を注ぐ",
      actionCTA: "あなたの物語を大切に記憶させる",
      keywords: ["日本向けウェブサイト", "台湾デザイナー"],
    },
    malaysia: {
      identity: "網頁設計師 × 文化保存者 × 靈性創作者",
      valueProposition: "用溫度設計，為品牌注入靈魂",
      actionCTA: "讓您的故事被好好記住",
      keywords: ["馬來西亞網站設計", "東南亞品牌"],
    },
  };

  const currentContent = regionalContent[selectedRegion as keyof typeof regionalContent];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 導航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-3 md:py-4">
          <div className="text-lg md:text-xl font-bold text-amber-700">王純瑋</div>
          <div className="flex gap-1 md:gap-2">
            <Button
              variant={selectedRegion === "taiwan" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRegion("taiwan")}
              className="text-xs md:text-sm"
            >
              台灣
            </Button>
            <Button
              variant={selectedRegion === "japan" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRegion("japan")}
              className="text-xs md:text-sm"
            >
              日本
            </Button>
            <Button
              variant={selectedRegion === "malaysia" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRegion("malaysia")}
              className="text-xs md:text-sm"
            >
              馬來西亞
            </Button>
          </div>
        </div>
      </nav>

      {/* 英雄區域 - 個性化設計 */}
      <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
        {/* 背景：棕褐色漸層 + 紋理 */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, #8B7355 0%, #A0826D 50%, #6B5344 100%)",
            opacity: 0.95,
          }}
        />
        
        {/* 紋理效果 */}
        <div
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\"><filter id=\"noise\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" /></filter><rect width=\"100\" height=\"100\" fill=\"%23000\" filter=\"url(%23noise)\" /></svg>')",
          }}
        />

        {/* 內容容器 */}
        <div className="relative z-10 container w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* 左側：文案敘事 */}
            <div
              className={`text-white transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {/* 身份宣言 */}
              <div className="mb-6 md:mb-8">
                <p className="text-sm md:text-base text-amber-200 font-semibold mb-2 tracking-wide">
                  我的身份
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  {currentContent.identity}
                </h1>
              </div>

              {/* 價值主張 */}
              <div className="mb-8 md:mb-12">
                <p className="text-lg md:text-2xl text-amber-100 leading-relaxed font-medium">
                  {currentContent.valueProposition}
                </p>
                <div className="mt-4 h-1 w-16 bg-gradient-to-r from-amber-300 to-amber-500 rounded" />
              </div>

              {/* 行動號召 */}
              <div className="mb-8 md:mb-12">
                <p className="text-base md:text-lg text-white mb-6">
                  {currentContent.actionCTA}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-amber-400 text-amber-900 hover:bg-amber-300 font-semibold text-base md:text-lg"
                  >
                    查看服務
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10 font-semibold text-base md:text-lg"
                  >
                    立即接案
                  </Button>
                </div>
              </div>

              {/* 聯絡資訊 */}
              <div className="text-sm md:text-base text-amber-100 space-y-2">
                <p>📞 {personalInfo.phone}</p>
                <p>📧 {personalInfo.email}</p>
              </div>
            </div>

            {/* 右側：個人照片 - 桌面版顯示 */}
            <div
              className={`hidden md:flex justify-center transition-all duration-1000 delay-300 ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="relative w-full max-w-sm">
                {/* 照片框 */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-300">
                  <img
                    src="/images/bert-profile.jpg"
                    alt="王純瑋"
                    className="w-full h-auto object-cover"
                  />
                  {/* 漸層遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* 底部資訊 */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-2xl font-bold">{personalInfo.name}</p>
                    <p className="text-sm text-amber-200">微波林克 (Weblink)</p>
                    <p className="text-xs text-amber-100 mt-2">18 年資歷 | 文史保存 × 靈性創作</p>
                  </div>
                </div>

                {/* 裝飾元素 */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-amber-300/10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>

        {/* 手機版個人照片 - 在文案下方 */}
        <div className="absolute bottom-0 left-0 right-0 md:hidden z-10 px-4 pb-8">
          <div className="relative max-w-xs mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg border-3 border-amber-300">
              <img
                src="/images/bert-profile.jpg"
                alt="王純瑋"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-center">
                <p className="text-lg font-bold">{personalInfo.name}</p>
                <p className="text-xs text-amber-200">微波林克</p>
              </div>
            </div>
          </div>
        </div>

        {/* 向下滾動提示 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="text-white text-center">
            <p className="text-xs md:text-sm text-amber-200 mb-2">向下滾動</p>
            <svg
              className="w-5 h-5 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 服務項目 */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">服務項目</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {services.map((service, idx) => (
              <Card
                key={service.id}
                className="p-4 md:p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group text-center"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-125 transition-transform">
                  {service.icon}
                </div>
                <h3 className="font-bold text-sm md:text-base mb-2">{service.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 作品集 */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">代表作品</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {portfolio.map((project) => (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="relative h-48 md:h-64 overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-amber-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                      {project.tagline}
                    </p>
                    <p className="text-sm mb-3 md:mb-4 line-clamp-2">
                      {project.description.substring(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                      {project.highlights.slice(0, 2).map((h, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-amber-100 text-amber-900 px-2 py-1 rounded"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs md:text-sm text-amber-600 font-semibold">
                      → 點擊查看完整網站
                    </p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 紀錄片 */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">文史保存紀錄片</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
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
                <h3 className="text-lg md:text-xl font-bold mt-4">{doc.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">{doc.year}</p>
                <p className="text-xs md:text-sm text-amber-600 font-semibold mb-2">
                  🏆 {doc.award}
                </p>
                <p className="text-sm">{doc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 客戶評價 */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">客戶評價</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-4 md:p-6 hover:shadow-xl transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-sm mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold text-sm md:text-base">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 聯絡區域 */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">準備好開始了嗎？</h2>
          <p className="text-lg md:text-xl mb-8 text-amber-100">
            讓我們一起為您的品牌注入溫度與靈魂
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-white text-amber-600 hover:bg-gray-100 font-semibold"
            >
              立即聯絡
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold"
            >
              查看更多
            </Button>
          </div>
          <p className="text-sm md:text-base">
            📞 {personalInfo.phone} | 📧 {personalInfo.email}
          </p>
        </div>
      </section>

      {/* 頁腳 */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container text-center text-xs md:text-sm text-muted-foreground">
          <p>© 2025 王純瑋 × 微波林克. All rights reserved.</p>
          <p className="mt-2">
            網頁設計 × PHP 程式 × SEO 優化 × 影片剪輯 × 影片拍攝
          </p>
        </div>
      </footer>

      {/* 動畫樣式 */}
      <style>{`
        @keyframes bounce-custom {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-bounce {
          animation: bounce-custom 2s infinite;
        }

        @media (max-width: 768px) {
          section:nth-child(2) {
            min-height: auto;
            padding-top: 8rem;
            padding-bottom: 12rem;
          }
        }
      `}</style>
    </div>
  );
}
