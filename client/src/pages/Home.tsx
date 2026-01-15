import { useState } from 'react';
import { personalInfo, services, portfolio, documentaries, testimonials, ctaText } from '@/data/portfolio';

export default function Home() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', service: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`感謝您的聯絡！我會盡快回復您。\n\n聯絡方式：${personalInfo.phone}\nEmail: ${personalInfo.email}`);
    setContactForm({ name: '', email: '', message: '', service: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/hero-background.jpg)',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{personalInfo.name}</h1>
          <p className="text-xl md:text-2xl mb-2">{personalInfo.englishName} | {personalInfo.alias}</p>
          <p className="text-lg md:text-xl opacity-90 mb-2">{personalInfo.subtitle}</p>
          <p className="text-sm md:text-base opacity-80 mb-8">📞 {personalInfo.phone} | 📧 {personalInfo.email}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-[#8B7355] hover:bg-[#A0826D] text-white rounded-lg transition-colors duration-300 font-bold"
            >
              {ctaText.secondary}
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-[#7BA89F] hover:bg-[#6B9A91] text-white rounded-lg transition-colors duration-300 font-bold"
            >
              {ctaText.primary}
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-[#F5E6D3] to-background">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Profile Image */}
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-lg sticky top-8">
                <img
                  src={personalInfo.image}
                  alt={personalInfo.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            {/* Bio Content */}
            <div className="md:col-span-2">
              <h2 className="text-4xl font-serif font-bold mb-6 text-[#8B7355]">關於我</h2>
              <p className="text-lg leading-relaxed text-foreground mb-4">
                {personalInfo.bio}
              </p>
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4 text-foreground">聯絡方式</h3>
                <div className="space-y-2">
                  <p className="text-foreground">📞 <a href={`tel:${personalInfo.phone}`} className="text-[#8B7355] hover:underline font-bold">{personalInfo.phone}</a></p>
                  <p className="text-foreground">📧 <a href={`mailto:${personalInfo.email}`} className="text-[#8B7355] hover:underline">{personalInfo.email}</a></p>
                  <p className="text-foreground">📍 {personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <h2 className="text-4xl font-serif font-bold mb-4 text-[#8B7355] text-center">五大服務項目</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">品牌故事設計、網站開發、文史紀錄、影像創作一條龍服務</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="p-6 bg-[#F5E6D3] rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{service.name}</h3>
                <p className="text-foreground mb-3">{service.description}</p>
                <p className="text-sm text-muted-foreground">{service.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-gradient-to-b from-[#F5E6D3] to-background">
        <div className="container max-w-5xl">
          <h2 className="text-4xl font-serif font-bold mb-4 text-[#8B7355] text-center">四個故事，四種溫度</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">每個設計都在守護一份溫度。點擊卡片可直接訪問完整網站。</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {portfolio.map((project) => (
              <a
                key={project.id}
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer block bg-white"
              >
                <div className="aspect-video bg-secondary overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#8B7355] font-bold mb-2">{project.category}</p>
                  <h4 className="text-2xl font-serif font-bold text-foreground mb-2 group-hover:text-[#8B7355] transition-colors">{project.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{project.tagline}</p>
                  <p className="text-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="inline-block px-4 py-2 bg-[#8B7355] text-white rounded font-bold group-hover:bg-[#A0826D] transition-colors">
                    查看完整案例 →
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Portfolio Details */}
          <div className="space-y-8 mb-12">
            {portfolio.map((project) => (
              <div key={project.id} className="p-8 bg-white rounded-lg border-l-4 border-[#8B7355]">
                <h3 className="text-3xl font-serif font-bold text-foreground mb-2">{project.name}</h3>
                <p className="text-lg text-[#8B7355] font-bold mb-4">{project.tagline}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-foreground mb-2">設計挑戰</h4>
                    <p className="text-foreground">{project.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-2">設計解決方案</h4>
                    <p className="text-foreground">{project.solution}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-foreground mb-3">設計亮點</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-[#8B7355] font-bold mr-2">✓</span>
                        <span className="text-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Testimonial */}
                <div className="p-4 bg-[#F5E6D3] rounded-lg border-l-4 border-[#7BA89F]">
                  <p className="text-foreground italic mb-3">「{project.testimonial.text}」</p>
                  <p className="text-sm font-bold text-muted-foreground">— {project.testimonial.author}</p>
                  <div className="flex mt-2">
                    {[...Array(project.testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-[#8B7355]">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-foreground mb-4 font-bold text-lg">更多設計稿與案例請查看 Google Drive 作品集</p>
            <a
              href="https://drive.google.com/drive/folders/1gfG9SFLGnk_dwdt5O3RFuxC4z6m789g1?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-[#8B7355] text-white hover:bg-[#A0826D] transition-colors duration-300 rounded-lg font-bold"
            >
              📁 查看完整作品集
            </a>
          </div>
        </div>
      </section>

      {/* Documentaries Section */}
      <section id="documentaries" className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <h2 className="text-4xl font-serif font-bold mb-12 text-[#8B7355] text-center">文史紀錄片</h2>
          <div className="space-y-12">
            {documentaries.map((doc) => (
              <div key={doc.id} className="p-8 bg-[#F5E6D3] rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* YouTube Embed */}
                  <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${doc.youtubeId}`}
                      title={doc.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-foreground mb-2">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{doc.year}</p>
                    <p className="text-foreground mb-4">{doc.description}</p>
                    {doc.award && (
                      <div className="p-4 bg-white rounded-lg border-l-4 border-[#7BA89F]">
                        <p className="text-sm font-bold text-[#8B7355]">🏆 {doc.award}</p>
                        {doc.awardLink && (
                          <a href={doc.awardLink} target="_blank" rel="noopener noreferrer" className="text-sm text-[#7BA89F] hover:underline mt-2 inline-block">
                            查看獲獎詳情 →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-gradient-to-b from-[#F5E6D3] to-background">
        <div className="container max-w-5xl">
          <h2 className="text-4xl font-serif font-bold mb-12 text-[#8B7355] text-center">客戶評價</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#8B7355] text-xl">★</span>
                  ))}
                </div>
                <p className="text-foreground italic mb-4">「{testimonial.text}」</p>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-background">
        <div className="container max-w-2xl">
          <h2 className="text-4xl font-serif font-bold mb-12 text-[#8B7355] text-center">聯絡我</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Direct Contact */}
            <div className="p-6 bg-[#F5E6D3] rounded-lg text-center">
              <p className="text-5xl mb-4">📞</p>
              <h3 className="text-xl font-bold text-foreground mb-2">直接撥號</h3>
              <a href={`tel:${personalInfo.phone}`} className="text-2xl font-bold text-[#8B7355] hover:text-[#A0826D] transition-colors">
                {personalInfo.phone}
              </a>
            </div>
            
            {/* Email Contact */}
            <div className="p-6 bg-[#F5E6D3] rounded-lg text-center">
              <p className="text-5xl mb-4">📧</p>
              <h3 className="text-xl font-bold text-foreground mb-2">寄送郵件</h3>
              <a href={`mailto:${personalInfo.email}`} className="text-lg text-[#8B7355] hover:text-[#A0826D] transition-colors break-all">
                {personalInfo.email}
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-[#F5E6D3] p-8 rounded-lg">
            <div className="mb-6">
              <label className="block text-foreground font-bold mb-2">您的名稱</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#8B7355] rounded-lg focus:outline-none focus:border-[#7BA89F]"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-foreground font-bold mb-2">您的郵件</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#8B7355] rounded-lg focus:outline-none focus:border-[#7BA89F]"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-foreground font-bold mb-2">服務項目</label>
              <select
                value={contactForm.service}
                onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                className="w-full px-4 py-2 border-2 border-[#8B7355] rounded-lg focus:outline-none focus:border-[#7BA89F]"
              >
                <option value="">選擇服務項目</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-foreground font-bold mb-2">您的訊息</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 border-2 border-[#8B7355] rounded-lg focus:outline-none focus:border-[#7BA89F] resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#8B7355] text-white hover:bg-[#A0826D] transition-colors duration-300 rounded-lg font-bold text-lg"
            >
              送出聯絡表單
            </button>
          </form>

          <p className="text-center text-muted-foreground mt-8 text-sm">
            感謝您的聯絡！我會在 24 小時內回復您。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#8B7355] text-white text-center">
        <p className="mb-2">王純瑋 (Bert Wang) | 微波林克 (Weblink)</p>
        <p className="text-sm opacity-80">在喧鬧世界裡尋找細微溫度的影像創作者</p>
        <p className="text-sm opacity-80 mt-4">© 2024 All Rights Reserved</p>
      </footer>
    </div>
  );
}
