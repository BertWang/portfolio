import { useState } from 'react';
import { personalInfo, careerTimeline, documentaryProjects, spiritualPractices, ayurvedicContributions } from '@/data/portfolio';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'career' | 'documentary' | 'spiritual' | 'ayurveda'>('career');

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
        
        <div className="relative z-10 text-center text-white px-4 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">王純瑋</h1>
          <p className="text-xl md:text-2xl mb-2">{personalInfo.englishName} | {personalInfo.alias}</p>
          <p className="text-lg md:text-xl opacity-90 mb-8">{personalInfo.tagline}</p>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-[#8B7355] hover:bg-[#A0826D] text-white rounded-lg transition-colors duration-300"
          >
            探索我的故事
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-gradient-warm">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold mb-6 text-warm-primary">關於我</h2>
            <p className="text-lg leading-relaxed text-foreground mb-4">
              {personalInfo.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {personalInfo.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white border-2 border-warm-primary text-warm-primary hover:bg-warm-primary hover:text-white transition-colors duration-300 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
            </div>
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
                className={`px-6 py-2 font-serif font-bold text-lg transition-colors duration-300 ${
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
                  {project.links && (
                    <div className="flex flex-wrap gap-2">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-warm-primary text-white hover:bg-[#A0826D] transition-colors duration-300 rounded-lg text-sm"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
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
              <div className="card-warm bg-secondary/50 border-2 border-warm-secondary">
                <p className="text-foreground">
                  如欲了解更多阿育吠陀知識，歡迎訪問{' '}
                  <a
                    href="https://bertwang.github.io/ayurveda_vaidya/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm-primary font-bold hover:underline"
                  >
                    朱婕老師的阿育吠陀筆記分享網站
                  </a>
                </p>
              </div>
            </div>
          )}
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
                Email: <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
              </p>
              <p className="text-sm opacity-90">Location: {personalInfo.location}</p>
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
