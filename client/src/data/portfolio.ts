// 王純瑋接案平台 - 完整數據結構

export interface PortfolioProject {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string;
  image: string;
  website: string;
  link: string;
  description: string;
  challenge: string;
  solution: string;
  highlights: string[];
  testimonial: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  details: string;
}

export interface Documentary {
  id: string;
  title: string;
  year: number;
  award: string;
  description: string;
  youtubeId: string;
  videoUrl: string;
  awardLink?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
}

// 服務項目
export const services: Service[] = [
  {
    id: "web-design",
    name: "網站設計",
    description: "品牌官網、故事敘事、互動體驗設計。從天喜の記憶到 SOYUI COFFEE，每個設計都在守護一份溫度。",
    icon: "🎨",
    details: "響應式設計、品牌故事整合、用戶體驗優化",
  },
  {
    id: "php-dev",
    name: "網站PHP程式",
    description: "後端系統開發、資料庫設計、API 整合。18年 PHP 開發經驗，為您的網站提供穩定的技術基礎。",
    icon: "⚙️",
    details: "PHP 開發、MySQL 資料庫、系統架構設計",
  },
  {
    id: "seo",
    name: "網站SEO",
    description: "搜尋引擎優化、關鍵詞策略、內容行銷。讓您的品牌故事被更多人看見。",
    icon: "🔍",
    details: "關鍵詞研究、頁面優化、內容策略規劃",
  },
  {
    id: "video-edit",
    name: "影片剪輯",
    description: "紀錄片製作、敘事影像、感性 MV。用影像記錄生命中的細微溫度。",
    icon: "🎬",
    details: "紀錄片剪輯、色彩分級、音樂整合",
  },
  {
    id: "video-shoot",
    name: "影片拍攝",
    description: "品牌紀錄、文史保存、社區影像。透過鏡頭捕捉被遺忘的故事。",
    icon: "📹",
    details: "品牌紀錄、文史影像、社區紀錄片",
  },
];

// 作品集
export const portfolio: PortfolioProject[] = [
  {
    id: "skylark",
    name: "天喜の記憶",
    title: "天喜の記憶",
    subtitle: "Brand Memory Archive",
    tagline: "品牌記憶庫 × 文化數位保存",
    category: "品牌故事設計",
    image: "/images/skylark-cover.jpg",
    website: "https://skylark.tw/",
    link: "https://skylark.tw/",
    description: "天喜旅行社在 1990 年至 2014 年間，陪伴了無數家庭走過人生的重要風景。創辦人郭正利對每位客戶的細心照顧——記得他們不吃生魚片、喜歡靠窗座位、母親行動不便需要靠近電梯的房型——這份被記得的溫度，本應隨著時間消散。但王純瑋用設計改變了這一切。",
    challenge: "如何將一個已結束的品牌轉化為『記憶庫』而非『懷舊網站』？如何讓訪客感受到 30 年來積累的信任與溫度？",
    solution: "採用日式美學與台灣文化融合的視覺語言，透過五個導航主題（序、源、跡、憶、願）引導訪客進入時間的河流。首頁的手寫筆記、老照片、溫暖色調，營造出『翻開一本泛黃日記』的感受。",
    highlights: [
      "日式美學 × 台灣文化融合",
      "手寫筆記與老照片整合",
      "創辦人採訪錄音嵌入",
      "訪客留言互動區",
    ],
    testimonial: "天喜旅行社已經結束營業，但郭先生對客戶的那份溫柔從未消失。王純瑋用網站把這份溫度永久保存了下來。他不是在做一個網站，而是在守護一個時代的記憶。",
  },
  {
    id: "soyui",
    name: "SOYUI COFFEE",
    title: "SOYUI COFFEE",
    subtitle: "Specialty Coffee Brand",
    tagline: "精品咖啡品牌官網 × 商業轉化設計",
    category: "品牌官網",
    image: "/images/soyui-cover.jpg",
    website: "https://suoyicoffee.com/",
    link: "https://suoyicoffee.com/",
    description: "所以咖啡從高雄的一台餐車起家，如今已展店至台南，成為在地精品咖啡的代表。但創辦人面臨的挑戰是：如何在官網上同時呈現『品牌故事』、『菜單展示』、『門市資訊』與『加盟方案』，而不讓頁面顯得雜亂？",
    challenge: "品牌角色『所咪』的擬人化如何不顯得廉價？『平價但不妥協』的理念如何在視覺上體現？加盟方案的複雜信息如何清晰呈現？",
    solution: "採用綠色與棕色的溫暖色系，呼應咖啡的自然屬性。品牌角色『所咪』的故事成為整個網站的靈魂。菜單、門市、加盟方案被組織成三個清晰的用戶旅程。",
    highlights: [
      "品牌角色『所咪』擬人化",
      "Google 地圖門市整合",
      "加盟方案對比表格",
      "線上菜單與預約系統",
    ],
    testimonial: "王純瑋不只是設計師，他是品牌故事的翻譯家。我們想表達『平價但不妥協』的理念，他卻理解得比我們還深。網站上線後，客戶們說『這個官網讓我更喜歡所以咖啡了』。",
  },
  {
    id: "openlock",
    name: "OpenLock 強匠鎖店",
    title: "OpenLock 強匠鎖店",
    subtitle: "24H Emergency Locksmith Service",
    tagline: "緊急服務官網 × 信任建構設計",
    category: "服務型網站",
    image: "/images/openlock-cover.jpg",
    website: "https://bertwang.github.io/openlock/",
    link: "https://bertwang.github.io/openlock/",
    description: "強匠鎖店在高雄在地經營 10 年，提供 24H 緊急開鎖、汽車晶片鑰匙、電子鎖安裝等服務。但在線上，他們面臨的問題是：如何在短短幾秒內讓驚慌失措的訪客相信『我們能幫助你』？",
    challenge: "如何在緊急服務的語境中傳達『專業』與『信任』？如何讓複雜的服務分類變得一目了然？",
    solution: "首頁採用紅色（緊急感）與綠色（安心感）的對比，立即傳達『我們隨時準備幫助你』的信息。『鎖不開不收錢』的承諾被放在最醒目的位置。",
    highlights: [
      "紅綠對比的視覺設計",
      "一鍵撥號功能",
      "Google 評價實時展示",
      "高雄服務地圖整合",
    ],
    testimonial: "在最急的時候看到這個網站，清楚的資訊和快速的聯絡方式讓我很放心。專業、透明、可信任。",
  },
  {
    id: "wenwei",
    name: "溫ㄟ宅修",
    title: "溫ㄟ宅修",
    subtitle: "Home Repair & Craftsmanship",
    tagline: "職人服務官網 × 故事敘事設計",
    category: "職人服務",
    image: "/images/wenwei-cover.jpg",
    website: "https://bertwang.github.io/home_repair/",
    link: "https://bertwang.github.io/home_repair/",
    description: "黃宸恩是台南的泥作職人，師承阿公，秉持『做土水，不能騙人』的信念從事房屋修繕工作。在線上，他需要一個能傳達『職人精神』的官網，讓客戶在預約前就能感受到他的專業與誠懇。",
    challenge: "如何用設計傳達『職人精神』的無形價值？如何讓修繕案例展示得既專業又溫暖？",
    solution: "採用黑白攝影的高級感，每張修繕案例照片都像藝術作品。首頁的核心故事『修繕，是為了延續生活的溫度』將商業服務提升為生活哲學。",
    highlights: [
      "黑白攝影美學",
      "Before/After 對比功能",
      "LINE 免費估價整合",
      "案例詳細說明",
    ],
    testimonial: "看到官網就決定找黃師傅了。設計很用心，能感受到職人的誠懇。修繕完成後，房子不只修好了，還感受到了溫度。",
  },
];

// 紀錄片
export const documentaries: Documentary[] = [
  {
    id: "south-oyster",
    title: "南蚵一夢",
    year: 2017,
    award: "2017 神腦原鄉踏查紀錄片競賽 - 環境生態特別獎",
    description: "記錄台南海岸線嚴重的蚵架與保麗龍廢棄物問題。片名取自『南柯一夢』的諧音，諷刺人類對海洋資源的過度開發最終可能只是一場空。",
    youtubeId: "DYvdqj_Rx9U",
    videoUrl: "https://www.youtube.com/embed/DYvdqj_Rx9U",
    awardLink: "https://www.senao.org.tw/blogs/award/2017-%E7%A4%BE%E6%9C%83%E7%B5%84-%E7%92%B0%E5%A2%83%E7%94%9F%E6%85%8B%E7%89%B9%E5%88%A5%E7%8D%8E-%E5%8D%97%E8%9A%B5%E4%B8%80%E5%A4%A2",
  },
  {
    id: "geese-difficult-fly",
    title: "雁難飛",
    year: 2014,
    award: "2014 神腦紀錄片競賽 - 社會組佳作",
    description: "聚焦台南『飛雁新村』的文史保存爭議，記錄日治軍事遺跡與老樹在都市開發下的困境。",
    youtubeId: "rPZAgZxxEHo",
    videoUrl: "https://www.youtube.com/embed/rPZAgZxxEHo",
  },
];

// 客戶評價
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "SOYUI COFFEE 創辦人",
    role: "品牌創辦人",
    rating: 5,
    text: "王純瑋不只是設計師，他是品牌故事的翻譯家。我們想表達『平價但不妥協』的理念，他卻理解得比我們還深。從色系選擇到每個按鈕的文案，都能感受到他對『溫度』的執著。網站上線後，客戶們說『這個官網讓我更喜歡所以咖啡了』，這就是最好的評價。",
  },
  {
    id: "testimonial-2",
    name: "天喜の記憶記憶守護團隊",
    role: "記憶保存團隊",
    rating: 5,
    text: "天喜旅行社已經結束營業，但郭先生對客戶的那份溫柔從未消失。王純瑋用網站把這份溫度永久保存了下來。他不是在做一個網站，而是在守護一個時代的記憶。每次看到訪客在留言區分享他們與天喜的故事，我就知道王的設計有多成功。",
  },
  {
    id: "testimonial-3",
    name: "溫ㄟ宅修客戶",
    role: "房屋修繕客戶",
    rating: 5,
    text: "看到官網就決定找黃師傅了。設計很用心，能感受到職人的誠懇。修繕完成後，房子不只修好了，還感受到了溫度。",
  },
];

// 個人資訊
export const personalInfo = {
  name: "王純瑋",
  englishName: "Bert Wang",
  alias: "微波林克 (Weblink)",
  title: "網頁設計師 × 文史保存者 × 靈性創作者",
  subtitle: "在喧鬧世界裡尋找細微溫度的影像創作者",
  phone: "0901404663",
  email: "weblink1982@gmail.com",
  location: "台南",
  bio: "18年資歷的網頁設計師，擅長品牌故事設計、文史保存、影像創作。透過『溫度』、『記憶』、『故事』三大核心理念，為客戶打造具備靈魂的數位體驗。",
  image: "/images/personal-photo.jpg",
};

// CTA 文案
export const ctaText = {
  primary: "立即接案",
  secondary: "查看服務",
  contact: "聯絡我們",
  viewPortfolio: "查看完整作品集",
  callNow: "立即撥號",
  sendEmail: "寄送郵件",
};
