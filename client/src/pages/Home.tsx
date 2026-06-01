import { useState, useEffect } from 'react';
import { ChevronDown, Phone, Mail, ExternalLink, Menu, X, Send, ArrowRight } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import { getLanguageFromPath, getLanguageCode, seoConfigs, updateSEOHead } from '@/lib/seoConfig';
import { useLoading } from '@/contexts/LoadingContext';

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const language = getLanguageFromPath(location);
  const languageCode = getLanguageCode(language);

  const { hideLoading } = useLoading();

  // Update SEO on mount and when language changes
  useEffect(() => {
    const seoConfig = seoConfigs[language];
    if (seoConfig) {
      updateSEOHead(seoConfig, languageCode);
    }
    // Hide loading when page content is ready
    hideLoading();
  }, [language, languageCode, hideLoading]);

  const [activeRegion, setActiveRegion] = useState(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const regionContent = {
    tw: {
      since: 'SINCE 2004',
      title: '視覺生活的溫度，設計品牌的靈魂 - 台南網頁設計與 PHP 開發',
      subtitle: '18 年台南網頁設計與 PHP 開發經驗。為台灣中小企業創造具有溫度的數位體驗。服務台南、高雄。',
      serviceArea: '服務地區',
      serviceAreaDesc: '台南、高雄、日本、馬來西亞',
      cta1: '立即咨詢',
      cta2: '查看作品',
      aboutTitle: '關於我',
      aboutIntro: '我是王純瑋，微波林克 (Weblink) 的創辦人。',
      aboutDesc: '18 年來，我透過網頁設計、PHP 開發、影像創作與文史保存，為台灣的品牌與社區注入溫度。不只是製作網站，而是透過設計保存品牌故事、文化記憶，與社會價值。',
      highlights: [
        '18 年網頁設計與 PHP 開發經驗',
        '4 個代表作品：天喜の記憶、所以咖啡、強匠鎖店、溫ㄟ宅修',
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
      contactEmail: 'EMAIL咨詢',
      civicTitle: '用設計與影像，為台灣的故事發聲',
      civicSubtitle: '不只是製作網站，更是透過紀錄片、影像創作與公民參與，守護文化記憶、實踐社會責任',
      civicMainText: '18 年來，我用代碼和設計為品牌創造溫度。但我也相信，設計的力量不只在於商業，更在於能否為社會議題發聲。',
      civicMainText2: '從 318 學運到青島東的護國大遶述，從飛雁新村的都市更新到南山公墓的文化保存，我用影像記錄著台灣被遺忘的故事。每一部紀錄片、每一支影片、每一次直播，都是我對這片土地的承諾——用溫度設計，用影像見證，用行動改變。',
      civicDocumentaries: '🎬 獲獎紀錄片 - 用影像說故事',
      civicHeritage: '🏛️ 文化保存 - 守護台灣的記憶',
      civicHeritageSub: '我不只是設計師，更是文化的守護者。參與赤嵌樓、祀典武廟、大天后宮等古蹟保存計畫，守護台南南山公墓、高雄覆鼎金公墓，搶救 1936 年的台南舊魚市場。每一個行動，都是為了讓下一代知道：我們來自哪裡，我們珍視什麼。',
      civicMovement: '🎥 社會運動 - 用影像見證時代',
      civicMovementSub: '318 學運、青島東護國大遶述、小草行動——我用影像記錄著這些時代的聲音。與朱康老師合作製作支持影片，直播公民參與的每一刻，因為我相信：每一個聲音都值得被看見，每一次行動都值得被記錄。',
      civicCreation: '✨ 影像創作 - 在喧鬧世界裡尋找細微溫度',
      civicCreationSub: '微波林克不只是網頁設計師，更是一個影片創作者。透過專業的剪輯、音樂搭配、現場直播，將社會議題、文化故事、公民行動轉化為可被感受的影像作品。因為我相信，設計和影像的力量，能夠改變人心，進而改變世界。',
      civicCTA: '您的品牌也關心社會責任嗎？',
      civicCTADesc: '如果您的組織也想透過設計和影像為台灣發聲，歡迎與我合作。我不只能為您設計網站，更能幫您用故事、用影像、用溫度連結社會。',
      whyChooseTitle: '為什麼選擇王純瑋？',
      whyChoose: [
        {
          title: '台南在地，深度理解',
          desc: '我是台南人，深耕台南 18 年。我不只是設計師，更是台南文化的守護者。我了解台南中小企業的需求，知道如何用設計幫助您在競爭激烈的市場中脫穎而出。'
        },
        {
          title: '文化保存 × 視覺設計 = 獨特價值',
          desc: '我不只能為您設計網站，更能幫您用故事、用影像、用溫度連結客戶。我的作品不是冷冰冰的代碼，而是承載著品牌靈魂的設計。'
        },
        {
          title: '紀錄片 × 品牌故事 = 深度連結',
          desc: '我用紀錄片的手法製作品牌影像。每一支影片、每一個畫面，都是為了讓您的客戶感受到品牌的溫度。這不是普通的網頁設計，這是一次完整的品牌體驗設計。'
        },
        {
          title: '社會責任 × 商業成功 = 永續經營',
          desc: '我相信設計的力量不只在於商業，更在於能否為社會議題發聲。選擇與我合作，您不只是在建立一個網站，更是在參與一個有溫度、有責任感的品牌故事。'
        }
      ],
      faqTitle: '常見問題',
      faqItems: [
        {
          q: '王純瑋與其他網頁設計師的差別在哪裡？',
          a: '最大的差別在於「溫度」。大多數設計師只是製作網站，但我會幫您用故事、用影像、用設計來傳達品牌的靈魂。我不只是技術人員，更是您品牌故事的共同創造者。'
        },
        {
          q: '為什麼要選擇台南在地的設計師？',
          a: '台南在地的設計師更了解台南市場、台南文化、台南消費者的需求。我 18 年來深耕台南，知道如何用設計幫助台南企業在全國甚至國際市場上競爭。'
        },
        {
          q: '您的設計風格是什麼？',
          a: '我的設計風格是「有溫度的專業」。我不追求炫彩的視覺效果，而是追求能夠傳達品牌價值、連結客戶情感的設計。每一個色彩、每一個排版、每一個互動，都有其目的。'
        },
        {
          q: '您有提供 SEO 優化服務嗎？',
          a: '是的。我不只設計網站，更會確保您的網站在搜尋引擎上有良好的排名。我會針對「台南網頁設計」、「台南 PHP 開發」等本地關鍵詞進行優化。'
        }
      ]
    },
    jp: {
      since: 'SINCE 2004',
      title: 'あなたのブランドに温かみを注ぎ込む思慮深い設計',
      subtitle: '18年のウェブデザインとPHP開発の経験。台湾の中小企業のための温かいデジタル体験を作成します。台南、高雄でサービス提供中。',
      serviceArea: 'Service Area',
      serviceAreaDesc: 'Tainan, Kaohsiung, Japan, Malaysia',
      cta1: 'Consult Now',
      cta2: 'View Projects',
      aboutTitle: 'About Me',
      aboutIntro: 'I am Bert Wang, founder of Weblink.',
      aboutDesc: 'Over 18 years, I have infused warmth into Taiwanese brands and communities through web design, PHP development, video creation, and cultural heritage preservation. Not just building websites, but preserving brand stories, cultural memories, and social values through design.',
      highlights: [
        '18 years of web design and PHP development experience',
        '4 representative projects: Skylark, So Cafe, Strong Craftsman Lock Shop, WEN-A',
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
      contactEmail: 'Email Inquiry',
      civicTitle: 'デザインと映像で、台湾の物語を発信する',
      civicSubtitle: 'ウェブサイト制作だけでなく、ドキュメンタリー、映像制作、市民参加を通じて、文化的記憶を守り、社会的責任を実践する',
      civicMainText: '18 年間、私はコードとデザインでブランドに温かみを与えてきました。しかし、デザインの力は商業だけではなく、社会的課題に声を上げることができるはずです。',
      civicMainText2: '318 学運から青島東の護国大遶述まで、飛雁新村の都市更新から南山公墓の文化保存まで、私は映像で台湾の忘れられた物語を記録しています。すべてのドキュメンタリー、すべてのビデオ、すべてのライブ配信は、この土地への私の約束です——温かみのあるデザイン、映像での目撃、行動による変化。',
      civicDocumentaries: '🎬 受賞ドキュメンタリー - 映像で物語を語る',
      civicHeritage: '🏛️ 文化保存 - 台湾の記憶を守る',
      civicHeritageSub: '私はデザイナーであるだけでなく、文化の守護者です。赤嵌楼、祀典武廟、大天后宮などの古跡保存計画に参加し、台南南山公墓、高雄覆鼎金公墓を守り、1936 年の台南旧魚市場を救出します。すべての行動は、次の世代に知らせるためです：私たちはどこから来たのか、何を大切にしているのか。',
      civicMovement: '🎥 社会運動 - 映像で時代を目撃する',
      civicMovementSub: '318 学運、青島東護国大遶述、小草行動——私は映像でこれらの時代の声を記録しています。朱康先生と協力して支援ビデオを制作し、市民参加のすべての瞬間をライブ配信します。なぜなら、私は信じています：すべての声は見られるべきであり、すべての行動は記録されるべきです。',
      civicCreation: '✨ 映像制作 - 喧噪の世界で細かい温かみを探す',
      civicCreationSub: '微波林克はウェブデザイナーであるだけでなく、映像クリエイターでもあります。プロフェッショナルな編集、音楽マッチング、ライブ配信を通じて、社会的課題、文化的物語、市民参加を感じられる映像作品に変換します。デザインと映像の力が人心を変え、ひいては世界を変えることができると信じているからです。',
      civicCTA: 'あなたのブランドも社会的責任を気にしていますか？',
      civicCTADesc: 'あなたの組織がデザインと映像を通じて台湾のために声を上げたいのであれば、私と協力することをお勧めします。ウェブサイトの設計だけでなく、物語、映像、温かみを通じて社会と繋がるお手伝いができます。',
      whyChooseTitle: 'Why Choose Bert Wang?',
      whyChoose: [
        {
          title: 'Deep Local Understanding',
          desc: 'I am rooted in Taiwan for 18 years, deeply understanding the needs of local businesses. I\'m not just a designer—I\'m a cultural guardian who knows how to help your brand stand out.'
        },
        {
          title: 'Cultural Preservation × Visual Design = Unique Value',
          desc: 'I don\'t just design websites. I help you connect with customers through storytelling, imagery, and warmth. My work carries your brand\'s soul, not just code.'
        },
        {
          title: 'Documentary Filmmaking × Brand Storytelling = Deep Connection',
          desc: 'I create brand videos using documentary techniques. Every frame is designed to help your customers feel your brand\'s warmth and authenticity.'
        },
        {
          title: 'Social Responsibility × Business Success = Sustainable Growth',
          desc: 'Design\'s power extends beyond commerce—it can amplify social voices. Partnering with me means building a brand with warmth, responsibility, and purpose.'
        }
      ],
      faqTitle: 'Frequently Asked Questions',
      faqItems: [
        {
          q: 'What makes Bert Wang different from other web designers?',
          a: 'The biggest difference is "warmth." Most designers just build websites, but I help you communicate your brand\'s soul through storytelling, imagery, and thoughtful design. I\'m not just a technician—I\'m a co-creator of your brand story.'
        },
        {
          q: 'Why choose a local designer?',
          a: 'Local designers better understand the market, culture, and customer needs. With 18 years rooted in Taiwan, I know how to help businesses compete both nationally and internationally.'
        },
        {
          q: 'What is your design style?',
          a: 'My style is "warm professionalism." I don\'t pursue flashy visuals—I pursue design that communicates brand value and connects with customer emotions.'
        },
        {
          q: 'Do you provide SEO optimization services?',
          a: 'Yes. I don\'t just design websites; I ensure your site ranks well in search engines with optimized keywords and technical SEO.'
        }
      ]
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
        '4 proyek perwakilan: Skylark, So Cafe, Strong Craftsman Lock Shop, WEN-A',
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
      contactEmail: 'Konsultasi Email',
      civicTitle: 'Design and Video: Giving Voice to Malaysia\'s Stories',
      civicSubtitle: 'Beyond web design, I preserve cultural memory and practice social responsibility through documentaries, video production, and civic participation.',
      civicMainText: 'For 18 years, I\'ve used code and design to bring warmth to brands. But I believe design\'s power extends beyond commerce—it can amplify social voices and drive change.',
      civicMainText2: 'From civic movements to cultural preservation, from urban renewal to heritage protection, I document Malaysia\'s forgotten stories through film and video. Every documentary, every video, every live broadcast is my commitment to this land——designing with warmth, witnessing through images, creating change through action.',
      civicDocumentaries: '🎬 Award-Winning Documentaries - Storytelling Through Video',
      civicHeritage: '🏛️ Cultural Preservation - Protecting Our Heritage',
      civicHeritageSub: 'I\'m not just a designer—I\'m a guardian of culture. I participate in heritage preservation projects, protect historic cemeteries, and rescue forgotten architectural treasures. Because we must remember where we come from and what we cherish.',
      civicMovement: '🎥 Civic Engagement - Witnessing Our Times',
      civicMovementSub: 'From social movements to community actions, I document these moments through video. With professional editing, music composition, and live streaming, I transform social issues into powerful visual narratives. Because every voice deserves to be heard, every action deserves to be recorded.',
      civicCreation: '✨ Video Production - Finding Warmth in a Noisy World',
      civicCreationSub: 'Weblink isn\'t just a design studio—it\'s a creative video production house. Through professional editing, music matching, and live documentation, I transform social stories into emotionally resonant visual works. Because I believe design and video can change hearts, and changed hearts can change the world.',
      civicCTA: 'Does your organization also care about social responsibility?',
      civicCTADesc: 'If you want to amplify your brand\'s voice through design and video, let\'s collaborate. I can design your website and help you connect with your community through authentic storytelling, compelling visuals, and genuine warmth.',
      whyChooseTitle: 'Mengapa Memilih Bert Wang?',
      whyChoose: [
        {
          title: 'Pemahaman Lokal yang Mendalam',
          desc: 'Saya berakar di Taiwan selama 18 tahun, memahami kebutuhan bisnis lokal dengan mendalam. Saya bukan hanya desainer—saya adalah penjaga budaya yang tahu cara membuat merek Anda menonjol.'
        },
        {
          title: 'Pelestarian Budaya × Desain Visual = Nilai Unik',
          desc: 'Saya tidak hanya merancang situs web. Saya membantu Anda terhubung dengan pelanggan melalui storytelling, citra, dan kehangatan. Karya saya membawa jiwa merek Anda, bukan hanya kode.'
        },
        {
          title: 'Pembuatan Dokumenter × Storytelling Merek = Koneksi Mendalam',
          desc: 'Saya membuat video merek menggunakan teknik dokumenter. Setiap frame dirancang untuk membantu pelanggan Anda merasakan kehangatan dan keaslian merek Anda.'
        },
        {
          title: 'Tanggung Jawab Sosial × Kesuksesan Bisnis = Pertumbuhan Berkelanjutan',
          desc: 'Kekuatan desain melampaui perdagangan—dapat memperkuat suara sosial. Bermitra dengan saya berarti membangun merek dengan kehangatan, tanggung jawab, dan tujuan.'
        }
      ],
      faqTitle: 'Pertanyaan yang Sering Diajukan',
      faqItems: [
        {
          q: 'Apa perbedaan Bert Wang dengan desainer web lainnya?',
          a: 'Perbedaan terbesar adalah "kehangatan." Sebagian besar desainer hanya membangun situs web, tetapi saya membantu Anda mengkomunikasikan jiwa merek melalui storytelling, citra, dan desain yang bijaksana. Saya bukan hanya teknisi—saya adalah co-creator cerita merek Anda.'
        },
        {
          q: 'Mengapa memilih desainer lokal?',
          a: 'Desainer lokal lebih memahami pasar, budaya, dan kebutuhan pelanggan. Dengan 18 tahun berakar di Taiwan, saya tahu cara membantu bisnis bersaing secara nasional dan internasional.'
        },
        {
          q: 'Apa gaya desain Anda?',
          a: 'Gaya saya adalah "profesionalisme yang hangat." Saya tidak mengejar visual yang mencolok—saya mengejar desain yang mengkomunikasikan nilai merek dan terhubung dengan emosi pelanggan.'
        },
        {
          q: 'Apakah Anda menyediakan layanan optimasi SEO?',
          a: 'Ya. Saya tidak hanya merancang situs web; saya memastikan situs Anda berperingkat baik di mesin pencari dengan kata kunci yang dioptimalkan dan SEO teknis.'
        }
      ]
    }
  };

  const content = regionContent[activeRegion as keyof typeof regionContent];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
    // Show loading briefly during form submission
    // In a real app, this would be triggered by actual API calls
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle region change
  const handleRegionChange = (region: string) => {
    setActiveRegion(region);
    // Update URL path
    if (region === 'tw') {
      window.location.href = '/tw/';
    } else if (region === 'jp') {
      window.location.href = '/jp/';
    } else if (region === 'my') {
      window.location.href = '/my/';
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
                onClick={() => handleRegionChange(region)}
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
                    handleRegionChange(region);
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

            {/* 大標題 - SEO 優化 */}
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
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663032489249/coDLqCbRAJeBjXhk.jpeg"
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

              {/* 核心介紹 - SEO 優化 */}
              <p className="text-gray-700 leading-relaxed text-lg">
                {content.aboutDesc}
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mt-4">
                {activeRegion === 'tw' ? '專精於台南網頁設計、台南 PHP 開發、品牌設計與影像創作。無論您是台南中小企業、高雄新創，或日本、馬來西亞的品牌，我都能為您提供量身訂做的解決方案。' : activeRegion === 'jp' ? '台南のウェブデザイン、PHP開発、ブランドデザイン、ビデオ制作を専門としています。台湾の中小企業から日本、マレーシアのブランドまで、カスタマイズされたソリューションを提供します。' : 'Saya mengkhususkan diri dalam desain web Tainan, pengembangan PHP, desain merek, dan produksi video. Dari UKM Taiwan hingga merek Jepang dan Malaysia, saya menyediakan solusi yang disesuaikan.'}
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">{activeRegion === 'tw' ? '核心技能 - 台南網頁設計與 PHP 開發' : activeRegion === 'jp' ? 'コアスキル - ウェブデザインとPHP開発' : 'Keterampilan Inti - Desain Web dan Pengembangan PHP'}</h2>
          
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">{activeRegion === 'tw' ? '代表紀錄片 - 文化保存與品牌故事' : activeRegion === 'jp' ? '代表的なドキュメンタリー - 文化保存とブランドストーリー' : 'Dokumenter Perwakilan - Pelestarian Budaya dan Cerita Merek'}</h2>
          
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

      {/* 公民參與區塊 */}
      <section id="civic" className="py-16 md:py-24 bg-white">
        <div className="container px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{content.civicTitle}</h2>
            <p className="text-lg text-gray-600 mb-8">{content.civicSubtitle}</p>
            <p className="text-gray-700 mb-6 leading-relaxed">{content.civicMainText}</p>
            <p className="text-gray-700 leading-relaxed">{content.civicMainText2}</p>
          </div>

          {/* 公民參與項目卡片 */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* 獲獎紀錄片 */}
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{content.civicDocumentaries.split(' - ')[0]}</div>
              <h3 className="text-2xl font-bold text-[#8B7355] mb-4">{content.civicDocumentaries.split(' - ')[1]}</h3>
              <p className="text-gray-600 mb-6">《南趣一夠》2017 原鄉踏查紀錄片競賽環境生態特別獎 | 《雁難飛》2014 神腦紀錄片競賽社會組佐作</p>
              <a href="https://www.youtube.com/watch?v=DYvdqj_Rx9U" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#8B7355] font-semibold hover:underline">
                查看紀錄片 <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            {/* 文化保存 */}
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{content.civicHeritage.split(' - ')[0]}</div>
              <h3 className="text-2xl font-bold text-[#8B7355] mb-4">{content.civicHeritage.split(' - ')[1]}</h3>
              <p className="text-gray-600">{content.civicHeritageSub}</p>
            </div>

            {/* 社會運動 */}
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{content.civicMovement.split(' - ')[0]}</div>
              <h3 className="text-2xl font-bold text-[#8B7355] mb-4">{content.civicMovement.split(' - ')[1]}</h3>
              <p className="text-gray-600">{content.civicMovementSub}</p>
            </div>

            {/* 影像創作 */}
            <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{content.civicCreation.split(' - ')[0]}</div>
              <h3 className="text-2xl font-bold text-[#8B7355] mb-4">{content.civicCreation.split(' - ')[1]}</h3>
              <p className="text-gray-600">{content.civicCreationSub}</p>
            </div>
          </div>

          {/* CTA 區域 */}
          <div className="bg-gradient-to-r from-[#8B7355] to-[#6B5344] rounded-lg p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{content.civicCTA}</h3>
            <p className="text-lg mb-8 opacity-90">{content.civicCTADesc}</p>
            <button
              onClick={() => {
                const element = document.getElementById('consultation');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  setFormSubmitted(false);
                }
              }}
              className="bg-white text-[#8B7355] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              {content.civicCTA} <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 作品集區域 */}
      <section id="services" className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">{activeRegion === 'tw' ? '代表作品 - 台南網頁設計案例' : activeRegion === 'jp' ? '代表作品 - ウェブデザイン事例' : 'Karya Perwakilan - Studi Kasus Desain Web'}</h2>
          
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

            {/* 所以咖啡 */}
            <a
              href="https://suoyicoffee.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-[#8B7355] to-[#6B5344] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">所以咖啡</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#8B7355] mb-2">所以咖啡</h3>
                <p className="text-gray-600 mb-4">精品咖啡品牌 | 職人精神展現</p>
                <div className="flex items-center text-[#8B7355] group-hover:gap-2 transition-all">
                  <span>查看完整網站</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </a>

            {/* 強匠鎖店 */}
            <a
              href="https://openlock.tw/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-[#DC143C] to-[#FF6347] flex items-center justify-center">
                <span className="text-white text-2xl font-bold">強匠鎖店</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#8B7355] mb-2">強匠鎖店</h3>
                <p className="text-gray-600 mb-4">24H 緊急開鎖 | 信任承諾</p>
                <div className="flex items-center text-[#8B7355] group-hover:gap-2 transition-all">
                  <span>查看完整網站</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </a>

            {/* 溫ㄟ宅修 */}
            <a
              href="https://tainanfix.de5.net/"
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

      {/* 推薦理由區塊 */}
      <section className="py-16 md:py-24 bg-white border-t border-gray-200">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">{content.whyChooseTitle}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.whyChoose.map((reason: any, idx: number) => (
              <div key={idx} className="p-8 border-l-4 border-[#8B7355] bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-[#8B7355] mb-4">{reason.title}</h3>
                <p className="text-gray-700 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 區塊 */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">{content.faqTitle}</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {content.faqItems.map((item: any, idx: number) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-[#8B7355] mb-3">{item.q}</h3>
                <p className="text-gray-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
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
