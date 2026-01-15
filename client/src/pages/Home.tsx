import { useState } from 'react';
import { personalInfo, careerTimeline, documentaryProjects, spiritualPractices, ayurvedicContributions, services, portfolioWorks } from '@/data/portfolio';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'career' | 'documentary' | 'spiritual' | 'ayurveda' | 'services' | 'portfolio'>('services');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', service: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 簡單的表單提交邏輯
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
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">王純瑋</h1>
          <p className="text-xl md:text-2xl mb-2">{personalInfo.englishName} | {personalInfo.alias}</p>
          <p className="text-lg md:text-xl opacity-90 mb-2">{personalInfo.tagline}</p>
          <p className="text-sm md:text-base opacity-80 mb-8">📞 {personalInfo.phone} | 📧 {personalInfo.email}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-[#8B7355] hover:bg-[#A0826D] text-white rounded-lg transition-colors duration-300"
            >
              查看服務
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-[#7BA89F] hover:bg-[#6B9A91] text-white rounded-lg transition-colors duration-300"
            >
              立即接案
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-gradient-warm">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-start">
            {/* Profile Image */}
            <div className="md:col-span-1">
              <div className="rounded-lg overflow-hidden shadow-lg sticky top-8">
                <img
                  src="/images/bert-profile.jpg"
                  alt="王純瑋"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            {/* Bio Content */}
            <div className="md:col-span-2">
              <h2 className="text-4xl font-serif font-bold mb-6 text-warm-primary">關於我</h2>
              <p className="text-lg leading-relaxed text-foreground mb-4 whitespace-pre-line">
                {personalInfo.bio}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {personalInfo.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white border-2 border-warm-primary text-warm-primary hover:bg-warm-primary hover:text-white transition-colors duration-300 rounded-lg text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <h2 className="text-4xl font-serif font-bold mb-12 text-warm-primary text-center">服務項目</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="card-warm">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 md:py-24 bg-gradient-warm">
        <div className="container max-w-5xl">
          <h2 className="text-4xl font-serif font-bold mb-12 text-warm-primary text-center">作品集</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioWorks.map((work) => (
              <a
                key={work.id}
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-warm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer block group"
              >
                <div className="aspect-video bg-secondary mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={work.image} 
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm text-warm-secondary font-bold mb-2">{work.category}</p>
                <h4 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-warm-primary transition-colors">{work.title}</h4>
                <p className="text-foreground text-sm mb-3">{work.description}</p>
                <div className="inline-block px-3 py-1 bg-warm-primary text-white rounded text-sm font-bold group-hover:bg-[#A0826D] transition-colors">
                  查看作品 →
                </div>
              </a>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-foreground mb-4 font-bold text-lg">上述作品均可點擊直接查看完整網站</p>
            <p className="text-muted-foreground mb-6">更多設計稿與案例請查看 Google Drive 作品集</p>
            <a
              href="https://drive.google.com/drive/folders/1gfG9SFLGnk_dwdt5O3RFuxC4z6m789g1?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-warm-primary text-white hover:bg-[#A0826D] transition-colors duration-300 rounded-lg font-bold"
            >
              📁 Google Drive 作品集
            </a>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-12 border-b-2 border-border pb-4">
            {[
              { id: 'career' as const, label: '職涯軌跡' },
              { id: 'documentary' as const, label: '文史紀錄' },
              { id: 'spiritual' as const, label: '身心靈探索' },
              { id: 'ayurveda' as const, label: '阿育吠陀貢獻' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-serif font-bold text-sm md:text-base transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'text-warm-primary border-b-4 border-warm-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Career Tab */}
          {activeTab === 'career' && (
            <div className="space-y-8">
              <h3 className="text-3xl font-serif font-bold text-warm-primary mb-8">職涯發展軌跡</h3>
              {careerTimeline.map((entry, idx) => (
                <div key={idx} className="card-warm">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <p className="text-sm text-warm-secondary font-bold mb-2">{entry.year}</p>
                      <h4 className="text-2xl font-serif font-bold text-foreground">{entry.title}</h4>
                      <p className="text-lg text-muted-foreground">{entry.company}</p>
                    </div>
                  </div>
                  <p className="text-foreground mb-4">{entry.description}</p>
                  {entry.skills && (
                    <div className="flex flex-wrap gap-2">
                      {entry.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Documentary Tab */}
          {activeTab === 'documentary' && (
            <div className="space-y-8">
              <h3 className="text-3xl font-serif font-bold text-warm-primary mb-8">文史紀錄與保存</h3>
              {documentaryProjects.map((project) => (
                <div key={project.id} className="card-warm">
                  <div className="mb-4">
                    <p className="text-sm text-warm-secondary font-bold mb-2">{project.year} · {project.category}</p>
                    <h4 className="text-2xl font-serif font-bold text-foreground">{project.title}</h4>
                  </div>
                  <p className="text-foreground mb-4">{project.description}</p>
                  {project.award && (
                    <p className="text-sm text-warm-secondary font-bold mb-4">🏆 {project.award}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Spiritual Tab */}
          {activeTab === 'spiritual' && (
            <div className="space-y-8">
              <h3 className="text-3xl font-serif font-bold text-warm-primary mb-8">身心靈探索</h3>
              {spiritualPractices.map((practice) => (
                <div key={practice.id} className="card-warm">
                  <h4 className="text-2xl font-serif font-bold text-foreground mb-2">{practice.title}</h4>
                  <p className="text-muted-foreground mb-4">{practice.description}</p>
                  <div className="whitespace-pre-line text-foreground leading-relaxed">
                    {practice.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ayurveda Tab */}
          {activeTab === 'ayurveda' && (
            <div className="space-y-8">
              <h3 className="text-3xl font-serif font-bold text-warm-primary mb-8">阿育吠陀知識傳承</h3>
              {ayurvedicContributions.map((contribution) => (
                <div key={contribution.id} className="card-warm">
                  <h4 className="text-2xl font-serif font-bold text-foreground mb-2">{contribution.title}</h4>
                  <p className="text-muted-foreground mb-4">{contribution.description}</p>
                  <div className="space-y-2">
                    <p><span className="font-bold text-warm-primary">角色：</span> {contribution.role}</p>
                    <p><span className="font-bold text-warm-primary">影響：</span> {contribution.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-warm">
        <div className="container max-w-2xl">
          <h2 className="text-4xl font-serif font-bold mb-12 text-warm-primary text-center">立即聯絡我</h2>
          <div className="card-warm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">姓名 *</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-warm-primary focus:outline-none transition-colors"
                  placeholder="請輸入您的姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-warm-primary focus:outline-none transition-colors"
                  placeholder="請輸入您的 Email"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">服務項目 *</label>
                <select
                  required
                  value={contactForm.service}
                  onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-warm-primary focus:outline-none transition-colors"
                >
                  <option value="">請選擇服務項目</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">訊息 *</label>
                <textarea
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-border rounded-lg focus:border-warm-primary focus:outline-none transition-colors resize-none"
                  rows={5}
                  placeholder="請詳細描述您的需求..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-warm-primary text-white hover:bg-[#A0826D] transition-colors duration-300 rounded-lg font-bold"
              >
                提交聯絡表單
              </button>
            </form>
            <div className="mt-8 pt-8 border-t-2 border-border">
              <p className="text-foreground mb-4 font-bold">直接聯絡方式：</p>
              <p className="text-lg mb-2">📞 <a href={`tel:${personalInfo.phone}`} className="text-warm-primary hover:underline">{personalInfo.phone}</a></p>
              <p className="text-lg">📧 <a href={`mailto:${personalInfo.email}`} className="text-warm-primary hover:underline">{personalInfo.email}</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h5 className="font-serif font-bold text-lg mb-4">王純瑋</h5>
              <p className="text-sm opacity-90">{personalInfo.tagline}</p>
            </div>
            <div>
              <h5 className="font-serif font-bold text-lg mb-4">聯絡方式</h5>
              <p className="text-sm opacity-90">
                📞 <a href={`tel:${personalInfo.phone}`} className="hover:underline">{personalInfo.phone}</a>
              </p>
              <p className="text-sm opacity-90">
                📧 <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
              </p>
              <p className="text-sm opacity-90">📍 {personalInfo.location}</p>
            </div>
            <div>
              <h5 className="font-serif font-bold text-lg mb-4">社群連結</h5>
              <div className="flex flex-wrap gap-2">
                {personalInfo.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm opacity-90 hover:opacity-100 hover:underline"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-75">
            <p>© 2025 王純瑋 (Bert Wang). 在喧鬧世界裡尋找細微溫度。</p>
            <p className="mt-2">「對不起、請原諒我、謝謝你、我愛你」— 零極限</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
