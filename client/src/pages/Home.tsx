import { useState } from 'react';
import { ChevronDown, Phone, Mail, ExternalLink } from 'lucide-react';

export default function Home() {
  const [activeRegion, setActiveRegion] = useState('tw');

  const regionContent = {
    tw: {
      title: '網頁設計師 × PHP 工程師 × 文史保存者 × 靈性創作者',
      subtitle: '用溫度設計，為品牌注入靈魂',
      cta1: '查看服務',
      cta2: '立即接案',
    },
    jp: {
      title: 'Web Designer × PHP Engineer × Cultural Heritage Preserver × Spiritual Creator',
      subtitle: 'Infuse warmth into your brand through thoughtful design',
      cta1: 'View Services',
      cta2: 'Start a Project',
    },
    my: {
      title: 'Pereka Web × Jurutera PHP × Pemelihara Warisan Budaya × Pencipta Spiritual',
      subtitle: 'Rancangan dengan kehangatan untuk jiwa merek Anda',
      cta1: 'Lihat Layanan',
      cta2: 'Mulai Proyek',
    },
  };

  const content = regionContent[activeRegion as keyof typeof regionContent];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 導航欄 */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-primary">王純瑋</div>
          <div className="flex gap-4">
            {['tw', 'jp', 'my'].map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-3 py-2 rounded transition-all ${
                  activeRegion === region
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary'
                }`}
              >
                {region === 'tw' ? '台灣' : region === 'jp' ? '日本' : '馬來西亞'}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero 區域 - 簡潔有力 */}
      <section className="relative bg-gradient-to-br from-[#8B7355] to-[#A0826D] py-24 md:py-32">
        <div className="container">
          <div className="max-w-3xl">
            {/* 身份宣言 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
              {content.title}
            </h1>

            {/* 副標題 */}
            <p className="text-lg md:text-xl text-white/90 mb-8 animate-fade-in-delay-1">
              {content.subtitle}
            </p>

            {/* CTA 按鈕 */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
              <a
                href="#services"
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-all hover:shadow-lg"
              >
                {content.cta1}
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-all"
              >
                {content.cta2}
              </a>
            </div>
          </div>
        </div>

        {/* 向下滾動提示 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/60" size={32} />
        </div>
      </section>

      {/* 個人介紹區域 - 充分展示資歷 */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* 左側：個人照片 */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-yellow-500 hover:shadow-3xl transition-shadow">
                <img
                  src="/images/IMG_5972.jpeg"
                  alt="王純瑋"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 右側：個人介紹文案 */}
            <div className="space-y-8">
              {/* 名字與身份 */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">王純瑋</h2>
                <p className="text-lg text-muted-foreground">微波林克 (Weblink) | 設計師 × 工程師 × 文史保存者</p>
              </div>

              {/* 核心介紹 */}
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed">
                  18 年網頁設計與 PHP 開發經驗，專注於為台灣在地品牌創造具有溫度的數位體驗。
                  不只是製作網站，而是透過設計保存品牌故事、文化記憶，與社會價值。
                </p>
              </div>

              {/* 資歷亮點 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">核心資歷</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold mt-1">✓</span>
                    <span className="text-foreground">18 年網頁設計與 PHP 開發經驗</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold mt-1">✓</span>
                    <span className="text-foreground">4 個代表作品：天喜の記憶、SOYUI COFFEE、OpenLock、溫ㄟ宅修</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold mt-1">✓</span>
                    <span className="text-foreground">2 部獲獎紀錄片：《南蚵一夢》、《雁難飛》</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold mt-1">✓</span>
                    <span className="text-foreground">古蹟保存計畫參與者（赤嵌樓、祀典武廟、大天后宮）</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-500 font-bold mt-1">✓</span>
                    <span className="text-foreground">朱婕老師阿育吠陀筆記數位化與網站架設</span>
                  </li>
                </ul>
              </div>

              {/* 核心技能 */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">核心技能</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="font-semibold text-foreground">網頁設計</p>
                    <p className="text-sm text-muted-foreground">UI/UX 設計</p>
                  </div>
                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="font-semibold text-foreground">PHP 開發</p>
                    <p className="text-sm text-muted-foreground">後端工程</p>
                  </div>
                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="font-semibold text-foreground">品牌設計</p>
                    <p className="text-sm text-muted-foreground">視覺識別</p>
                  </div>
                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="font-semibold text-foreground">影像創作</p>
                    <p className="text-sm text-muted-foreground">紀錄片製作</p>
                  </div>
                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="font-semibold text-foreground">SEO 優化</p>
                    <p className="text-sm text-muted-foreground">搜尋引擎優化</p>
                  </div>
                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="font-semibold text-foreground">文史保存</p>
                    <p className="text-sm text-muted-foreground">古蹟紀錄</p>
                  </div>
                </div>
              </div>

              {/* 聯絡資訊 */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="tel:0901404663"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Phone size={20} />
                  0901404663
                </a>
                <a
                  href="mailto:weblink1982@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Mail size={20} />
                  weblink1982@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 作品集區域 */}
      <section id="services" className="py-20 md:py-28 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">代表作品</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* 天喜の記憶 */}
            <a
              href="https://skylark.tw/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-[#8B7355] to-[#A0826D] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">天喜の記憶</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">天喜の記憶 (Skylark)</h3>
                <p className="text-muted-foreground mb-4">品牌記憶庫 | 1990-2014 歷史保存</p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                  <span>查看完整網站</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </a>

            {/* SOYUI COFFEE */}
            <a
              href="https://suoyicoffee.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-[#8B4513] to-[#D2691E] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">SOYUI COFFEE</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">SOYUI COFFEE</h3>
                <p className="text-muted-foreground mb-4">精品咖啡品牌 | 職人精神展現</p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                  <span>查看完整網站</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </a>

            {/* OpenLock */}
            <a
              href="https://bertwang.github.io/openlock/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-[#DC143C] to-[#FF6347] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">OpenLock</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">OpenLock 強匠鎖店</h3>
                <p className="text-muted-foreground mb-4">24H 緊急開鎖 | 信任承諾</p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                  <span>查看完整網站</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </a>

            {/* 溫ㄟ宅修 */}
            <a
              href="https://bertwang.github.io/home_repair/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-[#2F4F4F] to-[#696969] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">溫ㄟ宅修</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">溫ㄟ宅修</h3>
                <p className="text-muted-foreground mb-4">房屋修繕職人 | 生活溫度</p>
                <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                  <span>查看完整網站</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* 服務項目區域 */}
      <section id="services" className="py-20 md:py-28 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">服務項目</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '網站設計', desc: '響應式設計、UI/UX 優化、品牌視覺' },
              { title: 'PHP 程式', desc: '後端開發、資料庫設計、系統整合' },
              { title: '網站 SEO', desc: '搜尋引擎優化、關鍵詞策略、內容優化' },
              { title: '影片剪輯', desc: '紀錄片製作、企業宣傳、社群內容' },
              { title: '影片拍攝', desc: '專業攝影、現場紀錄、素材採集' },
              { title: '文史保存', desc: '古蹟紀錄、文化檔案、數位化' },
            ].map((service, idx) => (
              <div key={idx} className="bg-secondary p-8 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 聯絡區域 */}
      <section id="contact" className="py-20 md:py-28 bg-gradient-to-br from-[#8B7355] to-[#A0826D]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">讓您的故事被好好記住</h2>
          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto">
            無論您需要網站設計、技術開發、影像創作或文史保存，我都準備好為您的品牌注入溫度。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:0901404663"
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              撥打電話：0901404663
            </a>
            <a
              href="mailto:weblink1982@gmail.com"
              className="px-8 py-4 border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              發送郵件
            </a>
          </div>
        </div>
      </section>

      {/* 頁腳 */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container text-center text-muted-foreground">
          <p>© 2024 王純瑋 (Bert Wang) | 微波林克 (Weblink)</p>
          <p className="mt-2">用溫度設計，為品牌注入靈魂</p>
        </div>
      </footer>
    </div>
  );
}
