import React, { useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollProgress from './components/common/ScrollProgress';
import CursorParticleTrail from './components/common/CursorParticleTrail';

import ContinuousExperienceScene from './components/three/ContinuousExperienceScene';

import HeroSection from './components/sections/HeroSection';
import HumanWorldSection from './components/sections/HumanWorldSection';
import InnerJourneySection from './components/sections/InnerJourneySection';
import SoulSection from './components/sections/SoulSection';
import SupremeSoulSection from './components/sections/SupremeSoulSection';
import SevenQualitiesSection from './components/sections/SevenQualitiesSection';
import MeditationSection from './components/sections/MeditationSection';
import EverydayLifeSection from './components/sections/EverydayLifeSection';
import BetterWorldSection from './components/sections/BetterWorldSection';
import FinalCTASection from './components/sections/FinalCTASection';

import { SPIRITUAL_CONTENT } from './data/spiritualContent';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0); // Continuous floating index (0.00 to ~9.00)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 10 Storytelling Chapters
  const chapters = [
    { id: 'hero', component: <HeroSection content={SPIRITUAL_CONTENT.hero} onBeginJourney={() => goToChapter(1)} /> },
    { id: 'world', component: <HumanWorldSection content={SPIRITUAL_CONTENT.humanWorld} /> },
    { id: 'inner', component: <InnerJourneySection content={SPIRITUAL_CONTENT.innerJourney} /> },
    { id: 'soul', component: <SoulSection content={SPIRITUAL_CONTENT.whoAmI} /> },
    { id: 'supreme', component: <SupremeSoulSection content={SPIRITUAL_CONTENT.supremeSoul} /> },
    { id: 'qualities', component: <SevenQualitiesSection qualities={SPIRITUAL_CONTENT.sevenQualities} /> },
    { id: 'meditation', component: <MeditationSection content={SPIRITUAL_CONTENT.meditation} /> },
    { id: 'everyday', component: <EverydayLifeSection content={SPIRITUAL_CONTENT.everydayLife} /> },
    { id: 'world-peace', component: <BetterWorldSection content={SPIRITUAL_CONTENT.betterWorld} /> },
    { id: 'cta', component: <FinalCTASection content={SPIRITUAL_CONTENT.finalCTA} onNavigate={(id) => goToSection(id)} /> },
  ];

  // Mouse parallax listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize Lenis and GSAP ScrollTrigger to pin the container and zoom through each section
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const totalChapters = chapters.length;
    // Pin container for (totalChapters * 120vh)
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: () => `+=${window.innerHeight * (totalChapters - 1) * 1.5}`,
      pin: true,
      scrub: 1.0,
      onUpdate: (self) => {
        // Continuous step from 0 to totalChapters - 1
        const rawStep = self.progress * (totalChapters - 1);
        setCurrentStep(rawStep);
      },
    });

    return () => {
      trigger.kill();
      lenis.destroy();
    };
  }, [chapters.length]);

  const goToChapter = (index) => {
    const totalHeight = window.innerHeight * (chapters.length - 1) * 1.5;
    const targetScroll = (index / (chapters.length - 1)) * totalHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const goToSection = (id) => {
    const idx = chapters.findIndex((c) => c.id === id);
    if (idx !== -1) {
      goToChapter(idx);
    }
  };

  // Determine active section name for navbar
  const activeChapterIndex = Math.min(chapters.length - 1, Math.round(currentStep));
  const activeSectionId = chapters[activeChapterIndex].id;

  return (
    <div className="relative min-h-screen bg-[#0A0202] text-white selection:bg-[#FFA500]/30 selection:text-white overflow-x-hidden">
      {/* 1. Interactive Lusion-style Cursor Particle Trail */}
      <CursorParticleTrail />

      {/* 2. Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 3. Floating Minimal Navigation */}
      <Navbar onNavigate={goToSection} activeSection={activeSectionId} />

      {/* 4. Fullscreen Pinned Zoom Viewport */}
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
        {/* Full-screen 3D Continuous Zoom Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 12], fov: 50 }} dpr={[1, 1.8]}>
            <ContinuousExperienceScene
              currentStep={currentStep}
              mousePos={mousePos}
            />
          </Canvas>
        </div>

        {/* 5. Nested Zooming Chapter Planes */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {chapters.map((ch, idx) => {
            // Distance from current step:
            // diff = 0 -> currently in focus
            // diff < 0 -> already passed (zooms forward past screen and fades)
            // diff > 0 -> coming next (starts microscopic in center and expands outward)
            const diff = idx - currentStep;

            // Opacity: peak at 1.0 when diff is 0, fades when moving away
            let opacity = 0;
            if (diff >= -1.0 && diff <= 1.0) {
              opacity = 1.0 - Math.pow(Math.abs(diff), 1.4);
            }

            // Zoom Scale:
            // When approaching from ahead (diff > 0): starts small (0.2 -> 1.0)
            // When in focus (diff = 0): scale = 1.0
            // When passing behind (diff < 0): expands into camera (1.0 -> 3.5)
            let scale = 1;
            if (diff > 0) {
              scale = Math.max(0.01, 1.0 - diff * 0.7);
            } else {
              scale = 1.0 + Math.abs(diff) * 2.2;
            }

            // Blur transition
            const blur = Math.abs(diff) * 16;
            const isInteractive = Math.abs(diff) < 0.35;

            // Hide completely if out of transition window
            if (Math.abs(diff) > 1.2) {
              return null;
            }

            return (
              <div
                key={ch.id}
                className={`absolute inset-0 w-full h-full flex items-center justify-center overflow-y-auto no-scrollbar transition-opacity duration-150 ${
                  isInteractive ? 'pointer-events-auto' : 'pointer-events-none'
                }`}
                style={{
                  opacity: Math.max(0, Math.min(1, opacity)),
                  transform: `scale(${scale})`,
                  filter: `blur(${blur}px)`,
                  willChange: 'transform, opacity, filter',
                }}
              >
                <div className="w-full max-h-screen py-20 overflow-y-auto">
                  {ch.component}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Zoom Navigation Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#FFA500]/30 shadow-[0_0_20px_rgba(255,165,0,0.2)]">
          <span className="text-[11px] font-mono text-[#FFD700] tracking-wider uppercase">
            Dimension {activeChapterIndex + 1} / {chapters.length}
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            {chapters.map((_, i) => (
              <button
                key={i}
                onClick={() => goToChapter(i)}
                aria-label={`Jump to dimension ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === activeChapterIndex
                    ? 'w-5 h-1.5 bg-[#FFD700] shadow-[0_0_8px_#FFD700]'
                    : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 6. Footer (Appears after the zoom journey) */}
      <Footer onNavigate={goToSection} />
    </div>
  );
}
