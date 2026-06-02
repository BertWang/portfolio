#!/usr/bin/env node
/**
 * 批量導入部落格文章和案例研究到數據庫
 * 使用方法：node scripts/seed-blog-data.mjs
 */

import { db } from '../server/db.ts';
import { blogPosts, caseStudies } from '../drizzle/schema.ts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
    contentTw: '# 台南設計的靈魂...',
    contentJp: '# 台南デザインの魂...',
    contentMy: '# Jiwa Desain Tainan...',
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
    isPublished: true,
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
    excerptJp: '台南の古蹟は単なる歴史の証人ではなく、現代デザインの宝物です。赤嵌樓、祀典武廟、大天后宮——これらの建造物は台南の400年の文化記憶を担っています。',
    excerptMy: 'Situs bersejarah Tainan bukan hanya saksi sejarah, tetapi juga harta karun desain kontemporer. Chihkan Tower, Confucius Temple, Mazu Temple——bangunan-bangunan ini membawa memori budaya 400 tahun Tainan.',
    contentTw: '# 從古蹟到現代...',
    contentJp: '# 古蹟から現代へ...',
    contentMy: '# Dari Warisan Bersejarah ke Modern...',
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
    isPublished: true,
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
    contentTw: '# 台南中小企業的品牌困境...',
    contentJp: '# 台南中小企業のブランド困難...',
    contentMy: '# Dilema Merek UKM Tainan...',
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
    isPublished: true,
    publishedAt: new Date('2026-06-02'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// 案例研究數據
const caseStudiesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../case-studies-data.json'), 'utf-8')
);

async function seedBlogPosts() {
  console.log('🌱 開始導入部落格文章...\n');
  
  try {
    for (const post of blogPostsData) {
      // 檢查是否已存在
      const existing = await db.query.blogPosts.findFirst({
        where: (posts, { eq }) => eq(posts.slugTw, post.slugTw),
      });
      
      if (!existing) {
        await db.insert(blogPosts).values(post);
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

async function seedCaseStudies() {
  console.log('🌱 開始導入案例研究...\n');
  
  try {
    for (const study of caseStudiesData) {
      // 檢查是否已存在
      const existing = await db.query.caseStudies.findFirst({
        where: (studies, { eq }) => eq(studies.slug, study.slug),
      });
      
      if (!existing) {
        await db.insert(caseStudies).values(study);
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
  
  try {
    await seedBlogPosts();
    await seedCaseStudies();
    
    console.log('================================================================================');
    console.log('✅ 所有數據導入完成！');
    console.log('================================================================================');
    process.exit(0);
  } catch (error) {
    console.error('❌ 導入過程中出現錯誤：', error);
    process.exit(1);
  }
}

main();
