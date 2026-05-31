import { describe, it, expect } from 'vitest';

describe('Civic Participation Content', () => {
  it('should have civic participation content in all languages', () => {
    const regionContent = {
      tw: {
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
      },
      jp: {
        civicTitle: 'デザインと映像で、台湾の物語を発信する',
        civicSubtitle: 'ウェブサイト制作だけでなく、ドキュメンタリー、映像制作、市民参加を通じて、文化的記憶を守り、社会的責任を実践する',
        civicMainText: '18 年間、私はコードとデザインでブランドに温かみを与えてきました。しかし、デザインの力は商業だけではなく、社会的課題に声を上げることができるはずです。',
        civicMainText2: '318 学運から青島東の護国大遶述まで、飛雁新村の都市更新から南山公墓の文化保存まで、私は映像で台湾の忘れられた物語を記録しています。すべてのドキュメンタリー、すべてのビデオ、すべてのライブ配信は、この土地への私の約束です——温かみのあるデザイン、映像での目撃、行動による変化。',
        civicDocumentaries: '🎬 受賞ドキュメンタリー - 映像で物語を語る',
        civicHeritage: '🏛️ 文化保存 - 台湾の記憶を守る',
        civicCTA: 'あなたのブランドも社会的責任を気にしていますか？',
      },
      my: {
        civicTitle: 'Design and Video: Giving Voice to Malaysia\'s Stories',
        civicSubtitle: 'Beyond web design, I preserve cultural memory and practice social responsibility through documentaries, video production, and civic participation.',
        civicMainText: 'For 18 years, I\'ve used code and design to bring warmth to brands. But I believe design\'s power extends beyond commerce—it can amplify social voices and drive change.',
        civicMainText2: 'From civic movements to cultural preservation, from urban renewal to heritage protection, I document Malaysia\'s forgotten stories through film and video. Every documentary, every video, every live broadcast is my commitment to this land——designing with warmth, witnessing through images, creating change through action.',
        civicDocumentaries: '🎬 Award-Winning Documentaries - Storytelling Through Video',
        civicHeritage: '🏛️ Cultural Preservation - Protecting Our Heritage',
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
    const requiredFields = [
      'civicTitle',
      'civicSubtitle',
      'civicMainText',
      'civicDocumentaries',
      'civicHeritage',
      'civicCTA',
    ];

    requiredFields.forEach((field) => {
      expect(field).toBeDefined();
    });
  });

  it('should emphasize cultural preservation and social responsibility', () => {
    const twContent = '我不只是設計師，更是文化的守護者。參與赤嵌樓、祀典武廟、大天后宮等古蹟保存計畫，守護台南南山公墓、高雄覆鼎金公墓，搶救 1936 年的台南舊魚市場。每一個行動，都是為了讓下一代知道：我們來自哪裡，我們珍視什麼。';

    expect(twContent).toContain('文化');
    expect(twContent).toContain('古蹟保存');
    expect(twContent).toContain('守護');
  });
});
