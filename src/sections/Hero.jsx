import { Leva } from 'leva';
import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import CanvasLoader from '../components/Loading.jsx';
import GlitchText from '../components/GlitchText.jsx';
import TerminalText from '../components/TerminalText.jsx';
import FloatingArtifacts from '../components/FloatingArtifacts.jsx';
import { profile, stats } from '../constants/index.js';

const TickerStrip = () => {
  const words = ['BUILDER', 'SHIPPER', 'OPERATOR', 'AI AGENTS', 'AUTOMATION', 'FULL-STACK', 'PRODUCT ENG', 'PROMPT OPS'];
  const items = [...words, ...words, ...words];
  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-hud-line bg-void-800/40">
      <div className="marquee-track gap-10 font-display font-black uppercase text-2xl sm:text-4xl tracking-tight">
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-holo">★</span>
            <span className={i % 2 === 0 ? 'text-hud-text/40' : 'text-rainbow'}>{w}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

const LevelBadge = ({ level, xp }) => (
  <div className="flex items-center gap-4">
    <div className="lvl-badge w-16 h-16 rounded-full p-[2px] animate-spin-slow">
      <div className="lvl-badge-inner w-full h-full">
        <span className="text-xl">{level}</span>
      </div>
    </div>
    <div>
      <div className="font-display text-xs uppercase tracking-[0.3em] text-hud-dim">LVL {level}</div>
      <div className="mt-1 w-32 xp-track">
        <div className="xp-fill" style={{ width: `${xp}%` }} />
      </div>
      <div className="mt-1 font-mono text-[10px] text-neon-gold">{xp} / 100 XP</div>
    </div>
  </div>
);

const accentBorder = {
  cyan: 'border-neon-cyan/40',
  magenta: 'border-neon-magenta/40',
  lime: 'border-neon-lime/40',
  amber: 'border-neon-amber/40',
};

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
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
    gsap.to('.hero-massive', {
      backgroundPosition: '200% 0',
      duration: 12,
      repeat: -1,
      ease: 'none',
    });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden pt-28 sm:pt-32 pb-12">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="aurora" />

      {/* 3D scene as full-area backdrop */}
      <div className="absolute inset-0 z-[1]">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ alpha: true, antialias: true }}>
          <Suspense fallback={null}>
            <Leva hidden />
            <FloatingArtifacts />
          </Suspense>
        </Canvas>
      </div>

      <div className="container-x c-space relative z-10">
        {/* Top status row */}
        <div className="hero-reveal flex flex-wrap items-center justify-between gap-3 mb-10">
          <LevelBadge level={profile.level} xp={profile.xp} />
          <div className="flex items-center gap-3">
            <span className="chip-lime">
              <span className="dot-lime" /> AVAILABLE FOR HIRE
            </span>
            <span className="chip-gold hidden sm:inline-flex">RANK · {profile.rank}</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 items-end">
          {/* Headline column */}
          <div className="col-span-12 lg:col-span-8">
            <div className="hero-reveal font-mono text-[11px] sm:text-xs uppercase tracking-[0.4em] text-neon-cyan/90">
              <TerminalText text="// player 1 — ready" speed={32} />
            </div>

            <h1
              className="hero-massive hero-reveal display-text mt-4 text-[clamp(2.8rem,11vw,9rem)] leading-[0.92]"
              style={{
                background:
                  'linear-gradient(90deg, #00F0FF 0%, #9B5DE5 25%, #FF2E97 50%, #FFB347 75%, #B6FF3C 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}>
              ADITYA
              <br />
              SAXENA<span className="text-neon-magenta">.</span>
            </h1>

            <div className="hero-reveal mt-2 font-display text-2xl sm:text-4xl text-hud-text">
              <GlitchText text="BUILDER · SHIPPER · OPERATOR" />
            </div>

            <p className="hero-reveal mt-5 max-w-xl text-base sm:text-lg text-hud-text/80">
              {profile.tagline}
            </p>

            <div className="hero-reveal mt-8 flex flex-wrap items-center gap-3">
              <a href="#missions" className="btn-primary">
                PLAY MY QUESTS <span>→</span>
              </a>
              <a href="#comms" className="btn-secondary">
                LFG · SAY HI
              </a>
            </div>

            {/* Stats row */}
            <div className="hero-reveal mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className={`relative card-base rounded-2xl p-4 border ${accentBorder[s.accent] || 'border-hud-line'} hover:-translate-y-1 transition-transform duration-300`}>
                  <div className="font-display text-3xl sm:text-4xl text-holo">{s.value}</div>
                  <div className="font-mono uppercase tracking-[0.22em] text-[10px] mt-2 text-hud-dim">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side player card */}
          <div className="hero-reveal col-span-12 lg:col-span-4">
            <div className="relative card-base card-holo rounded-3xl p-6 sm:p-7 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-neon-magenta/30 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-neon-cyan/25 blur-3xl" />

              <div className="relative flex items-center justify-between mb-5">
                <span className="chip-violet">PLAYER CARD</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-hud-dim">
                  REV.2026
                </span>
              </div>

              <div className="relative grid grid-cols-2 gap-3 font-mono text-[12px]">
                <Cell label="CALLSIGN" value="A. SAXENA" />
                <Cell label="HANDLE" value={profile.handle.replace('@', '')} />
                <Cell label="SECTOR" value="BLR · IN" />
                <Cell label="CLASS" value="PRODUCT.ENG" />
                <Cell label="CURRENT" value="GOCOMET" accent="magenta" />
                <Cell label="STACK" value="NEXT · R3F" accent="cyan" />
                <Cell label="ACADEMY" value="MAIT 22-26" />
                <Cell label="RANK" value="S" accent="gold" />
              </div>

              <div className="hud-divider my-5" />

              <ul className="relative font-mono text-[12px] text-hud-text/85 leading-relaxed space-y-1">
                <li className="flex gap-2">
                  <span className="text-neon-cyan">▸</span>
                  <span>AI agents booking real meetings</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-magenta">▸</span>
                  <span>Dashboards live on office TVs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-neon-lime">▸</span>
                  <span>Prompts across 3,000+ accounts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className="relative mt-16 z-10">
        <TickerStrip />
      </div>

      {/* Bottom indicator */}
      <div className="container-x c-space mt-6 flex items-center justify-between font-mono uppercase tracking-[0.3em] text-[10px] relative z-10">
        <span className="text-holo">SCROLL ↓ TO CONTINUE</span>
        <span className="hidden sm:inline text-hud-dim">{profile.email}</span>
      </div>
    </section>
  );
};

const Cell = ({ label, value, accent }) => {
  const accentClass = {
    magenta: 'text-neon-magenta',
    cyan: 'text-neon-cyan',
    gold: 'text-neon-gold',
  };
  return (
    <div className="rounded-xl border border-hud-line bg-void-700/40 p-2.5">
      <div className="text-hud-dim uppercase tracking-[0.22em] text-[9px]">{label}</div>
      <div className={`mt-0.5 text-hud-text ${accentClass[accent] || ''}`}>{value}</div>
    </div>
  );
};

export default Hero;
