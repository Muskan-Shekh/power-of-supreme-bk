import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top progress indicator bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#9370DB] via-[#FF4500] to-[#E8C77B] shadow-[0_0_10px_#E8C77B]"
          style={{ width: `${scrollPercentage}%` }}
        />
      </div>

      {/* Floating vertical progress dots indicator for desktop */}
      <div className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 pointer-events-none">
        <div className="text-[10px] tracking-widest text-[#E8C77B]/80 font-mono rotate-90 origin-center mb-4">
          {Math.round(scrollPercentage)}%
        </div>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
          <div
            className="w-full bg-[#E8C77B] absolute top-0"
            style={{ height: `${scrollPercentage}%` }}
          />
        </div>
      </div>
    </>
  );
}
