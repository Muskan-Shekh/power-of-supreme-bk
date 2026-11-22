import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Sun, Shield, Heart, Eye } from 'lucide-react';
import SupremeSoulScene from '../three/SupremeSoulScene';

export default function SupremeSoulSection({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="supreme" className="relative w-full py-28 sm:py-40 bg-[#050509] overflow-hidden">
      {/* Radiant Red-Golden Divine Atmosphere (Paramdham / Brahmalok aura) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-[#FF2200]/25 via-[#FFA500]/20 to-[#E8C77B]/15 rounded-full blur-[220px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF4500]/40 bg-[#FF4500]/10 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(255,69,0,0.2)]">
            <Sun className="w-3.5 h-3.5 text-[#FFA500]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#FFA500] font-semibold">
              {content.tag}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light text-white mb-6 leading-[1.1]">
            Meet The Supreme <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFA500] via-[#FF4500] to-[#E8C77B] text-glow-gold">
              Source Of Peace
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed">
            {content.subheadline}
          </p>
        </div>

        {/* 3D Visual Centerpiece + Narrative Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Advanced 3D Shiv Baba Oval Scene */}
          <div className="lg:col-span-7 h-[500px] sm:h-[620px] rounded-3xl overflow-hidden relative border border-[#FFA500]/30 bg-gradient-to-b from-[#13070C] via-[#0B1020] to-[#050509] shadow-[0_0_60px_rgba(255,69,0,0.3)]">
            <Canvas camera={{ position: [0, 0, 4.2], fov: 48 }} dpr={[1, 2]}>
              <color attach="background" args={['#07050A']} />
              <ambientLight intensity={0.5} />
              <SupremeSoulScene interactive={true} />
            </Canvas>

            {/* Overlaid Reference Badge */}
            <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-[#FFA500]/30 text-xs">
              <span className="text-[#FFA500] font-serif text-sm font-medium">Shiv Baba</span>
              <p className="text-[11px] text-white/70">Paramatma — The Ocean of Peace & Love</p>
            </div>

            {/* Visual Guide to 3D Identity */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF2200] border border-[#FFA500]" />
                <span className="text-white/80">Red-Orange Oval Light</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                <span className="text-white/80">Central Radiant Soul Point</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[#E8C77B]">✨ Sunburst Corona Rays</span>
              </div>
            </div>
          </div>

          {/* Right: Spiritual Wisdom & Attributes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-[#FFA500]/20 bg-gradient-to-br from-[#FF4500]/10 via-[#0B1020]/60 to-[#050509] backdrop-blur-md">
              <h3 className="font-serif text-xl text-white font-medium mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFA500]" />
                Universal Spiritual Wisdom
              </h3>
              <p className="text-sm text-white/75 font-light leading-relaxed">
                {content.teachings}
              </p>
            </div>

            {/* 4 Core Divine Attributes */}
            <div className="space-y-3.5">
              {content.qualities.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                    activeTab === idx
                      ? 'bg-[#FF4500]/15 border-[#FFA500]/60 shadow-[0_0_20px_rgba(255,165,0,0.2)]'
                      : 'bg-[#0B1020]/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FFA500]" />
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-white/40 font-mono">0{idx + 1}</span>
                  </div>
                  <p className="text-xs text-white/65 font-light pl-4 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-xs text-white/50 italic px-2">
              "Neither birth nor death touches the Supreme Soul; He is the eternal light waiting to illuminate every heart with peace."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
