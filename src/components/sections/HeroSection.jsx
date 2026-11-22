import React from 'react';
import { ChevronDown, Compass, Sparkles, Eye } from 'lucide-react';

export default function HeroSection({ content, onBeginJourney }) {
  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Central Ethereal Golden Light Halo (Layered with 3D Canvas) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#FF2200]/30 via-[#FFA500]/25 to-[#FFD700]/20 blur-[150px] pointer-events-none" />

      {/* Hero Typography & Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 pb-16 flex flex-col items-center">
        {/* Micro Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFA500]/40 bg-[#0B1020]/75 backdrop-blur-md mb-8 shadow-[0_0_25px_rgba(255,165,0,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
          <span className="text-[11px] uppercase tracking-[0.3em] font-medium text-[#FFD700]">
            {content.tagline}
          </span>
        </div>

        {/* Main Cinematic Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.08] font-light text-white mb-8">
          Beyond What You See, <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFFFFF] text-glow-gold">
            There Is Something Greater.
          </span>
        </h1>

        {/* Supporting Narrative */}
        <p className="max-w-2xl text-base sm:text-lg text-white/80 font-light leading-relaxed mb-12 drop-shadow-md">
          {content.supportingText}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <button
            onClick={onBeginJourney}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-wider text-black bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] shadow-[0_0_35px_rgba(255,165,0,0.5)] hover:shadow-[0_0_55px_rgba(255,165,0,0.8)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
          >
            <Compass className="w-4 h-4 text-[#3A0503] transition-transform duration-500 group-hover:rotate-45" />
            <span>{content.cta}</span>
          </button>

          <a
            href="#supreme"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-xs font-light tracking-widest text-white/90 hover:text-white border border-white/20 hover:border-[#FFA500]/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
          >
            <Eye className="w-3.5 h-3.5 text-[#FFA500]" />
            <span>ZOOM TO SUPREME SOUL</span>
          </a>
        </div>

        {/* Cinematic Scroll Indicator */}
        <div className="mt-20 flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Scroll to fly through dimensions</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#FFD700]" />
        </div>
      </div>
    </section>
  );
}
