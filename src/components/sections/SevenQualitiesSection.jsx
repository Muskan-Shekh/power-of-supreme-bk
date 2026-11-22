import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Shield, Heart, Sun, Sparkles, BookOpen, Zap, Flame } from 'lucide-react';
import SevenQualitiesRing from '../three/SevenQualitiesRing';

export default function SevenQualitiesSection({ qualities }) {
  const [activeId, setActiveId] = useState('peace');

  const activeQuality = qualities.find((q) => q.id === activeId) || qualities[0];

  const getQualityIcon = (iconName, color) => {
    const props = { className: "w-5 h-5", style: { color } };
    switch (iconName) {
      case 'Shield': return <Shield {...props} />;
      case 'Heart': return <Heart {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Flame': return <Flame {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <section id="qualities" className="relative w-full py-28 sm:py-36 bg-[#050509] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#5B3A91]/20 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-[#0B1020]/60 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8C77B] font-medium">
              THE INNER INHERITANCE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white mb-6">
            The Seven Original Qualities <br />
            <span className="italic text-[#E8C77B]">Of Every Soul</span>
          </h2>

          <p className="text-base text-white/70 font-light leading-relaxed">
            Every human soul is naturally made of these seven divine virtues. When we remember who we are, these dormant qualities awaken.
          </p>
        </div>

        {/* 3D Ring + Detailed Interactive Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Orbiting Virtues Canvas */}
          <div className="lg:col-span-7 h-[460px] sm:h-[540px] rounded-3xl overflow-hidden relative border border-white/10 bg-gradient-to-b from-[#0B1020]/70 to-[#050509] shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <Canvas camera={{ position: [0, 1.8, 4.6], fov: 50 }} dpr={[1, 2]}>
              <color attach="background" args={['#050509']} />
              <ambientLight intensity={0.7} />
              <pointLight position={[0, 3, 2]} intensity={2.0} color="#E8C77B" />
              <SevenQualitiesRing
                qualities={qualities}
                activeQualityId={activeId}
                onSelectQuality={setActiveId}
              />
            </Canvas>

            <div className="absolute bottom-4 left-6 right-6 text-center text-xs text-white/40 font-light">
              👆 Click on any orbiting virtue orb to explore its meaning and real-life practice
            </div>
          </div>

          {/* Right: Focused Quality Card */}
          <div className="lg:col-span-5">
            {/* Quick Virtue Selector Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {qualities.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setActiveId(q.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeId === q.id
                      ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105'
                      : 'bg-[#0B1020]/70 text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  {q.name}
                </button>
              ))}
            </div>

            {/* Active Detail Container */}
            <div className="p-8 rounded-3xl glass-panel-glow border border-[#E8C77B]/30 relative overflow-hidden">
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
                style={{ backgroundColor: activeQuality.color }}
              />

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/20"
                  style={{ backgroundColor: `${activeQuality.color}20` }}
                >
                  {getQualityIcon(activeQuality.icon, activeQuality.color)}
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                    {activeQuality.name}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-[#E8C77B] font-mono">
                    {activeQuality.hindiName}
                  </span>
                </div>
              </div>

              {/* Philosophical Quote */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 mb-6">
                <p className="font-serif italic text-base sm:text-lg text-white/90 leading-relaxed">
                  "{activeQuality.quote}"
                </p>
              </div>

              {/* Real-Life Practical Application */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#E8C77B] font-semibold mb-2">
                  Real Life Practice:
                </h4>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  {activeQuality.example}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
