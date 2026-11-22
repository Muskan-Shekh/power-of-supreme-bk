import React from 'react';
import { Sparkles, Globe, Heart, Briefcase, Users, Eye, Mountain } from 'lucide-react';

export default function HumanWorldSection({ content }) {
  const getIcon = (cat) => {
    switch (cat) {
      case 'Innocence': return <Sparkles className="w-4 h-4 text-[#E8C77B]" />;
      case 'Love': return <Heart className="w-4 h-4 text-[#FF69B4]" />;
      case 'Ambition': return <Briefcase className="w-4 h-4 text-[#00CED1]" />;
      case 'Compassion': return <Users className="w-4 h-4 text-[#9370DB]" />;
      case 'Reflection': return <Eye className="w-4 h-4 text-[#E8C77B]" />;
      case 'Wonder': return <Mountain className="w-4 h-4 text-[#20B2AA]" />;
      default: return <Sparkles className="w-4 h-4 text-[#E8C77B]" />;
    }
  };

  return (
    <section id="world" className="relative w-full py-28 sm:py-36 bg-[#050509] overflow-hidden">
      {/* Background subtleties */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#5B3A91]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#0B1020] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-[#0B1020]/60 backdrop-blur-md mb-4">
            <Globe className="w-3.5 h-3.5 text-[#E8C77B]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E8C77B]/90 font-medium">
              {content.tag}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white mb-6">
            {content.headline}
          </h2>

          <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed mb-6">
            {content.subheadline}
          </p>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-transparent via-[#5B3A91]/15 to-transparent border-y border-[#E8C77B]/20">
            <p className="text-sm sm:text-base text-white/80 font-serif italic mb-1">
              "{content.reflection}"
            </p>
            <p className="text-lg sm:text-2xl font-serif text-[#E8C77B] font-medium tracking-wide">
              {content.question}
            </p>
          </div>
        </div>

        {/* Gallery of Human Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-[#0B1020]/40 border border-white/10 hover:border-[#E8C77B]/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
            >
              {/* Image Frame with Zoom */}
              <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-[#0B1020]/40 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs">
                  {getIcon(card.category)}
                  <span className="text-[11px] font-medium text-white/90">{card.category}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-normal text-white mb-2 group-hover:text-[#E8C77B] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
