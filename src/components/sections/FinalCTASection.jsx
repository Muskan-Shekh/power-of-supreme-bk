import React, { useState } from 'react';
import { Sparkles, BookOpen, Compass, ExternalLink, Heart, CheckCircle2 } from 'lucide-react';

export default function FinalCTASection({ content, onNavigate }) {
  const [modalType, setModalType] = useState(null);

  return (
    <section id="cta" className="relative w-full py-28 sm:py-40 bg-[#050509] overflow-hidden text-center">
      {/* Background radial divine aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#FF4500]/15 via-[#5B3A91]/20 to-[#E8C77B]/20 rounded-full blur-[220px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8C77B]/30 bg-[#0B1020]/70 backdrop-blur-md mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#E8C77B]">
            {content.tag}
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-light text-white mb-6 leading-tight">
          The Journey Does Not End Here. <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#E8C77B] via-white to-[#9370DB] text-glow-gold">
            It Begins Within You.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto mb-12">
          {content.supportingText}
        </p>

        {/* 3 Main Action Cards / CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          <button
            onClick={() => setModalType('knowledge')}
            className="group p-6 rounded-2xl bg-[#0B1020]/60 border border-white/10 hover:border-[#E8C77B]/50 transition-all duration-300 hover:-translate-y-1 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E8C77B]/10 border border-[#E8C77B]/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-[#E8C77B]" />
            </div>
            <h3 className="text-base font-serif font-medium text-white mb-1">
              Spiritual Knowledge
            </h3>
            <span className="text-xs text-white/50 block font-light">
              Explore Soul, Supreme & Karmic laws
            </span>
          </button>

          <button
            onClick={() => onNavigate('meditation')}
            className="group p-6 rounded-2xl bg-gradient-to-b from-[#E8C77B]/20 to-[#0B1020]/60 border border-[#E8C77B]/40 hover:border-[#E8C77B] transition-all duration-300 hover:-translate-y-1 text-center shadow-[0_0_30px_rgba(232,199,123,0.15)]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E8C77B] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(232,199,123,0.5)]">
              <Sparkles className="w-5 h-5 text-[#050509]" />
            </div>
            <h3 className="text-base font-serif font-medium text-[#E8C77B] mb-1">
              Experience Rajyoga
            </h3>
            <span className="text-xs text-white/70 block font-light">
              Practice 1-Minute silence now
            </span>
          </button>

          <button
            onClick={() => setModalType('bk')}
            className="group p-6 rounded-2xl bg-[#0B1020]/60 border border-white/10 hover:border-[#9370DB]/50 transition-all duration-300 hover:-translate-y-1 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#9370DB]/10 border border-[#9370DB]/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5 text-[#9370DB]" />
            </div>
            <h3 className="text-base font-serif font-medium text-white mb-1">
              Brahma Kumaris
            </h3>
            <span className="text-xs text-white/50 block font-light">
              Learn about free meditation centers worldwide
            </span>
          </button>
        </div>
      </div>

      {/* Informative Modal Dialog */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative max-w-lg w-full p-8 rounded-3xl bg-[#0B1020] border border-[#E8C77B]/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] text-left">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 text-white/50 hover:text-white text-lg p-2"
            >
              ✕
            </button>

            {modalType === 'knowledge' ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E8C77B]/20 flex items-center justify-center text-[#E8C77B]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-white">Universal Spiritual Truths</h3>
                </div>
                <div className="space-y-3 text-sm text-white/75 font-light leading-relaxed mb-6">
                  <p>
                    <strong className="text-white">1. You are eternal:</strong> You have existed beyond physical form and will continue to exist. Physical death is only changing a garment.
                  </p>
                  <p>
                    <strong className="text-white">2. Law of Karma:</strong> Every thought, word, and deed returns to its creator. Choosing peace creates an aura of protection and harmony.
                  </p>
                  <p>
                    <strong className="text-white">3. Direct Relationship:</strong> You do not need middle-men or rituals to reach the Supreme Soul; pure love and silence are the only language of God.
                  </p>
                </div>
                <button
                  onClick={() => setModalType(null)}
                  className="w-full py-3 rounded-full text-xs uppercase tracking-wider font-medium text-black bg-[#E8C77B]"
                >
                  Understood & Continue
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#9370DB]/20 flex items-center justify-center text-[#9370DB]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-white">About Brahma Kumaris</h3>
                </div>
                <div className="space-y-3 text-sm text-white/75 font-light leading-relaxed mb-6">
                  <p>
                    Brahma Kumaris is a worldwide spiritual movement dedicated to personal transformation and world peace through education in spiritual values and Rajyoga meditation.
                  </p>
                  <p>
                    All Rajyoga courses and meditation sessions are offered completely <strong className="text-[#E8C77B]">free of charge</strong> across 8,500+ centers in over 110 countries.
                  </p>
                  <p className="text-xs text-white/60">
                    Learn more at official educational resources: <a href="https://www.brahmakumaris.org" target="_blank" rel="noreferrer" className="text-[#E8C77B] underline">brahmakumaris.org</a>
                  </p>
                </div>
                <button
                  onClick={() => setModalType(null)}
                  className="w-full py-3 rounded-full text-xs uppercase tracking-wider font-medium text-black bg-[#E8C77B]"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
