import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import GlitchText from '../components/GlitchText.jsx';
import TerminalText from '../components/TerminalText.jsx';
import HoloCard from '../components/HoloCard.jsx';
import { profile, stats } from '../constants/index.js';

const TickerStrip = () => {
  const words = ['BUILDER', 'SHIPPER', 'OPERATOR', 'AI AGENTS', 'AUTOMATION', 'FULL-STACK', 'PRODUCT ENG', 'PROMPT OPS'];
  const items = [...words, ...words, ...words];
  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-hud-line bg-void-800/40 backdrop-blur-sm">
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

const accentBorder = {
  cyan: 'border-neon-cyan/40',
  magenta: 'border-neon-magenta/40',
  lime: 'border-neon-lime/40',
  amber: 'border-neon-amber/40',
};

const Hero = () => {
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
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      <div className="container-x c-space relative z-10">
        {/* Top status row */}
        <div className="hero-reveal flex flex-wrap items-center justify-between gap-3 mb-10">
          <span className="chip-lime">
            <span className="dot-lime" /> AVAILABLE FOR HIRE
          </span>
          <span className="chip-gold hidden sm:inline-flex">RANK · {profile.rank}</span>
        </div>

        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Headline column */}
          <div className="col-span-12 lg:col-span-7">
            <div className="hero-reveal font-mono text-[11px] sm:text-xs uppercase tracking-[0.4em] text-neon-cyan/90">
              <TerminalText text="// player 1 — ready" speed={32} />
            </div>

            <h1 className="hero-reveal display-text mt-4 text-[clamp(2.8rem,11vw,9rem)] leading-[0.92] text-holo">
              ADITYA
              <br />
              SAXENA<span className="text-neon-magenta">.</span>
            </h1>

            <div className="hero-reveal mt-3 font-display text-2xl sm:text-4xl text-hud-text">
              <GlitchText text="BUILDER · SHIPPER · OPERATOR" />
            </div>

            <p className="hero-reveal mt-5 max-w-xl text-base sm:text-lg text-hud-text/85">
              {profile.tagline}
            </p>

            <div className="hero-reveal mt-8 flex flex-wrap items-center gap-3">
              <a href="#missions" className="btn-primary" data-magnetic>
                PLAY MY QUESTS <span>→</span>
              </a>
              <a href="#comms" className="btn-secondary" data-magnetic>
                LFG · SAY HI
              </a>
            </div>

            {/* Stats row */}
            <div className="hero-reveal mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              {stats.map((s) => (
                <div
                  key={s.label}
                  data-magnetic
                  className={`relative card-base rounded-2xl p-4 border ${accentBorder[s.accent] || 'border-hud-line'} hover:-translate-y-1 transition-transform duration-300`}>
                  <div className="font-display text-3xl sm:text-4xl text-holo">{s.value}</div>
                  <div className="font-mono uppercase tracking-[0.22em] text-[10px] mt-2 text-hud-dim">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Holographic Player Card — the centerpiece */}
          <div className="hero-reveal col-span-12 lg:col-span-5 flex items-center justify-center">
            <HoloCard />
          </div>
        </div>
      </div>

      <div className="relative mt-16 z-10">
        <TickerStrip />
      </div>

      <div className="container-x c-space mt-6 flex items-center justify-between font-mono uppercase tracking-[0.3em] text-[10px] relative z-10">
        <span className="text-holo">SCROLL ↓ TO CONTINUE</span>
        <span className="hidden sm:inline text-hud-dim">{profile.email}</span>
      </div>
    </section>
  );
};

export default Hero;
