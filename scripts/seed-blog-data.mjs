#!/usr/bin/env node
/**
 * 批量導入部落格文章和案例研究到數據庫
 * 使用方法：node scripts/seed-blog-data.mjs
 */

import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 部落格文章數據
const blogPostsData = [
  {
    titleTw: '台南設計的靈魂：為什麼在地文化是最好的設計靈感',
    titleJp: '台南デザインの魂：なぜローカル文化が最高のデザインインスピレーションなのか',
    titleMy: 'Jiwa Desain Tainan: Mengapa Budaya Lokal adalah Inspirasi Desain Terbaik',
    slugTw: 'tainan-design-soul',
    slugJp: 'tainan-design-soul',
    slugMy: 'tainan-design-soul',
    excerptTw: '當我在 2004 年開始從事網頁設計時，我面臨了一個根本性的問題：如何為台南的企業創造真正具有差異化的設計？',
    excerptJp: '2004年にウェブデザインを始めたとき、私は根本的な問題に直面しました：台南の企業のために本当に差別化されたデザインをどのように作成するのか？',
    excerptMy: 'Ketika saya mulai melakukan desain web pada tahun 2004, saya menghadapi pertanyaan mendasar: bagaimana cara membuat desain yang benar-benar terdiferensiasi untuk perusahaan Tainan?',
    contentTw: '# 台南設計的靈魂\n\n當我在 2004 年開始從事網頁設計時，我面臨了一個根本性的問題：如何為台南的企業創造真正具有差異化的設計？\n\n## 在地文化的力量\n\n台南是台灣最古老的城市，擁有 400 年的歷史文化。赤嵌樓、祀典武廟、大天后宮——這些古蹟不只是觀光景點，更是我設計靈感的寶庫。\n\n## 設計的溫度\n\n好的設計不只是美觀，更要有溫度。我用台南的文化故事、在地的人文情感，為每一個品牌創造獨特的視覺語言。',
    contentJp: '# 台南デザインの魂\n\n2004年にウェブデザインを始めたとき、私は根本的な問題に直面しました：台南の企業のために本当に差別化されたデザインをどのように作成するのか？\n\n## ローカル文化の力\n\n台南は台湾最古の都市で、400年の歴史文化を持っています。赤嵌樓、祀典武廟、大天后宮——これらの古蹟は単なる観光地ではなく、私のデザインインスピレーションの宝庫です。\n\n## デザインの温かさ\n\n良いデザインは美しいだけでなく、温かさを持つ必要があります。台南の文化物語とローカルの人文的感情を使って、各ブランドのための独特なビジュアル言語を作成しています。',
    contentMy: '# Jiwa Desain Tainan\n\nKetika saya mulai melakukan desain web pada tahun 2004, saya menghadapi pertanyaan mendasar: bagaimana cara membuat desain yang benar-benar terdiferensiasi untuk perusahaan Tainan?\n\n## Kekuatan Budaya Lokal\n\nTainan adalah kota tertua di Taiwan dengan sejarah budaya 400 tahun. Chihkan Tower, Confucius Temple, Mazu Temple——situs-situs bersejarah ini bukan hanya tempat wisata, tetapi juga harta karun inspirasi desain saya.\n\n## Kehangatan Desain\n\nDesain yang baik tidak hanya indah, tetapi juga harus memiliki kehangatan. Saya menggunakan cerita budaya Tainan dan sentimen kemanusiaan lokal untuk menciptakan bahasa visual yang unik untuk setiap merek.',
    categoryTw: '台南設計',
    categoryJp: '台南デザイン',
    categoryMy: 'Desain Tainan',
    tagsTw: JSON.stringify(['台南設計', '在地文化', '品牌設計']),
    tagsJp: JSON.stringify(['台南デザイン', 'ローカル文化', 'ブランドデザイン']),
    tagsMy: JSON.stringify(['Desain Tainan', 'Budaya Lokal', 'Desain Merek']),
    keywordsTw: '台南設計、在地文化、品牌設計、視覺識別、文化設計',
    keywordsJp: '台南デザイン、ローカル文化、ブランドデザイン、ビジュアルアイデンティティ、文化デザイン',
    keywordsMy: 'Desain Tainan, Budaya Lokal, Desain Merek, Identitas Visual, Desain Budaya',
    authorName: '王純瑋',
    viewCount: 0,
    isPublished: 1,
    publishedAt: new Date('2026-06-02'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    titleTw: '從古蹟到現代：台南文化地景的視覺轉譯',
    titleJp: '古蹟から現代へ：台南文化景観のビジュアル翻訳',
    titleMy: 'Dari Warisan Bersejarah ke Modern: Terjemahan Visual Lanskap Budaya Tainan',
    slugTw: 'ancient-to-modern',
    slugJp: 'ancient-to-modern',
    slugMy: 'ancient-to-modern',
    excerptTw: '台南的古蹟不僅是歷史的見證，更是當代設計的寶藏。赤嵌樓、祀典武廟、大天后宮——這些建築承載了台南 400 年的文化記憶。',
    excerptJp: '台南の古蹟は単なる歷史の証人ではなく、現代デザインの宝物です。赤嵌樓、祀典武廟、大天后宮——これらの建造物は台南の400年の文化記憶を担っています。',
    excerptMy: 'Situs bersejarah Tainan bukan hanya saksi sejarah, tetapi juga harta karun desain kontemporer. Chihkan Tower, Confucius Temple, Mazu Temple——bangunan-bangunan ini membawa memori budaya 400 tahun Tainan.',
    contentTw: '# 從古蹟到現代\n\n台南的古蹟不僅是歷史的見證，更是當代設計的寶藏。赤嵌樓、祀典武廟、大天后宮——這些建築承載了台南 400 年的文化記憶。\n\n## 古蹟的視覺語言\n\n每一個古蹟都有獨特的建築風格和文化內涵。我的工作就是將這些古蹟的視覺特徵轉譯到現代設計中。\n\n## 文化保存與設計的結合\n\n透過設計，我們可以讓古蹟的故事被更多人看見、被更多人理解。這不只是設計，更是文化保存的一種方式。',
    contentJp: '# 古蹟から現代へ\n\n台南の古蹟は単なる歷史の証人ではなく、現代デザインの宝物です。赤嵌樓、祀典武廟、大天后宮——これらの建造物は台南の400年の文化記憶を担っています。\n\n## 古蹟のビジュアル言語\n\n各古蹟は独特の建築様式と文化的意味を持っています。私の仕事は、これらの古蹟のビジュアル特性を現代デザインに翻訳することです。\n\n## 文化保存とデザインの結合\n\nデザインを通じて、古蹟の物語をより多くの人に見てもらい、理解してもらうことができます。これは単なるデザインではなく、文化保存の一形態です。',
    contentMy: '# Dari Warisan Bersejarah ke Modern\n\nSitus bersejarah Tainan bukan hanya saksi sejarah, tetapi juga harta karun desain kontemporer. Chihkan Tower, Confucius Temple, Mazu Temple——bangunan-bangunan ini membawa memori budaya 400 tahun Tainan.\n\n## Bahasa Visual Warisan Bersejarah\n\nSetiap situs bersejarah memiliki gaya arsitektur unik dan makna budaya. Pekerjaan saya adalah menerjemahkan fitur visual situs-situs bersejarah ini ke dalam desain modern.\n\n## Kombinasi Pelestarian Budaya dan Desain\n\nMelalui desain, kita dapat membuat cerita warisan bersejarah dilihat dan dipahami oleh lebih banyak orang. Ini bukan hanya desain, tetapi juga bentuk pelestarian budaya.',
    categoryTw: '台南設計',
    categoryJp: '台南デザイン',
    categoryMy: 'Desain Tainan',
    tagsTw: JSON.stringify(['古蹟設計', '文化景觀', '視覺轉譯']),
    tagsJp: JSON.stringify(['古蹟デザイン', '文化景観', 'ビジュアル翻訳']),
    tagsMy: JSON.stringify(['Desain Warisan', 'Lanskap Budaya', 'Terjemahan Visual']),
    keywordsTw: '古蹟設計、文化景觀、視覺轉譯、台南古蹟、設計靈感',
    keywordsJp: '古蹟デザイン、文化景観、ビジュアル翻訳、台南古蹟、デザインインスピレーション',
    keywordsMy: 'Desain Warisan, Lanskap Budaya, Terjemahan Visual, Situs Bersejarah Tainan, Inspirasi Desain',
    authorName: '王純瑋',
    viewCount: 0,
    isPublished: 1,
    publishedAt: new Date('2026-06-02'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    titleTw: '台南中小企業的品牌困境：如何用設計突圍',
    titleJp: '台南中小企業のブランド困難：デザインで突破する方法',
    titleMy: 'Dilema Merek UKM Tainan: Cara Terobosan dengan Desain',
    slugTw: 'sme-branding-breakthrough',
    slugJp: 'sme-branding-breakthrough',
    slugMy: 'sme-branding-breakthrough',
    excerptTw: '在過去 18 年的設計工作中，我接觸了數百家台南的中小企業。每一次初次咨詢，我都會聽到類似的故事：「我們的產品很好，但為什麼客戶不知道我們？」',
    excerptJp: '過去18年のデザイン業務では、台南の数百の中小企業と関わってきました。初回相談のたびに、同じような話を聞きます：「私たちの製品は良いですが、なぜ顧客は私たちを知らないのですか？」',
    excerptMy: 'Dalam 18 tahun terakhir bekerja di bidang desain, saya telah berinteraksi dengan ratusan UKM Tainan. Setiap kali konsultasi awal, saya mendengar cerita serupa: \"Produk kami bagus, tetapi mengapa pelanggan tidak mengenal kami?\"',
    contentTw: '# 台南中小企業的品牌困境\n\n在過去 18 年的設計工作中，我接觸了數百家台南的中小企業。每一次初次咨詢，我都會聽到類似的故事：「我們的產品很好，但為什麼客戶不知道我們？」\n\n## 品牌困境的根源\n\n許多中小企業的困境不在於產品品質，而在於品牌表達。他們沒有清晰的視覺識別、沒有一致的品牌聲音、沒有有效的市場定位。\n\n## 用設計突圍\n\n透過專業的品牌設計，我幫助這些企業找到自己的品牌聲音，建立清晰的視覺識別，最終在市場中脫穎而出。',
    contentJp: '# 台南中小企業のブランド困難\n\n過去18年のデザイン業務では、台南の数百の中小企業と関わってきました。初回相談のたびに、同じような話を聞きます：「私たちの製品は良いですが、なぜ顧客は私たちを知らないのですか？」\n\n## ブランド困難の根源\n\n多くの中小企業の困難は製品品質にではなく、ブランド表現にあります。明確なビジュアルアイデンティティ、一貫したブランドボイス、効果的な市場ポジショニングがありません。\n\n## デザインで突破する\n\nプロフェッショナルなブランドデザインを通じて、これらの企業が自分たちのブランドボイスを見つけ、明確なビジュアルアイデンティティを確立し、最終的に市場で際立つのを支援しています。',
    contentMy: '# Dilema Merek UKM Tainan\n\nDalam 18 tahun terakhir bekerja di bidang desain, saya telah berinteraksi dengan ratusan UKM Tainan. Setiap kali konsultasi awal, saya mendengar cerita serupa: \"Produk kami bagus, tetapi mengapa pelanggan tidak mengenal kami?\"\n\n## Akar Dilema Merek\n\nDilema banyak UKM bukan terletak pada kualitas produk, tetapi pada ekspresi merek. Mereka tidak memiliki identitas visual yang jelas, tidak memiliki suara merek yang konsisten, tidak memiliki positioning pasar yang efektif.\n\n## Terobosan dengan Desain\n\nMelalui desain merek profesional, saya membantu perusahaan-perusahaan ini menemukan suara merek mereka sendiri, membangun identitas visual yang jelas, dan akhirnya menonjol di pasar.',
    categoryTw: '台南設計',
    categoryJp: '台南デザイン',
    categoryMy: 'Desain Tainan',
    tagsTw: JSON.stringify(['中小企業', '品牌設計', '視覺識別']),
    tagsJp: JSON.stringify(['中小企業', 'ブランドデザイン', 'ビジュアルアイデンティティ']),
    tagsMy: JSON.stringify(['UKM', 'Desain Merek', 'Identitas Visual']),
    keywordsTw: '中小企業品牌、品牌設計、視覺識別、台南企業、品牌困境',
    keywordsJp: '中小企業ブランド、ブランドデザイン、ビジュアルアイデンティティ、台南企業、ブランド困難',
    keywordsMy: 'Merek UKM, Desain Merek, Identitas Visual, Perusahaan Tainan, Dilema Merek',
    authorName: '王純瑋',
    viewCount: 0,
    isPublished: 1,
    publishedAt: new Date('2026-06-02'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// 案例研究數據
let caseStudiesData = [];
try {
  const caseStudiesPath = path.join(__dirname, '../case-studies-data.json');
  if (fs.existsSync(caseStudiesPath)) {
    caseStudiesData = JSON.parse(fs.readFileSync(caseStudiesPath, 'utf-8'));
  }
} catch (error) {
  console.warn('⚠️  無法讀取案例研究數據：', error.message);
}

async function seedBlogPosts(connection) {
  console.log('🌱 開始導入部落格文章...\n');
  
  try {
    for (const post of blogPostsData) {
      // 檢查是否已存在
      const [existing] = await connection.execute(
        'SELECT id FROM blogPosts WHERE slugTw = ?',
        [post.slugTw]
      );
      
      if (existing.length === 0) {
        await connection.execute(
          `INSERT INTO blogPosts (
            titleTw, titleJp, titleMy, slugTw, slugJp, slugMy,
            excerptTw, excerptJp, excerptMy,
            contentTw, contentJp, contentMy,
            categoryTw, categoryJp, categoryMy,
            tagsTw, tagsJp, tagsMy,
            keywordsTw, keywordsJp, keywordsMy,
            authorName, viewCount, isPublished, publishedAt, createdAt, updatedAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            post.titleTw, post.titleJp, post.titleMy,
            post.slugTw, post.slugJp, post.slugMy,
            post.excerptTw, post.excerptJp, post.excerptMy,
            post.contentTw, post.contentJp, post.contentMy,
            post.categoryTw, post.categoryJp, post.categoryMy,
            post.tagsTw, post.tagsJp, post.tagsMy,
            post.keywordsTw, post.keywordsJp, post.keywordsMy,
            post.authorName, post.viewCount, post.isPublished,
            post.publishedAt, post.createdAt, post.updatedAt
          ]
        );
        console.log(`✓ 已導入：${post.titleTw}`);
      } else {
        console.log(`⊘ 已存在：${post.titleTw}`);
      }
    }
    
    console.log('\n✅ 部落格文章導入完成！\n');
  } catch (error) {
    console.error('❌ 部落格文章導入失敗：', error);
    throw error;
  }
}

async function seedCaseStudies(connection) {
  if (caseStudiesData.length === 0) {
    console.log('⊘ 無案例研究數據可導入\n');
    return;
  }

  console.log('🌱 開始導入案例研究...\n');
  
  try {
    for (const study of caseStudiesData) {
      // 檢查是否已存在
      const [existing] = await connection.execute(
        'SELECT id FROM caseStudies WHERE slug = ?',
        [study.slug]
      );
      
      if (existing.length === 0) {
        await connection.execute(
          `INSERT INTO caseStudies (
            titleTw, titleJp, titleMy, slug,
            excerptTw, excerptJp, excerptMy,
            challengeTw, challengeJp, challengeMy,
            solutionTw, solutionJp, solutionMy,
            resultTw, resultJp, resultMy,
            techStackTw, techStackJp, techStackMy,
            categoryTw, categoryJp, categoryMy,
            authorName, viewCount, isPublished, publishedAt, createdAt, updatedAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            study.titleTw, study.titleJp, study.titleMy, study.slug,
            study.excerptTw, study.excerptJp, study.excerptMy,
            study.challengeTw, study.challengeJp, study.challengeMy,
            study.solutionTw, study.solutionJp, study.solutionMy,
            study.resultTw, study.resultJp, study.resultMy,
            study.techStackTw, study.techStackJp, study.techStackMy,
            study.categoryTw, study.categoryJp, study.categoryMy,
            study.authorName, study.viewCount, study.isPublished,
            study.publishedAt, study.createdAt, study.updatedAt
          ]
        );
        console.log(`✓ 已導入：${study.titleTw}`);
      } else {
        console.log(`⊘ 已存在：${study.titleTw}`);
      }
    }
    
    console.log('\n✅ 案例研究導入完成！\n');
  } catch (error) {
    console.error('❌ 案例研究導入失敗：', error);
    throw error;
  }
}

async function main() {
  console.log('================================================================================');
  console.log('部落格和案例研究數據導入腳本');
  console.log('================================================================================\n');
  
  let connection;
  try {
    // 連接到數據庫
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'bert_wang_portfolio',
    });

    console.log('✓ 已連接到數據庫\n');
    
    await seedBlogPosts(connection);
    await seedCaseStudies(connection);
    
    console.log('================================================================================');
    console.log('✅ 所有數據導入完成！');
    console.log('================================================================================');
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ 導入過程中出現錯誤：', error);
    if (connection) {
      await connection.end();
    }
    process.exit(1);
  }
}

main();
