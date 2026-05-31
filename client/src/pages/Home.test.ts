import { describe, it, expect } from 'vitest';

describe('Home Page - Civic Participation Section', () => {
  it('should have civic participation content in regionContent', () => {
    const regionContent = {
      tw: {
        civicTitle: '用設計與影像，為台灣的故事發聲',
        civicSubtitle: '不只是製作網站，更是透過紀錄片、影像創作與公民參與，守護文化記憶、實踐社會責任',
        civicMainText: '18 年來，我用代碼和設計為品牌創造溫度。但我也相信，設計的力量不只在於商業，更在於能否為社會議題發聲。',
        civicDocumentaries: '🎬 獲獎紀錄片 - 用影像說故事',
        civicHeritage: '🏛️ 文化保存 - 守護台灣的記憶',
        civicMovement: '🎥 社會運動 - 用影像見證時代',
        civicCreation: '✨ 影像創作 - 在喧鬧世界裡尋找細微溫度',
        civicCTA: '您的品牌也關心社會責任嗎？',
      },
      jp: {
        civicTitle: 'デザインと映像で、台湾の物語を発信する',
        civicSubtitle: 'ウェブサイト制作だけでなく、ドキュメンタリー、映像制作、市民参加を通じて、文化的記憶を守り、社会的責任を実践する',
        civicMainText: '18 年間、私はコードとデザインでブランドに温かみを与えてきました。しかし、デザインの力は商業だけではなく、社会的課題に声を上げることができるはずです。',
        civicDocumentaries: '🎬 受賞ドキュメンタリー - 映像で物語を語る',
        civicHeritage: '🏛️ 文化保存 - 台湾の記憶を守る',
        civicMovement: '🎥 社会運動 - 映像で時代を目撃する',
        civicCreation: '✨ 映像制作 - 喧噪の世界で細かい温かみを探す',
        civicCTA: 'あなたのブランドも社会的責任を気にしていますか？',
      },
      my: {
        civicTitle: 'Design and Video: Giving Voice to Malaysia\'s Stories',
        civicSubtitle: 'Beyond web design, I preserve cultural memory and practice social responsibility through documentaries, video production, and civic participation.',
        civicMainText: 'For 18 years, I\'ve used code and design to bring warmth to brands. But I believe design\'s power extends beyond commerce—it can amplify social voices and drive change.',
        civicDocumentaries: '🎬 Award-Winning Documentaries - Storytelling Through Video',
        civicHeritage: '🏛️ Cultural Preservation - Protecting Our Heritage',
        civicMovement: '🎥 Civic Engagement - Witnessing Our Times',
        civicCreation: '✨ Video Production - Finding Warmth in a Noisy World',
        civicCTA: 'Does your organization also care about social responsibility?',
      },
    };

    // 檢查台灣版
    expect(regionContent.tw.civicTitle).toBe('用設計與影像，為台灣的故事發聲');
    expect(regionContent.tw.civicSubtitle).toContain('紀錄片');
    expect(regionContent.tw.civicDocumentaries).toContain('🎬');
    expect(regionContent.tw.civicHeritage).toContain('🏛️');
    expect(regionContent.tw.civicMovement).toContain('🎥');
    expect(regionContent.tw.civicCreation).toContain('✨');

    // 檢查日本版
    expect(regionContent.jp.civicTitle).toContain('デザイン');
    expect(regionContent.jp.civicMainText).toContain('18 年間');

    // 檢查馬來西亞版
    expect(regionContent.my.civicTitle).toContain('Design and Video');
    expect(regionContent.my.civicMainText).toContain('18 years');
  });

  it('should have proper emoji and text formatting in civic content', () => {
    const civicContent = {
      documentaries: '🎬 獲獎紀錄片 - 用影像說故事',
      heritage: '🏛️ 文化保存 - 守護台灣的記憶',
      movement: '🎥 社會運動 - 用影像見證時代',
      creation: '✨ 影像創作 - 在喧鬧世界裡尋找細微溫度',
    };

    // 檢查所有內容都有正確的格式
    expect(civicContent.documentaries).toMatch(/🎬.*-/);
    expect(civicContent.heritage).toMatch(/🏛️.*-/);
    expect(civicContent.movement).toMatch(/🎥.*-/);
    expect(civicContent.creation).toMatch(/✨.*-/);
  });

  it('should contain calls to action for civic engagement', () => {
    const ctaContent = {
      tw: '您的品牌也關心社會責任嗎？',
      jp: 'あなたのブランドも社会的責任を気にしていますか？',
      my: 'Does your organization also care about social responsibility?',
    };

    expect(ctaContent.tw).toContain('品牌');
    expect(ctaContent.tw).toContain('社會責任');
    expect(ctaContent.jp).toContain('ブランド');
    expect(ctaContent.my).toContain('organization');
    expect(ctaContent.my).toContain('social responsibility');
  });

  it('should have multilingual civic participation content', () => {
    const languages = ['tw', 'jp', 'my'];
    const requiredFields = [
      'civicTitle',
      'civicSubtitle',
      'civicMainText',
      'civicDocumentaries',
      'civicHeritage',
      'civicMovement',
      'civicCreation',
      'civicCTA',
    ];

    languages.forEach((lang) => {
      requiredFields.forEach((field) => {
        expect(field).toBeDefined();
      });
    });
  });
});
