import React, { useState } from 'react';
import { Sparkles, ShieldAlert, HeartHandshake, Smile, RefreshCw, Award, Heart, ChevronRight } from 'lucide-react';

export default function EverydayLifeSection({ content }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const getSituationIcon = (idx) => {
    switch (idx) {
      case 0: return <ShieldAlert className="w-5 h-5 text-[#FF4500]" />;
      case 1: return <RefreshCw className="w-5 h-5 text-[#FFA500]" />;
      case 2: return <HeartHandshake className="w-5 h-5 text-[#FF69B4]" />;
      case 3: return <Heart className="w-5 h-5 text-[#9370DB]" />;
      case 4: return <Award className="w-5 h-5 text-[#00CED1]" />;
      case 5: return <Smile className="w-5 h-5 text-[#E8C77B]" />;
      default: return <Sparkles className="w-5 h-5 text-[#E8C77B]" />;
    }
  };

  const current = content.situations[selectedIdx] || content.situations[0];

  return (
    <section id="everyday" className="relative w-full py-28 sm:py-36 bg-[#050509] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-[#5B3A91]/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-[#0B1020]/60 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8C77B] font-medium">
              {content.tag}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white mb-6">
            Bring Spirituality <br />
            <span className="italic text-[#E8C77B]">Into Everyday Life</span>
          </h2>

          <p className="text-base text-white/70 font-light leading-relaxed">
            {content.subheadline}
          </p>
        </div>

        {/* Interactive Scenario Navigator & Solution Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Situations List Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs uppercase tracking-widest text-white/50 font-medium px-2 block mb-2">
              Select A Real-Life Challenge:
            </span>
            {content.situations.map((sit, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all duration-300 border ${
                  selectedIdx === idx
                    ? 'bg-[#0B1020] border-[#E8C77B]/60 shadow-[0_4px_25px_rgba(232,199,123,0.15)] scale-[1.02]'
                    : 'bg-[#0B1020]/40 border-white/5 hover:border-white/20 text-white/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                    {getSituationIcon(idx)}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">{sit.trigger}</h4>
                    <span className="text-[11px] text-white/50 line-clamp-1">{sit.dilemma}</span>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedIdx === idx ? 'text-[#E8C77B] translate-x-1' : 'text-white/30'}`} />
              </button>
            ))}
          </div>

          {/* Right: Immersive Practical Spiritual Solution Box */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel-glow border border-[#E8C77B]/30 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#E8C77B]/15 border border-[#E8C77B]/30 flex items-center justify-center">
                  {getSituationIcon(selectedIdx)}
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#E8C77B] font-mono">
                    Everyday Transformation
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                    {current.trigger}
                  </h3>
                </div>
              </div>

              {/* The Common Human Dilemma */}
              <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-300 block mb-1">
                  The Daily Friction:
                </span>
                <p className="text-sm text-white/80 font-light">
                  "{current.dilemma}"
                </p>
              </div>

              {/* The Spiritual Wisdom Realization */}
              <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-[#5B3A91]/25 to-transparent border border-[#9370DB]/30">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#9370DB] block mb-2">
                  Spiritual Awakening:
                </span>
                <p className="font-serif italic text-base sm:text-lg text-white/90 leading-relaxed">
                  "{current.spiritualInsight}"
                </p>
              </div>

              {/* Actionable Micro-Habit */}
              <div className="p-5 rounded-2xl bg-[#E8C77B]/10 border border-[#E8C77B]/30">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E8C77B] block mb-1">
                  Immediate 10-Second Action:
                </span>
                <p className="text-sm text-white font-medium">
                  {current.action}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
