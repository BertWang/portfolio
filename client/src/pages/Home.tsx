import { useState } from 'react';
import { ChevronDown, Phone, Mail, ExternalLink, Menu, X, Send, ArrowRight } from 'lucide-react';

export default function Home() {
  const [activeRegion, setActiveRegion] = useState('tw');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const regionContent = {
    tw: {
      since: 'SINCE 2004',
      title: '視覺生活的溫度，設計品牌的靈魂',
      subtitle: '18 年網頁設計與 PHP 開發經驗，為台灣在地品牌創造具有溫度的數位體驗',
      serviceArea: '服務地區',
      serviceAreaDesc: '台南、高雄、日本、馬來西亞',
      cta1: '立即咨詢',
      cta2: '查看作品',
      aboutTitle: '關於我',
      aboutIntro: '我是王純瑋，微波林克 (Weblink) 的創辦人。',
      aboutDesc: '18 年來，我透過網頁設計、PHP 開發、影像創作與文史保存，為台灣的品牌與社區注入溫度。不只是製作網站，而是透過設計保存品牌故事、文化記憶，與社會價值。',
      highlights: [
        '18 年網頁設計與 PHP 開發經驗',
        '4 個代表作品：天喜の記憶、SOYUI COFFEE、OpenLock、溫ㄟ宅修',
        '2 部獲獎紀錄片：《南蚵一夢》、《雁難飛》',
        '古蹟保存計畫參與者（赤嵌樓、祀典武廟、大天后宮）',
        '朱婕老師阿育吠陀筆記數位化與網站架設'
      ],
      skills: [
        { title: '網頁設計', desc: 'UI/UX 設計' },
        { title: 'PHP 開發', desc: '後端工程' },
        { title: '品牌設計', desc: '視覺識別' },
        { title: '影像創作', desc: '紀錄片製作' },
        { title: 'SEO 優化', desc: '搜尋引擎優化' },
        { title: '文史保存', desc: '古蹟紀錄' }
      ],
      projects: '代表作品',
      projectsCTA: '了解我的工作方式',
      documentaries: '代表紀錄片',
      contact: '立即咨詢',
      consultationTitle: '開始您的項目',
      consultationDesc: '告訴我您的需求，我會為您提供最適合的解決方案',
      consultationName: '您的名稱',
      consultationEmail: '您的郵箱',
      consultationService: '服務類型',
      consultationMessage: '簡短說明您的需求',
      consultationSubmit: '立即提交咨詢',
      serviceOptions: ['網頁設計', 'PHP 開發', '品牌設計', '影像創作', 'SEO 優化', '其他'],
      skillsCTA: '開始您的項目',
      contactCall: '立即來電',
      contactEmail: 'EMAIL咨詢'
    },
    jp: {
      since: 'SINCE 2004',
      title: 'Infuse warmth into your brand through thoughtful design',
      subtitle: '18 years of web design and PHP development experience, creating digital experiences with warmth for Taiwanese local brands',
      serviceArea: 'Service Area',
      serviceAreaDesc: 'Tainan, Kaohsiung, Japan, Malaysia',
      cta1: 'Consult Now',
      cta2: 'View Projects',
      aboutTitle: 'About Me',
      aboutIntro: 'I am Bert Wang, founder of Weblink.',
      aboutDesc: 'Over 18 years, I have infused warmth into Taiwanese brands and communities through web design, PHP development, video creation, and cultural heritage preservation. Not just building websites, but preserving brand stories, cultural memories, and social values through design.',
      highlights: [
        '18 years of web design and PHP development experience',
        '4 representative projects: Skylark, SOYUI COFFEE, OpenLock, WEN-A',
        '2 award-winning documentaries: "Oyster Dream" and "Geese Cannot Fly"',
        'Participant in heritage preservation projects (Confucius Temple, Martial Temple, Mazu Temple)',
        'Digitization and website development for Ayurveda notes'
      ],
      skills: [
        { title: 'Web Design', desc: 'UI/UX Design' },
        { title: 'PHP Development', desc: 'Backend Engineering' },
        { title: 'Brand Design', desc: 'Visual Identity' },
        { title: 'Video Creation', desc: 'Documentary Production' },
        { title: 'SEO Optimization', desc: 'Search Engine Optimization' },
        { title: 'Heritage Preservation', desc: 'Historical Recording' }
      ],
      projects: 'Representative Projects',
      projectsCTA: 'Learn About My Work',
      documentaries: 'Representative Documentaries',
      contact: 'Consult Now',
      consultationTitle: 'Start Your Project',
      consultationDesc: 'Tell me your needs and I will provide the best solution for you',
      consultationName: 'Your Name',
      consultationEmail: 'Your Email',
      consultationService: 'Service Type',
      consultationMessage: 'Brief description of your needs',
      consultationSubmit: 'Submit Inquiry Now',
      serviceOptions: ['Web Design', 'PHP Development', 'Brand Design', 'Video Creation', 'SEO Optimization', 'Other'],
      skillsCTA: 'Start Your Project',
      contactCall: 'Call Now',
      contactEmail: 'Email Inquiry'
    },
    my: {
      since: 'SEJAK 2004',
      title: 'Infuse warmth into your brand through thoughtful design',
      subtitle: '18 tahun pengalaman desain web dan pengembangan PHP, menciptakan pengalaman digital yang hangat untuk merek lokal Malaysia',
      serviceArea: 'Kawasan Layanan',
      serviceAreaDesc: 'Tainan, Kaohsiung, Jepang, Malaysia',
      cta1: 'Konsultasi Sekarang',
      cta2: 'Lihat Proyek',
      aboutTitle: 'Tentang Saya',
      aboutIntro: 'Saya adalah Bert Wang, pendiri Weblink.',
      aboutDesc: 'Selama 18 tahun, saya telah menyuntikkan kehangatan ke dalam merek dan komunitas lokal melalui desain web, pengembangan PHP, kreasi video, dan pelestarian warisan budaya. Bukan hanya membangun situs web, tetapi melestarikan cerita merek, memori budaya, dan nilai sosial melalui desain.',
      highlights: [
        '18 tahun pengalaman desain web dan pengembangan PHP',
        '4 proyek perwakilan: Skylark, SOYUI COFFEE, OpenLock, WEN-A',
        '2 dokumenter pemenang penghargaan: "Oyster Dream" dan "Geese Cannot Fly"',
        'Peserta dalam proyek pelestarian warisan (Kuil Confucius, Kuil Militer, Kuil Mazu)',
        'Digitalisasi dan pengembangan situs web untuk catatan Ayurveda'
      ],
      skills: [
        { title: 'Desain Web', desc: 'Desain UI/UX' },
        { title: 'Pengembangan PHP', desc: 'Rekayasa Backend' },
        { title: 'Desain Merek', desc: 'Identitas Visual' },
        { title: 'Kreasi Video', desc: 'Produksi Dokumenter' },
        { title: 'Optimasi SEO', desc: 'Optimasi Mesin Pencari' },
        { title: 'Pelestarian Warisan', desc: 'Perekaman Historis' }
      ],
      projects: 'Proyek Perwakilan',
      projectsCTA: 'Pelajari Cara Kerja Saya',
      documentaries: 'Dokumenter Perwakilan',
      contact: 'Konsultasi Sekarang',
      consultationTitle: 'Mulai Proyek Anda',
      consultationDesc: 'Beri tahu saya kebutuhan Anda dan saya akan memberikan solusi terbaik',
      consultationName: 'Nama Anda',
      consultationEmail: 'Email Anda',
      consultationService: 'Jenis Layanan',
      consultationMessage: 'Deskripsi singkat tentang kebutuhan Anda',
      consultationSubmit: 'Kirim Konsultasi Sekarang',
      serviceOptions: ['Desain Web', 'Pengembangan PHP', 'Desain Merek', 'Kreasi Video', 'Optimasi SEO', 'Lainnya'],
      skillsCTA: 'Mulai Proyek Anda',
      contactCall: 'Hubungi Sekarang',
      contactEmail: 'Konsultasi Email'
    }
  };

  const content = regionContent[activeRegion as keyof typeof regionContent];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* 導航欄 - 簡潔專業風格 */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-[#8B7355]">王純瑋</div>
            <div className="text-xs text-gray-500 hidden sm:block">微波林克</div>
          </div>
          
          {/* 桌面版區域選擇 */}
          <div className="hidden md:flex gap-2">
            {['tw', 'jp', 'my'].map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-4 py-2 text-sm font-medium transition-all ${
                  activeRegion === region
                    ? 'bg-[#8B7355] text-white rounded'
                    : 'text-gray-600 hover:text-[#8B7355]'
                }`}
              >
                {region === 'tw' ? '台灣' : region === 'jp' ? '日本' : '馬來西亞'}
              </button>
            ))}
          </div>

          {/* 手機版選單按鈕 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-[#8B7355]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 手機版選單 */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="flex flex-col gap-2 p-4">
              {['tw', 'jp', 'my'].map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    setActiveRegion(region);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 text-sm font-medium text-left transition-all ${
                    activeRegion === region
                      ? 'bg-[#8B7355] text-white rounded'
                      : 'text-gray-600 hover:text-[#8B7355]'
                  }`}
                >
                  {region === 'tw' ? '台灣' : region === 'jp' ? '日本' : '馬來西亞'}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero 區域 - 簡潔有力，參考「溫ㄟ宅修」設計 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4">
          <div className="max-w-2xl">
            {/* 年份標記 */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-0.5 bg-[#8B7355]"></div>
              <span className="text-sm font-semibold text-gray-500 tracking-widest">{content.since}</span>
            </div>

            {/* 大標題 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {content.title}
            </h1>

            {/* 副標題 */}
            <p className="text-lg md:text-xl text-gray-700 mb-12 leading-relaxed max-w-xl">
              {content.subtitle}
            </p>

            {/* 服務區域 */}
            <div className="mb-12 pb-12 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-widest">{content.serviceArea}</h3>
              <p className="text-gray-700">{content.serviceAreaDesc}</p>
            </div>

            {/* 聯絡方式 - 優化 CTA 設計 */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <button
                onClick={scrollToContact}
                className="flex flex-col items-center justify-center gap-3 p-6 md:p-8 bg-[#8B7355] hover:bg-[#7A6347] text-white rounded-lg transition-all group"
              >
                <Send size={28} className="group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-center">{content.cta1}</span>
                <span className="text-sm text-white/80">開始合作</span>
              </button>
              <a
                href="#services"
                className="flex flex-col items-center justify-center gap-3 p-6 md:p-8 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all group"
              >
                <ExternalLink size={28} className="text-[#8B7355] group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-gray-900 text-center">{content.cta2}</span>
                <span className="text-sm text-gray-600">查看案例</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 個人介紹區域 - 照片 + 文案 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* 左側：個人照片 */}
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <img
                  src="/images/IMG_5972.jpeg"
                  alt="王純瑋"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 右側：個人介紹 */}
            <div className="space-y-8 order-1 md:order-2">
              {/* 名字與身份 */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#8B7355] mb-2">{content.aboutTitle}</h2>
                <p className="text-lg font-semibold text-gray-700">{content.aboutIntro}</p>
              </div>

              {/* 核心介紹 */}
              <p className="text-gray-700 leading-relaxed text-lg">
                {content.aboutDesc}
              </p>

              {/* 資歷亮點 */}
              <div className="space-y-3">
                {content.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-[#8B7355] font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心技能區域 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">核心技能</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {content.skills.map((skill, idx) => (
              <div key={idx} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-[#8B7355] mb-2">{skill.title}</h3>
                <p className="text-gray-600">{skill.desc}</p>
              </div>
            ))}
          </div>

          {/* 技能區域 CTA */}
          <div className="text-center">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#8B7355] hover:bg-[#7A6347] text-white font-semibold rounded-lg transition-all group"
            >
              {content.skillsCTA}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 紀錄片展示區域 */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-200">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">{content.documentaries}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 南蚵一夢 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/DYvdqj_Rx9U"
                  title="南蚵一夢"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-[#8B7355] mb-2">南蚵一夢</h3>
                <p className="text-gray-600">台南文史紀錄 | 獲獎紀錄片</p>
              </div>
            </div>

            {/* 雁難飛 */}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/rPZAgZxxEHo"
                  title="雁難飛"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-[#8B7355] mb-2">雁難飛</h3>
                <p className="text-gray-600">文化保存 | 獲獎紀錄片</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 作品集區域 */}
      <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">{content.projects}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
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
                <h3 className="text-xl font-bold text-[#8B7355] mb-2">天喜の記憶 (Skylark)</h3>
                <p className="text-gray-600 mb-4">品牌記憶庫 | 1990-2014 歷史保存</p>
                <div className="flex items-center text-[#8B7355] group-hover:gap-2 transition-all">
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
                <h3 className="text-xl font-bold text-[#8B7355] mb-2">SOYUI COFFEE</h3>
                <p className="text-gray-600 mb-4">精品咖啡品牌 | 職人精神展現</p>
                <div className="flex items-center text-[#8B7355] group-hover:gap-2 transition-all">
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
                <h3 className="text-xl font-bold text-[#8B7355] mb-2">OpenLock 強匠鎖店</h3>
                <p className="text-gray-600 mb-4">24H 緊急開鎖 | 信任承諾</p>
                <div className="flex items-center text-[#8B7355] group-hover:gap-2 transition-all">
                  <span>查看完整網站</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </a>

            {/* 溫ㄟ宅修 */}
            <a
              href="https://bertwang.github.io/wenwei/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-[#6B4423] to-[#8B6F47] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">溫ㄟ宅修</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#8B7355] mb-2">溫ㄟ宅修</h3>
                <p className="text-gray-600 mb-4">居家修繕 | 生活溫度</p>
                <div className="flex items-center text-[#8B7355] group-hover:gap-2 transition-all">
                  <span>查看完整網站</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </a>
          </div>

          {/* 作品集 CTA */}
          <div className="text-center">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#8B7355] hover:bg-[#7A6347] text-white font-semibold rounded-lg transition-all group"
            >
              {content.projectsCTA}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 合作咨詢區域 */}
      <section id="contact" className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.consultationTitle}</h2>
              <p className="text-lg text-gray-600">{content.consultationDesc}</p>
            </div>

            <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              {/* 名稱 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{content.consultationName}</label>
                <input
                  type="text"
                  placeholder="請輸入您的名稱"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  required
                />
              </div>

              {/* 郵箱 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{content.consultationEmail}</label>
                <input
                  type="email"
                  placeholder="請輸入您的郵箱"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  required
                />
              </div>

              {/* 服務類型 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{content.consultationService}</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent"
                  required
                >
                  <option value="">-- 請選擇服務類型 --</option>
                  {content.serviceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* 需求說明 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{content.consultationMessage}</label>
                <textarea
                  placeholder="請簡短說明您的需求..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355] focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* 提交按鈕 */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#8B7355] hover:bg-[#7A6347] text-white font-semibold rounded-lg transition-all"
              >
                <Send size={20} />
                {content.consultationSubmit}
              </button>

              {/* 成功提示 */}
              {formSubmitted && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
                  ✓ 感謝您的咨詢，我們會盡快與您聯絡！
                </div>
              )}
            </form>

            {/* 直接聯絡方式 */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <a
                href="tel:0901404663"
                className="flex items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all"
              >
                <Phone size={32} className="text-[#8B7355] flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">{content.contactCall}</p>
                  <p className="text-lg font-semibold text-gray-900">0901-404-663</p>
                </div>
              </a>
              <a
                href="mailto:weblink1982@gmail.com?subject=合作咨詢"
                className="flex items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition-all"
              >
                <Mail size={32} className="text-[#8B7355] flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">{content.contactEmail}</p>
                  <p className="text-lg font-semibold text-gray-900">weblink1982@gmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 頁尾 */}
      <footer className="py-12 bg-[#8B7355] text-white text-center">
        <div className="container px-4">
          <p>© 2024 王純瑋 (Bert Wang) | 微波林克 (Weblink)</p>
          <p className="mt-2 text-white/80">用溫度設計，為品牌注入靈魂</p>
        </div>
      </footer>
    </div>
  );
}
