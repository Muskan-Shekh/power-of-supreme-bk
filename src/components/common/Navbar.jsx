import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Compass } from 'lucide-react';

export default function Navbar({ onNavigate, activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'world', label: 'Discover' },
    { id: 'soul', label: 'The Soul' },
    { id: 'supreme', label: 'Supreme Soul' },
    { id: 'qualities', label: '7 Virtues' },
    { id: 'meditation', label: 'Meditation' },
    { id: 'everyday', label: 'Life Wisdom' },
    { id: 'world-peace', label: 'Golden Vision' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 bg-[#050509]/80 backdrop-blur-xl border-b border-[#E8C77B]/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9370DB] via-[#FF4500] to-[#E8C77B] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(232,199,123,0.3)]">
            <div className="w-full h-full bg-[#050509] rounded-full flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#FFFFFF] shadow-[0_0_8px_#FFFFFF]" />
            </div>
          </div>
          <div>
            <span className="text-sm tracking-[0.25em] font-medium text-white/95 group-hover:text-[#E8C77B] transition-colors">
              POWER OF SUPREME
            </span>
            <span className="hidden sm:block text-[9px] tracking-[0.2em] text-[#E8C77B]/70 uppercase font-light">
              Spiritual Realization
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0B1020]/60 border border-[#E8C77B]/15 rounded-full px-4 py-1.5 backdrop-blur-lg">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative px-3.5 py-1.5 text-xs tracking-wider transition-all duration-300 rounded-full font-light ${
                  isActive
                    ? 'text-[#E8C77B] font-medium'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E8C77B] shadow-[0_0_6px_#E8C77B]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button: Quick 1-Min Meditation */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onNavigate('meditation')}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider text-black bg-gradient-to-r from-[#E8C77B] via-[#FFE4B5] to-[#E8C77B] hover:shadow-[0_0_20px_rgba(232,199,123,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5B3A91]" />
            <span>Meditation</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white/80 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050509]/95 backdrop-blur-2xl border-b border-[#E8C77B]/20 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 text-left text-sm tracking-wider font-light transition-colors ${
                  activeSection === link.id
                    ? 'text-[#E8C77B] font-medium'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10 mt-2">
              <button
                onClick={() => {
                  onNavigate('meditation');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium tracking-wider text-black bg-[#E8C77B]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#5B3A91]" />
                <span>Start 1-Min Rajyoga</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
