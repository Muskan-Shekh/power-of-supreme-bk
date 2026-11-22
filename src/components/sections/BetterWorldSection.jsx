import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Globe, Heart } from 'lucide-react';
import EarthScene from '../three/EarthScene';

export default function BetterWorldSection({ content }) {
  return (
    <section id="world-peace" className="relative w-full py-28 sm:py-36 bg-[#050509] overflow-hidden">
      {/* Background golden ambient circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-[#E8C77B]/15 via-[#5B3A91]/15 to-transparent rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-[#0B1020]/60 backdrop-blur-md mb-4">
            <Globe className="w-3.5 h-3.5 text-[#E8C77B]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8C77B] font-medium">
              {content.tag}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light text-white mb-6">
            One Soul. One Connection. <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#E8C77B] via-white to-[#FFA500] text-glow-gold">
              A World Of Peace.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
            {content.content}
          </p>
        </div>

        {/* 3D Golden Earth with Encircling Souls */}
        <div className="max-w-4xl mx-auto h-[480px] sm:h-[580px] rounded-3xl overflow-hidden relative border border-[#E8C77B]/20 bg-gradient-to-b from-[#0B1020]/80 to-[#050509] shadow-[0_0_60px_rgba(232,199,123,0.15)] mb-12">
          <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 2]}>
            <color attach="background" args={['#050509']} />
            <ambientLight intensity={0.4} />
            <EarthScene />
          </Canvas>

          {/* Golden Quote Floating Badge */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-lg p-5 rounded-2xl bg-black/75 backdrop-blur-md border border-[#E8C77B]/30 text-center">
            <p className="font-serif italic text-base sm:text-lg text-[#E8C77B] font-medium mb-1">
              "{content.quote}"
            </p>
            <p className="text-[11px] text-white/60 tracking-wider uppercase font-sans">
              Universal Law of Spiritual Transformation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
