// 王純瑋個人資料整合網站數據結構

export interface CareerEntry {
  year: string;
  title: string;
  company: string;
  description: string;
  skills?: string[];
}

export interface DocumentaryProject {
  id: string;
  title: string;
  year: number;
  category: string;
  description: string;
  award?: string;
  image: string;
  links?: {
    label: string;
    url: string;
  }[];
}

export interface SpiritualPractice {
  id: string;
  title: string;
  description: string;
  image: string;
  content: string;
}

export interface AyurvedicContribution {
  id: string;
  title: string;
  description: string;
  image: string;
  role: string;
  impact: string;
}

// 職涯數據
export const careerTimeline: CareerEntry[] = [
  {
    year: "2024",
    title: "PHP 工程師",
    company: "全球儀器科技股份有限公司",
    description: "6年資深 PHP 開發經驗，負責網站系統架構與維護。",
    skills: ["PHP", "MySQL", "Web Development"],
  },
  {
    year: "2018-2024",
    title: "網站程式設計師",
    company: "房地王、意匠互動媒體",
    description: "10年網頁開發經驗，涵蓋前後端技術與系統整合。",
    skills: ["HTML/CSS", "JavaScript", "Database Design"],
  },
  {
    year: "2014-2018",
    title: "數位美工設計師",
    company: "里揚國際、gmoney 遊戲網",
    description: "早期職涯從平面設計與數位美工起步，建立視覺設計基礎。",
    skills: ["Graphic Design", "UI Design", "Digital Art"],
  },
];

// 紀錄片與文史項目
export const documentaryProjects: DocumentaryProject[] = [
  {
    id: "nan-ke-yi-meng",
    title: "南蚵一夢",
    year: 2017,
    category: "環境生態",
    description: "記錄台南海岸線嚴重的蚵架與保麗龍廢棄物問題，呼籲對海洋資源的永續關懷。",
    award: "2017 神腦原鄉踏查紀錄片競賽「環境生態特別獎」",
    image: "/images/documentary-hero.jpg",
    links: [
      {
        label: "觀看影片",
        url: "https://www.youtube.com/results?search_query=%E5%8D%97%E8%9B%B5%E4%B8%80%E5%A4%A2",
      },
    ],
  },
  {
    id: "yan-nan-fei",
    title: "雁難飛",
    year: 2014,
    category: "文化保存",
    description: "聚焦台南「飛雁新村」的文史保存爭議，記錄日治軍事遺跡與老樹在都市開發下的困境。",
    award: "2014 神腦紀錄片競賽社會組「佳作」",
    image: "/images/documentary-hero.jpg",
    links: [
      {
        label: "了解更多",
        url: "#",
      },
    ],
  },
];

// 身心靈探索
export const spiritualPractices: SpiritualPractice[] = [
  {
    id: "zero-limit",
    title: "零極限（Ho'oponopono）",
    description: "夏威夷傳統療法，透過四句真言實踐內在清理與和諧。",
    image: "/images/spiritual-meditation.jpg",
    content: `「零極限」源自夏威夷傳統療法「荷歐波諾波諾」，其核心在於「百分之百的責任」與「持續的清理」。
    
透過四句真言——「對不起、請原諒我、謝謝你、我愛你」——我們可以清理潛意識中的負面記憶，回歸到「零」的空無狀態，從而接收神性的啟發。

這套哲學深刻影響了我的數位化工作倫理，將枯燥的技術勞動昇華為一場靈性的修行。`,
  },
  {
    id: "meditation-practice",
    title: "靜坐與冥想實踐",
    description: "透過日常冥想探索內在平靜與心靈連結。",
    image: "/images/spiritual-meditation.jpg",
    content: `靜坐是我日常實踐的核心。透過規律的冥想，我學會了在喧鬧世界中尋找「細微溫度」。
    
這份內在的平靜反映在我的所有創作中——無論是影像紀錄還是數位設計，都帶著一份沉靜與人文關懷。`,
  },
  {
    id: "spiritual-rituals",
    title: "靈性儀式參與",
    description: "積極參與可可儀式等集體療癒活動，擔任助教角色。",
    image: "/images/spiritual-meditation.jpg",
    content: `我積極參與並擔任「可可儀式」與「鼻咽儀式」的助教，將靈性探索轉化為具體的集體療癒行動。
    
在儀式中運用「小缽」等音療工具，並結合風、火、水、土等自然元素香料進行能量調整，幫助參與者達成身心平衡。`,
  },
];

// 阿育吠陀貢獻
export const ayurvedicContributions: AyurvedicContribution[] = [
  {
    id: "chu-notes-digitization",
    title: "朱婕老師阿育吠陀筆記數位化",
    description: "將朱婕老師多年積累的珍貴手稿與研究筆記進行掃描、整理與數位化。",
    image: "/images/ayurveda-knowledge.jpg",
    role: "弟子與技術協助者",
    impact: "建立了台灣首個系統化的阿育吠陀知識數位文獻庫，確保古老智慧得以永續傳承。",
  },
  {
    id: "ayurveda-website",
    title: "阿育吠陀筆記分享網站",
    description: "親自架設並維護 bertwang.github.io/ayurveda_vaidya/ 網站，提供免費的阿育吠陀知識資源。",
    image: "/images/ayurveda-knowledge.jpg",
    role: "網站開發與內容整理",
    impact: "為全球有緣人提供了高品質的阿育吠陀學習資源，實踐『愛的分享』理念。",
  },
  {
    id: "knowledge-preservation",
    title: "文化遺產保存",
    description: "透過數位化手段，確保朱婕老師的靈性遺產不因其病逝而散佚。",
    image: "/images/ayurveda-knowledge.jpg",
    role: "文化守護者",
    impact: "將私密筆記轉化為公共知識，體現了數位時代下知識傳承的新模式。",
  },
];

// 服務項目
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "web-design",
    title: "網站設計",
    description: "從概念到完成的全面網站設計服務，包括 UI/UX 設計、響應式設計、品牌視覺識別。",
    icon: "🎨",
  },
  {
    id: "web-php",
    title: "網站 PHP 程式",
    description: "18年 PHP 開發經驗，提供後端系統開發、數據庫設計、API 整合等專業服務。",
    icon: "💻",
  },
  {
    id: "seo",
    title: "網站 SEO",
    description: "搜尋引擎優化服務，提升網站排名與流量，包括技術 SEO、內容優化、關鍵詞策略。",
    icon: "🔍",
  },
  {
    id: "video-edit",
    title: "影片剪輯",
    description: "專業影片剪輯服務，包括紀錄片製作、社群媒體影片、宣傳片等多種類型。",
    icon: "✂️",
  },
  {
    id: "video-shoot",
    title: "影片拍攝",
    description: "專業影片拍攝服務，包括企業宣傳片、紀錄片、活動記錄等高品質視頻製作。",
    icon: "🎬",
  },
];

// 作品集
export interface Portfolio {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
}

export const portfolioWorks: Portfolio[] = [
  {
    id: "chilips",
    title: "CHILIPS 電子鎖品牌設計",
    category: "品牌設計",
    description: "電子鎖品牌的完整視覺識別系統設計，包括 Logo、網站設計、行銷物料。",
    image: "/images/design-1.jpg",
  },
  {
    id: "warm-home",
    title: "溫ㄟ宅修 家修服務網站",
    category: "網站設計 & PHP 程式",
    description: "家修服務平台的網站設計與後端系統開發，包括預約系統、客戶管理、支付整合。",
    image: "/images/design-2.jpg",
  },
  {
    id: "soyui-coffee",
    title: "SOYUI COFFEE 品牌設計",
    category: "品牌設計",
    description: "咖啡品牌的完整視覺識別設計，包括包裝設計、店面視覺、社群媒體素材。",
    image: "/images/design-3.jpg",
  },
];

// 個人簡介
export const personalInfo = {
  name: "王純瑋",
  englishName: "Bert Wang",
  alias: "微波林克 (Weblink)",
  tagline: "在喧鬧世界裡尋找細微溫度的影像創作者",
  phone: "0901404663",
  bio: `王純瑋是一位跨領域的專業人士，擁有約18-19年的資歷。他的職涯從美術設計轉向網頁技術開發，同時深耕於文史保存、影像紀錄與靈性探索。

作為「微波林克」，他透過影像創作與社群參與，為台南的文化保存與社會議題發聲。同時，他也是阿育吠陀知識的重要傳承者，將朱婕老師的智慧數位化並分享予世人。

他的所有工作都圍繞著一個核心理念：「技術服務於靈性」，致力於透過數位手段修補受眾破碎的情感，在喧囂的社會運動中尋找那一抹「細微的溫度」。

**現正開放接案**，歡迎洽詢網站設計、PHP 程式開發、SEO 優化、影片剪輯與拍攝等服務。`,
  location: "台南",
  email: "weblink1982@gmail.com",
  socialLinks: [
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@weblink0912",
      label: "微波林克頻道",
    },
    {
      platform: "Threads",
      url: "https://www.threads.net/@relaxsoul325",
      label: "身心靈探索",
    },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/bertwang00",
      label: "個人頁面",
    },
    {
      platform: "104人力銀行",
      url: "https://profile.104.com.tw/profile/fba58574-31c9-4bae-a488-a8b25e5c13b7/about",
      label: "職涯履歷",
    },
  ],
};
