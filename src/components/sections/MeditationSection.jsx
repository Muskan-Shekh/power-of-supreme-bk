import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles, Play, Square, RefreshCw, Volume2, CheckCircle2 } from 'lucide-react';
import MeditationConduit from '../three/MeditationConduit';

export default function MeditationSection({ content }) {
  const [isMeditating, setIsMeditating] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [meditationPhase, setMeditationPhase] = useState(0);

  const phaseMessages = [
    { title: "Breathe & Relax", guidance: "Gently soften your shoulders. Let go of physical tension." },
    { title: "Quiet the Mind", guidance: "Observe your thoughts without judgement. Let them pass like passing clouds." },
    { title: "I Am A Soul", guidance: "Feel yourself as a radiant point of pure living light at your forehead." },
    { title: "Connect With Supreme", guidance: "Turn your inner gaze to Shiv Baba — the Sun of Peace." },
    { title: "Absorb Divine Peace", guidance: "Feel golden rays showering over your being, washing away fatigue." },
    { title: "Radiate Peace to All", guidance: "Hold this stillness in your heart and softly carry it into the world." }
  ];

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isMeditating && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          const next = prev - 1;
          // Progress phases every 10 seconds
          const phaseIndex = Math.min(5, Math.floor((60 - next) / 10));
          setMeditationPhase(phaseIndex);
          return next;
        });
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsMeditating(false);
    }
    return () => clearInterval(interval);
  }, [isMeditating, timerSeconds]);

  const startMeditation = () => {
    setTimerSeconds(60);
    setMeditationPhase(0);
    setIsMeditating(true);
  };

  const stopMeditation = () => {
    setIsMeditating(false);
    setTimerSeconds(60);
  };

  return (
    <section id="meditation" className="relative w-full py-28 sm:py-36 bg-[#050509] overflow-hidden">
      {/* Background soft golden glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E8C77B]/10 rounded-full blur-[180px] pointer-events-none" />

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
            The Power Of <br />
            <span className="italic text-[#E8C77B]">Rajyoga Meditation</span>
          </h2>

          <p className="text-base text-white/70 font-light leading-relaxed mb-8">
            {content.subheadline}
          </p>

          {/* Interactive Meditation Trigger Button */}
          {!isMeditating ? (
            <button
              onClick={startMeditation}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-medium tracking-wider text-black bg-gradient-to-r from-[#E8C77B] via-[#FFE4B5] to-[#E8C77B] shadow-[0_0_30px_rgba(232,199,123,0.4)] hover:shadow-[0_0_45px_rgba(232,199,123,0.6)] hover:scale-105 transition-all duration-300"
            >
              <Play className="w-4 h-4 fill-current text-[#5B3A91]" />
              <span>Start 1-Minute Meditation</span>
            </button>
          ) : (
            <div className="p-6 rounded-3xl glass-panel-glow border border-[#E8C77B]/50 max-w-xl mx-auto">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#E8C77B] animate-ping" />
                  <span className="text-xs uppercase tracking-widest text-[#E8C77B] font-medium">
                    Meditation in Progress
                  </span>
                </div>
                <div className="text-2xl font-mono text-[#E8C77B] font-semibold">
                  00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
                </div>
              </div>

              {/* Guided Breath / Phase Note */}
              <div className="py-4">
                <h4 className="font-serif text-2xl text-white mb-1">
                  {phaseMessages[meditationPhase].title}
                </h4>
                <p className="text-sm text-white/80 font-light italic">
                  "{phaseMessages[meditationPhase].guidance}"
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 mt-2">
                <button
                  onClick={stopMeditation}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-all"
                >
                  <Square className="w-3 h-3 fill-current" />
                  <span>End Session</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3D Conduit Canvas & Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Ray Conduit from Paramdham */}
          <div className="lg:col-span-6 h-[480px] sm:h-[560px] rounded-3xl overflow-hidden relative border border-[#E8C77B]/30 bg-gradient-to-b from-[#160b08] via-[#0B1020] to-[#050509] shadow-[0_0_50px_rgba(232,199,123,0.2)]">
            <Canvas camera={{ position: [0, 0, 4.6], fov: 48 }} dpr={[1, 2]}>
              <color attach="background" args={['#07050A']} />
              <ambientLight intensity={0.5} />
              <MeditationConduit />
            </Canvas>

            <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs">
              <span className="text-[#FFA500] font-medium">Supreme Soul (Above)</span>
              <p className="text-[11px] text-white/60">Flowing stream of Peace & Purity</p>
            </div>

            <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs">
              <span className="text-[#9370DB] font-medium">The Soul (Observer)</span>
              <p className="text-[11px] text-white/60">Recharging inner strength</p>
            </div>
          </div>

          {/* Right: The 6 Steps of Rajyoga */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-[#E8C77B] font-semibold px-2">
              The 6 Simple Steps To Practice
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {content.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0B1020]/50 border border-white/10 hover:border-[#E8C77B]/40 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#E8C77B]">
                      {st.number}
                    </span>
                    <h4 className="font-serif text-base font-medium text-white">{st.title}</h4>
                  </div>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] text-xs text-white/60 leading-relaxed">
              💡 <strong className="text-white">Note:</strong> Rajyoga does not require sitting in difficult physical postures or chanting rituals. It can be practiced with open or soft eyes while staying fully aware of your surroundings.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
