import React from 'react';
import { Compass, Sparkles, VolumeX, Eye } from 'lucide-react';

export default function InnerJourneySection({ content }) {
  return (
    <section id="inner" className="relative w-full py-28 sm:py-36 bg-gradient-to-b from-[#050509] via-[#0B1020] to-[#050509] overflow-hidden">
      {/* Subtle central ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5B3A91]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-[#0B1020]/60 backdrop-blur-md mb-4">
            <Compass className="w-3.5 h-3.5 text-[#9370DB]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8C77B] font-medium">
              {content.tag}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight">
            Sometimes, The Journey Outside <br />
            <span className="italic text-[#E8C77B]">Must Become a Journey Within.</span>
          </h2>

          <div className="p-8 rounded-2xl glass-panel-glow max-w-2xl mx-auto mb-16">
            <p className="font-serif italic text-lg sm:text-xl text-white/90 leading-relaxed">
              "{content.quote}"
            </p>
          </div>
        </div>

        {/* 3 Pillars of Turning Within */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.points.map((pt, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#0B1020]/60 border border-white/10 hover:border-[#E8C77B]/40 transition-all duration-300 backdrop-blur-md hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B3A91] to-[#E8C77B]/40 flex items-center justify-center mb-6 text-white font-mono text-sm font-semibold">
                0{idx + 1}
              </div>
              <h3 className="font-serif text-xl font-medium text-white mb-3">
                {pt.title}
              </h3>
              <p className="text-sm text-white/60 font-light leading-relaxed">
                {pt.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
