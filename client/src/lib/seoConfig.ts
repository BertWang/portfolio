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
    };
    person: {
      name: string;
      jobTitle: string;
      description: string;
    };
  };
}

const baseUrl = 'https://bertwang.manus.space';
const ownerName = '王純瑋';
const ownerImage = `${baseUrl}/images/IMG_5972.jpeg`;

export const seoConfigs: Record<string, SEOConfig> = {
  tw: {
    title: '台南網頁設計 | PHP 開發 | 王純瑋 - 微波林克',
    description: '18 年台南網頁設計與 PHP 開發經驗。為台灣中小企業創造具有溫度的數位體驗。服務台南、高雄。立即咨詢。',
    keywords: '台南網頁設計, 台南 PHP 開發, 網頁設計, 品牌設計, SEO 優化, 影像創作, 微波林克',
    canonical: `${baseUrl}/tw/`,
    ogTitle: '台南網頁設計 | PHP 開發 | 王純瑋 - 微波林克',
    ogDescription: '18 年台南網頁設計與 PHP 開發經驗。為台灣中小企業創造具有溫度的數位體驗。',
    ogUrl: `${baseUrl}/tw/`,
    ogImage: ownerImage,
    twitterTitle: '台南網頁設計 | PHP 開發 | 王純瑋',
    twitterDescription: '18 年台南網頁設計與 PHP 開發經驗',
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
        description: '18 年台南網頁設計與 PHP 開發經驗，為台灣中小企業創造具有溫度的數位體驗'
      },
      person: {
        name: ownerName,
        jobTitle: '網頁設計師 / PHP 開發者',
        description: '18 年網頁設計與 PHP 開發經驗，專精於台南網頁設計與品牌設計'
      }
    }
  },
  jp: {
    title: 'ウェブデザイン | PHP開発 | 王純瑋 - Weblink',
    description: '18年のウェブデザインとPHP開発の経験。台湾の中小企業のための温かいデジタル体験を作成します。日本全国でサービス提供中。',
    keywords: 'ウェブデザイン, PHP開発, ブランドデザイン, ビデオ制作, SEO最適化, Weblink',
    canonical: `${baseUrl}/jp/`,
    ogTitle: 'ウェブデザイン | PHP開発 | 王純瑋 - Weblink',
    ogDescription: '18年のウェブデザインとPHP開発の経験。台湾の中小企業のための温かいデジタル体験を作成します。',
    ogUrl: `${baseUrl}/jp/`,
    ogImage: ownerImage,
    twitterTitle: 'ウェブデザイン | PHP開発 | 王純瑋',
    twitterDescription: '18年のウェブデザインとPHP開発の経験',
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
        description: '18年のウェブデザインとPHP開発の経験、日本全国でサービス提供中'
      },
      person: {
        name: ownerName,
        jobTitle: 'ウェブデザイナー / PHP開発者',
        description: '18年のウェブデザインとPHP開発の経験、日本のブランド向けカスタムソリューション提供'
      }
    }
  },
  my: {
    title: 'Desain Web | Pengembangan PHP | Bert Wang - Weblink',
    description: '18 tahun pengalaman desain web dan pengembangan PHP. Menciptakan pengalaman digital yang hangat untuk merek lokal Malaysia. Layanan di seluruh Malaysia.',
    keywords: 'Desain Web, Pengembangan PHP, Desain Merek, Produksi Video, Optimasi SEO, Weblink',
    canonical: `${baseUrl}/my/`,
    ogTitle: 'Desain Web | Pengembangan PHP | Bert Wang - Weblink',
    ogDescription: '18 tahun pengalaman desain web dan pengembangan PHP. Menciptakan pengalaman digital yang hangat untuk merek lokal Malaysia.',
    ogUrl: `${baseUrl}/my/`,
    ogImage: ownerImage,
    twitterTitle: 'Desain Web | Pengembangan PHP | Bert Wang',
    twitterDescription: '18 tahun pengalaman desain web dan pengembangan PHP',
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
        description: '18 tahun pengalaman desain web dan pengembangan PHP, layanan di seluruh Malaysia'
      },
      person: {
        name: ownerName,
        jobTitle: 'Desainer Web / Pengembang PHP',
        description: '18 tahun pengalaman desain web dan pengembangan PHP, menyediakan solusi khusus untuk merek Malaysia'
      }
    }
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
