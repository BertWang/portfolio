import { useLoading } from '@/contexts/LoadingContext';
import { useEffect, useState } from 'react';

export function LoadingSpinner() {
  const { isLoading } = useLoading();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true);
    } else {
      // Delay hiding to allow fade-out animation
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 脈衝效果載入動畫 */}
      <div className="flex flex-col items-center gap-4">
        {/* 外層脈衝圓 */}
        <div className="relative w-16 h-16">
          {/* 脈衝圓 1 */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#8B7355]"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              opacity: 0.8,
            }}
          />

          {/* 脈衝圓 2 */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#8B7355]"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.4s',
              opacity: 0.6,
            }}
          />

          {/* 脈衝圓 3 */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#8B7355]"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.8s',
              opacity: 0.4,
            }}
          />

          {/* 中心點 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#8B7355] rounded-full" />
          </div>
        </div>

        {/* 載入文字 */}
        <p className="text-[#8B7355] font-medium text-sm">加載中...</p>
      </div>

      {/* CSS 動畫定義 */}
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
