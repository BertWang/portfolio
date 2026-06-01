/**
 * SEO Configuration for Multi-Language Pages
 * Each language version has independent SEO metadata and structured data
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  hreflangs: Array<{ lang: string; href: string }>;
  structuredData: {
    localBusiness: {
      name: string;
      areaServed: string[];
      description: string;
      address?: string;
      telephone?: string;
      email?: string;
      sameAs?: string[];
    };
    person: {
      name: string;
      jobTitle: string;
      description: string;
      alternateName?: string;
      sameAs?: string[];
    };
    service?: {
      name: string;
      description: string;
      provider: string;
    };
  };
  author?: string;
  robotsDirective?: string;
}

const baseUrl = 'https://bertfolio-vncqhm2r.manus.space';
const ownerName = '王純瑋';
const ownerImage = `${baseUrl}/images/IMG_5972.jpeg`;

export const seoConfigs: Record<string, SEOConfig> = {
  tw: {
    title: '台南網頁設計 | 視覺設計師王純瑋 | 文化保存 × 品牌設計',
    description: '王純瑋是台南視覺設計師，18年網頁設計與PHP開發經驗。結合文化保存與品牌設計，為台南中小企業創造有溫度的數位體驗。服務台南、高雄、日本、馬來西亞。立即咨詢。',
    keywords: '台南網頁設計, 台南視覺設計師, 台南品牌設計, 台南PHP開發, 台南文創保存, 王純瑋, 微波林克, 網頁設計公司, 台南設計師, 台南網站製作',
    canonical: `${baseUrl}/tw/`,
    ogTitle: '台南網頁設計 | 視覺設計師王純瑋 | 文化保存 × 品牌設計',
    ogDescription: '王純瑋結合文化保存與品牌設計，為台南中小企業創造有溫度的數位體驗。18年網頁設計與PHP開發經驗。',
    ogUrl: `${baseUrl}/tw/`,
    ogImage: ownerImage,
    twitterTitle: '台南網頁設計 | 視覺設計師王純瑋',
    twitterDescription: '結合文化保存與品牌設計的台南視覺設計師。18年網頁設計與PHP開發經驗。',
    twitterImage: ownerImage,
    hreflangs: [
      { lang: 'zh-TW', href: `${baseUrl}/tw/` },
      { lang: 'ja', href: `${baseUrl}/jp/` },
      { lang: 'ms', href: `${baseUrl}/my/` },
      { lang: 'x-default', href: `${baseUrl}/` }
    ],
    structuredData: {
      localBusiness: {
        name: `${ownerName} - 微波林克`,
        areaServed: ['台南市', '高雄市'],
        description: '台南視覺設計師，結合文化保存與品牌設計。18年網頁設計與PHP開發經驗，為台灣中小企業創造有溫度的數位體驗。',
        address: 'Tainan, Taiwan',
        telephone: '0901-404-663',
        email: 'weblink1982@gmail.com',
        sameAs: ['https://github.com/bertwang', 'https://www.youtube.com/@weblink0912']
      },
      person: {
        name: ownerName,
        alternateName: 'Bert Wang',
        jobTitle: '視覺設計師 / 網頁設計師 / PHP 開發者 / 紀錄片導演 / 文化保存者',
        description: '台南視覺設計師，18年網頁設計與PHP開發經驗。結合文化保存與品牌設計，為台灣品牌與社區注入溫度。',
        sameAs: ['https://github.com/bertwang']
      },
      service: {
        name: '台南網頁設計與品牌設計服務',
        description: '為台南中小企業提供網頁設計、PHP開發、品牌設計、影像製作等服務',
        provider: '王純瑋 - 微波林克'
      }
    },
    author: '王純瑋',
    robotsDirective: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  },
  jp: {
    title: 'ウェブデザイン | ビジュアルデザイナー王純瑋 | 文化保存 × ブランドデザイン',
    description: 'ビジュアルデザイナー王純瑋は、18年のウェブデザインとPHP開発の経験を持つ台湾のデザイナーです。文化保存とブランドデザインを組み合わせた温かいデジタル体験を提供します。日本全国でサービス提供中。',
    keywords: 'ウェブデザイン, PHP開発, ビジュアルデザイナー, ブランドデザイン, ビデオ制作, SEO最適化, 文化保存, Weblink, 王純瑋',
    canonical: `${baseUrl}/jp/`,
    ogTitle: 'ウェブデザイン | ビジュアルデザイナー王純瑋 | 文化保存 × ブランドデザイン',
    ogDescription: 'ビジュアルデザイナー王純瑋が、文化保存とブランドデザインを組み合わせた温かいデジタル体験を提供します。18年のウェブデザイン経験。',
    ogUrl: `${baseUrl}/jp/`,
    ogImage: ownerImage,
    twitterTitle: 'ウェブデザイン | ビジュアルデザイナー王純瑋',
    twitterDescription: '文化保存とブランドデザインを組み合わせたビジュアルデザイナー。18年のウェブデザイン経験。',
    twitterImage: ownerImage,
    hreflangs: [
      { lang: 'ja', href: `${baseUrl}/jp/` },
      { lang: 'zh-TW', href: `${baseUrl}/tw/` },
      { lang: 'ms', href: `${baseUrl}/my/` },
      { lang: 'x-default', href: `${baseUrl}/` }
    ],
    structuredData: {
      localBusiness: {
        name: `${ownerName} - Weblink`,
        areaServed: ['日本'],
        description: 'ビジュアルデザイナー王純瑋は、文化保存とブランドデザインを組み合わせた温かいデジタル体験を提供します。18年のウェブデザイン経験。',
        address: 'Taiwan',
        telephone: '0901-404-663',
        email: 'weblink1982@gmail.com',
        sameAs: ['https://github.com/bertwang', 'https://www.youtube.com/@weblink0912']
      },
      person: {
        name: ownerName,
        alternateName: 'Bert Wang',
        jobTitle: 'ビジュアルデザイナー / ウェブデザイナー / PHP開発者 / ドキュメンタリー監督 / 文化保存者',
        description: 'ビジュアルデザイナー王純瑋は、18年のウェブデザインとPHP開発の経験を持つ。文化保存とブランドデザインを組み合わせた温かいデジタル体験を提供。',
        sameAs: ['https://github.com/bertwang']
      },
      service: {
        name: 'ウェブデザイン・ブランドデザインサービス',
        description: '日本のブランド向けにウェブデザイン、PHP開発、ブランドデザイン、ビデオ制作などのサービスを提供',
        provider: '王純瑋 - Weblink'
      }
    },
    author: '王純瑋',
    robotsDirective: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  },
  my: {
    title: 'Desain Web | Desainer Visual Bert Wang | Pelestarian Budaya × Desain Merek',
    description: 'Bert Wang adalah desainer visual dengan 18 tahun pengalaman desain web dan pengembangan PHP. Menggabungkan pelestarian budaya dengan desain merek untuk menciptakan pengalaman digital yang hangat. Layanan di seluruh Malaysia.',
    keywords: 'Desain Web, Desainer Visual, Desain Merek, Pengembangan PHP, Produksi Video, Optimasi SEO, Pelestarian Budaya, Weblink, Bert Wang, Agensi Desain Web',
    canonical: `${baseUrl}/my/`,
    ogTitle: 'Desain Web | Desainer Visual Bert Wang | Pelestarian Budaya × Desain Merek',
    ogDescription: 'Desainer visual Bert Wang menggabungkan pelestarian budaya dengan desain merek untuk menciptakan pengalaman digital yang hangat. 18 tahun pengalaman desain web.',
    ogUrl: `${baseUrl}/my/`,
    ogImage: ownerImage,
    twitterTitle: 'Desain Web | Desainer Visual Bert Wang',
    twitterDescription: 'Desainer visual yang menggabungkan pelestarian budaya dengan desain merek. 18 tahun pengalaman desain web.',
    twitterImage: ownerImage,
    hreflangs: [
      { lang: 'ms', href: `${baseUrl}/my/` },
      { lang: 'zh-TW', href: `${baseUrl}/tw/` },
      { lang: 'ja', href: `${baseUrl}/jp/` },
      { lang: 'x-default', href: `${baseUrl}/` }
    ],
    structuredData: {
      localBusiness: {
        name: `Bert Wang - Weblink`,
        areaServed: ['Malaysia'],
        description: 'Desainer visual Bert Wang menggabungkan pelestarian budaya dengan desain merek. 18 tahun pengalaman desain web dan pengembangan PHP.',
        address: 'Taiwan',
        telephone: '0901-404-663',
        email: 'weblink1982@gmail.com',
        sameAs: ['https://github.com/bertwang', 'https://www.youtube.com/@weblink0912']
      },
      person: {
        name: ownerName,
        alternateName: 'Bert Wang',
        jobTitle: 'Desainer Visual / Desainer Web / Pengembang PHP / Sutradara Dokumenter / Pelestari Budaya',
        description: 'Desainer visual Bert Wang dengan 18 tahun pengalaman desain web dan pengembangan PHP. Menggabungkan pelestarian budaya dengan desain merek untuk menciptakan pengalaman digital yang hangat.',
        sameAs: ['https://github.com/bertwang']
      },
      service: {
        name: 'Layanan Desain Web dan Desain Merek',
        description: 'Menyediakan layanan desain web, pengembangan PHP, desain merek, dan produksi video untuk merek Malaysia',
        provider: 'Bert Wang - Weblink'
      }
    },
    author: 'Bert Wang',
    robotsDirective: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  }
};

/**
 * Update document head with SEO metadata
 */
export function updateSEOHead(config: SEOConfig, language: string) {
  // Update title
  document.title = config.title;

  // Update or create meta tags
  const updateMetaTag = (name: string, content: string, property = false) => {
    const attribute = property ? 'property' : 'name';
    let tag = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attribute, name);
      document.head.appendChild(tag);
    }
    tag.content = content;
  };

  // Basic meta tags
  updateMetaTag('description', config.description);
  updateMetaTag('keywords', config.keywords);
  updateMetaTag('language', language);

  // Open Graph tags
  updateMetaTag('og:type', 'website', true);
  updateMetaTag('og:title', config.ogTitle, true);
  updateMetaTag('og:description', config.ogDescription, true);
  updateMetaTag('og:url', config.ogUrl, true);
  updateMetaTag('og:image', config.ogImage, true);

  // Twitter Card tags
  updateMetaTag('twitter:card', 'summary_large_image');
  updateMetaTag('twitter:title', config.twitterTitle);
  updateMetaTag('twitter:description', config.twitterDescription);
  updateMetaTag('twitter:image', config.twitterImage);

  // Update canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = config.canonical;

  // Update hreflang tags
  const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
  existingHreflangs.forEach(tag => tag.remove());

  config.hreflangs.forEach(hreflang => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    (link as any).hreflang = hreflang.lang;
    link.href = hreflang.href;
    document.head.appendChild(link);
  });

  // Update language attribute
  document.documentElement.lang = language;

  // Update structured data
  updateStructuredData(config);
}

/**
 * Update structured data (JSON-LD)
 */
function updateStructuredData(config: SEOConfig) {
  // Remove existing structured data scripts
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: config.structuredData.localBusiness.name,
    image: config.ogImage,
    description: config.structuredData.localBusiness.description,
    telephone: '0901-404-663',
    email: 'weblink1982@gmail.com',
    areaServed: config.structuredData.localBusiness.areaServed,
    address: {
      '@type': 'PostalAddress',
      addressLocality: config.structuredData.localBusiness.areaServed[0],
      addressCountry: config.structuredData.localBusiness.areaServed[0] === '台南市' ? 'TW' : config.structuredData.localBusiness.areaServed[0] === '日本' ? 'JP' : 'MY'
    },
    url: config.canonical
  };

  // Person Schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.structuredData.person.name,
    jobTitle: config.structuredData.person.jobTitle,
    image: config.ogImage,
    description: config.structuredData.person.description,
    url: config.canonical
  };

  // Add LocalBusiness script
  const localBusinessScript = document.createElement('script');
  localBusinessScript.type = 'application/ld+json';
  localBusinessScript.textContent = JSON.stringify(localBusinessSchema);
  document.head.appendChild(localBusinessScript);

  // Add Person script
  const personScript = document.createElement('script');
  personScript.type = 'application/ld+json';
  personScript.textContent = JSON.stringify(personSchema);
  document.head.appendChild(personScript);
}

/**
 * Get language from URL path
 */
export function getLanguageFromPath(pathname: string): string {
  if (pathname.startsWith('/tw')) return 'tw';
  if (pathname.startsWith('/jp')) return 'jp';
  if (pathname.startsWith('/my')) return 'my';
  return 'tw'; // Default to Taiwan
}

/**
 * Get language code for HTML lang attribute
 */
export function getLanguageCode(language: string): string {
  const codes: Record<string, string> = {
    tw: 'zh-TW',
    jp: 'ja',
    my: 'ms'
  };
  return codes[language] || 'zh-TW';
}
