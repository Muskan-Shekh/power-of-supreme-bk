import React from 'react';
import { Sparkles, ArrowUp, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050509] border-t border-[#E8C77B]/15 pt-20 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-[#5B3A91]/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9370DB] via-[#FF4500] to-[#E8C77B] p-[1.5px]">
                <div className="w-full h-full bg-[#050509] rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                </div>
              </div>
              <span className="text-base tracking-[0.2em] font-medium text-white">
                POWER OF SUPREME
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md mb-6 font-light">
              "Help every human being understand who they truly are, discover the power of spirituality, and experience the eternal connection with the Supreme Soul."
            </p>
            <div className="text-xs text-[#E8C77B]/80 font-serif italic">
              Inspired by the universal spiritual wisdom and Rajyoga teachings of Brahma Kumaris.
            </div>
          </div>

          {/* Chapters of the Journey */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#E8C77B] font-medium mb-4">
              The Journey
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60 font-light">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">
                  01. Cosmic Universe
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('world')} className="hover:text-white transition-colors">
                  02. The World We Live In
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('soul')} className="hover:text-white transition-colors">
                  03. Who Am I? (The Soul)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('supreme')} className="hover:text-white transition-colors">
                  04. Shiv Baba (Supreme Soul)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('qualities')} className="hover:text-white transition-colors">
                  05. Seven Spiritual Virtues
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('meditation')} className="hover:text-white transition-colors">
                  06. Rajyoga Meditation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('everyday')} className="hover:text-white transition-colors">
                  07. Practical Daily Wisdom
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Connect & Meditation */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#E8C77B] font-medium mb-4">
              Spiritual Experience
            </h4>
            <p className="text-xs text-white/60 font-light mb-4 leading-relaxed">
              Experience silence. Connect with the Supreme in your own heart anytime, anywhere.
            </p>
            <button
              onClick={() => onNavigate('meditation')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-black bg-[#E8C77B] hover:shadow-[0_0_15px_rgba(232,199,123,0.4)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#5B3A91]" />
              <span>1-Minute Stillness</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Power of Supreme. Discover Yourself. Connect With The Supreme.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              Made with <Heart className="w-3 h-3 text-[#FF4500] fill-current" /> for universal peace
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
