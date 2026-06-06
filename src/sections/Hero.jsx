import { Leva } from 'leva';
import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import GlitchText from '../components/GlitchText.jsx';
import TerminalText from '../components/TerminalText.jsx';
import { calculateSizes, profile, stats } from '../constants/index.js';
import { HackerRoom } from '../components/HackerRoom.jsx';

const TickerStrip = () => {
  const words = [
    'BUILDER',
    'SHIPPER',
    'OPERATOR',
    'AI AGENTS',
    'AUTOMATION',
    'FULL-STACK',
    'PRODUCT ENG',
    'PROMPT OPS',
  ];
  const items = [...words, ...words, ...words];
  return (
    <div className="relative w-full overflow-hidden border-y border-hud-line py-3 bg-void-800/40">
      <div className="marquee-track gap-10 font-display font-black uppercase text-2xl sm:text-3xl tracking-tight">
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-hud-text/30">
            <span className="text-neon-cyan/90">◆</span>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  const heroRef = useRef(null);

  useGSAP(() => {
    gsap.from('.hero-reveal', {
      y: 28,
      opacity: 0,
      duration: 1,
      stagger: 0.08,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden pt-28 sm:pt-32 pb-12">
      {/* Grid + scan beam backdrop */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />
      <div className="scan-beam" />

      <div className="container-x c-space relative">
        {/* HUD top row */}
        <div className="hero-reveal flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3 font-mono uppercase tracking-[0.3em] text-[10px] text-neon-cyan/80">
            <span className="blink-dot-cyan" /> LIVE FEED
            <span className="text-hud-dim">/</span>
            <span className="text-hud-dim">SECTOR 01 — HERO</span>
          </div>
          <div className="flex items-center gap-3 font-mono uppercase tracking-[0.3em] text-[10px] text-hud-dim">
            <span>STATUS</span>
            <span className="text-neon-lime">AVAILABLE FOR HIRE</span>
          </div>
        </div>

        {/* Headline grid */}
        <div className="grid grid-cols-12 gap-6 items-end relative z-10">
          <div className="col-span-12 lg:col-span-7">
            <div className="hero-reveal font-mono text-xs sm:text-sm uppercase tracking-[0.4em] text-neon-cyan/80">
              <TerminalText text="// PILOT-04052 — IDENT VERIFIED" speed={28} />
            </div>

            <h1 className="hero-reveal display-text mt-4 text-[clamp(2.6rem,8.5vw,7rem)] text-hud-text">
              <GlitchText text="ADITYA" />
              <br />
              <span className="text-gradient-cyber">SAXENA<span className="text-neon-magenta">.</span></span>
            </h1>

            <p className="hero-reveal mt-4 max-w-xl text-base sm:text-lg text-hud-text/80 font-sans">
              {profile.tagline}
            </p>

            <div className="hero-reveal mt-7 flex flex-wrap items-center gap-3">
              <a href="#missions" className="neon-btn">
                <span>VIEW MISSIONS</span>
                <span>→</span>
              </a>
              <a href="#comms" className="neon-btn-magenta">
                <span>INITIATE COMMS</span>
                <span>↗</span>
              </a>
            </div>

            {/* Stats row */}
            <div className="hero-reveal mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="hud-panel frame-cut-sm p-3 sm:p-4"
                  style={{ borderColor: 'rgba(31,36,54,1)' }}>
                  <div className="font-display text-2xl sm:text-3xl text-hud-text">
                    {s.value}
                  </div>
                  <div className="font-mono uppercase tracking-[0.18em] text-[9px] sm:text-[10px] mt-1 text-neon-cyan/80">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side HUD card */}
          <div className="hero-reveal col-span-12 lg:col-span-5 lg:pl-6">
            <div className="hud-panel frame-cut p-5 sm:p-6 relative">
              <span className="hud-corner hud-corner-tl" />
              <span className="hud-corner hud-corner-tr" />
              <span className="hud-corner hud-corner-bl" />
              <span className="hud-corner hud-corner-br" />

              <div className="flex items-center justify-between">
                <span className="hud-label">PILOT.DOSSIER</span>
                <span className="font-mono text-[10px] text-neon-cyan/80">REV.2026</span>
              </div>
              <div className="hud-divider my-4" />

              <div className="grid grid-cols-3 gap-3 font-mono text-[11px]">
                <div>
                  <div className="text-hud-dim uppercase tracking-[0.2em] text-[9px]">CALLSIGN</div>
                  <div className="text-hud-text mt-1">A. SAXENA</div>
                </div>
                <div>
                  <div className="text-hud-dim uppercase tracking-[0.2em] text-[9px]">SECTOR</div>
                  <div className="text-hud-text mt-1">BLR — IN</div>
                </div>
                <div>
                  <div className="text-hud-dim uppercase tracking-[0.2em] text-[9px]">CLASS</div>
                  <div className="text-hud-text mt-1">PRODUCT.ENG</div>
                </div>
                <div>
                  <div className="text-hud-dim uppercase tracking-[0.2em] text-[9px]">CURRENT</div>
                  <div className="text-neon-magenta mt-1">GOCOMET</div>
                </div>
                <div>
                  <div className="text-hud-dim uppercase tracking-[0.2em] text-[9px]">STACK</div>
                  <div className="text-hud-text mt-1">NEXT · R3F</div>
                </div>
                <div>
                  <div className="text-hud-dim uppercase tracking-[0.2em] text-[9px]">EDU</div>
                  <div className="text-hud-text mt-1">MAIT 22-26</div>
                </div>
              </div>

              <div className="hud-divider my-4" />

              <div className="font-mono text-[11px] text-hud-text/80 leading-relaxed">
                <span className="text-neon-cyan">▸</span> Shipping AI agents that book real meetings.
                <br />
                <span className="text-neon-magenta">▸</span> Dashboards live on office TVs.
                <br />
                <span className="text-neon-lime">▸</span> Prompts running across 3,000+ accounts.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D scene layer (behind, but lifted upward visually) */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas className="w-full h-full" dpr={[1, 1.5]}>
          <Suspense fallback={<CanvasLoader />}>
            <Leva hidden />
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />
            <HeroCamera isMobile={isMobile}>
              <HackerRoom
                scale={sizes.deskScale}
                position={sizes.deskPosition}
                rotation={[0.1, -Math.PI, 0]}
              />
            </HeroCamera>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.6} color="#00F0FF" />
            <directionalLight position={[-10, 5, -10]} intensity={0.4} color="#FF2E97" />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom ticker */}
      <div className="mt-16 relative z-10">
        <TickerStrip />
      </div>

      {/* Bottom indicator */}
      <div className="container-x c-space mt-6 flex items-center justify-between font-mono uppercase tracking-[0.3em] text-[10px] text-hud-dim relative z-10">
        <span>SCROLL ↓ TO ENGAGE</span>
        <span className="hidden sm:inline">{profile.email}</span>
      </div>
    </section>
  );
};

export default Hero;
