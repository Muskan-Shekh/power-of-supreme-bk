import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Brain, Compass, HelpCircle } from 'lucide-react';
import SoulScene from '../three/SoulScene';

export default function SoulSection({ content }) {
  return (
    <section id="soul" className="relative w-full py-28 sm:py-36 bg-[#050509] overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#9370DB]/15 rounded-full blur-[180px] pointer-events-none" />

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
            I Am Not Just This Body. <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#E8C77B] to-[#9370DB] text-glow-gold">
              I Am A Soul.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
            {content.soulDescription}
          </p>
        </div>

        {/* 3D Interactive Canvas & Explanatory Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Soul & Meditating Form Scene */}
          <div className="lg:col-span-6 h-[480px] sm:h-[550px] rounded-3xl overflow-hidden relative border border-[#E8C77B]/20 bg-gradient-to-b from-[#0B1020]/80 to-[#050509] shadow-[0_0_50px_rgba(91,58,145,0.25)]">
            <Canvas camera={{ position: [0, 0.4, 4.2], fov: 45 }} dpr={[1, 2]}>
              <color attach="background" args={['#050509']} />
              <ambientLight intensity={0.6} />
              <pointLight position={[0, 2, 2]} intensity={2.0} color="#E8C77B" />
              <SoulScene />
            </Canvas>

            {/* In-canvas Label indicator pointing to forehead */}
            <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs">
              <span className="text-[#E8C77B] font-mono font-medium">Bhrkuti (Forehead)</span>
              <p className="text-[11px] text-white/60">Seat of the conscious Soul (Atma)</p>
            </div>

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-[#E8C77B]/20 text-xs text-center text-white/80 font-light">
              ✨ Rotate / observe the radiant star of living light within the silhouette
            </div>
          </div>

          {/* Right: Faculties of the Soul & Metaphor */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl glass-panel">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-[#E8C77B] mb-2 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                The Analogy of The Driver & The Car
              </h3>
              <p className="text-sm text-white/80 font-light leading-relaxed">
                {content.simpleAnalogy}
              </p>
            </div>

            {/* Three Faculties of the Conscious Soul */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-white/50 font-medium px-2">
                The Three Faculties Of The Soul
              </h4>
              {content.attributes.map((attr, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0B1020]/50 border border-white/10 hover:border-[#9370DB]/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#E8C77B]" />
                    <h5 className="font-serif text-lg font-medium text-white">{attr.name}</h5>
                  </div>
                  <p className="text-xs sm:text-sm text-white/65 font-light pl-5">
                    {attr.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-white/50 italic text-center">
              "The body changes from childhood to youth to old age, but the observer inside remains eternal."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
