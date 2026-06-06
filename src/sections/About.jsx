import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import HoloGlobe from '../components/HoloGlobe.jsx';
import SkillBar from '../components/SkillBar.jsx';
import { profile, skills, achievements, education } from '../constants/index.js';

gsap.registerPlugin(ScrollTrigger);

const SectionHeading = ({ eyebrow, prefix, accent }) => (
  <div className="flex items-end justify-between gap-6 mb-10">
    <div>
      <div className="hud-eyebrow text-neon-cyan/80">{eyebrow}</div>
      <h2 className="display-text mt-3 text-4xl sm:text-6xl">
        <span className="text-hud-text">{prefix}</span>{' '}
        <span className="text-holo">{accent}</span>
      </h2>
    </div>
  </div>
);

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const sectionRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  useGSAP(() => {
    gsap.utils.toArray('.about-card').forEach((el, i) => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="profile" className="section-wrap relative">
      <div className="aurora" />
      <div className="container-x c-space relative">
        <SectionHeading eyebrow="// LEVEL 02 — CHARACTER STATS" prefix="THE" accent="CHARACTER CARD" />

        <div className="grid grid-cols-12 gap-5">
          {/* ===== Hero player card ===== */}
          <div className="about-card col-span-12 lg:col-span-7 relative card-base card-holo rounded-3xl p-6 sm:p-9 overflow-hidden card-tilt">
            <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-neon-magenta/25 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-neon-cyan/20 blur-3xl" />

            <div className="relative flex items-start justify-between flex-wrap gap-4 mb-6">
              <div>
                <span className="chip-magenta">CHARACTER CARD · S-RANK</span>
                <div className="font-display text-3xl sm:text-5xl text-hud-text mt-3 leading-[1]">
                  THE BUILDER
                </div>
                <div className="font-display text-sm mt-2 text-holo tracking-[0.18em]">
                  PRODUCT ENGINEER · OPS HACKER · UI CRAFTER
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-7xl sm:text-8xl text-rainbow leading-none">
                  S
                </div>
                <div className="font-mono uppercase tracking-[0.3em] text-[10px] text-hud-dim mt-1">
                  RANK
                </div>
              </div>
            </div>

            <div className="hud-divider my-5" />

            <p className="relative text-hud-text/90 leading-relaxed text-base sm:text-lg">
              {profile.bio}
            </p>

            <div className="relative mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat label="LOC" value="BLR · IN" accent="cyan" />
              <Stat label="EDU" value="MAIT" accent="violet" />
              <Stat label="FOCUS" value="AI · OPS" accent="magenta" />
              <Stat label="STATUS" value="HIRING-READY" accent="lime" />
            </div>
          </div>

          {/* ===== Holo globe ===== */}
          <div className="about-card col-span-12 lg:col-span-5 relative card-base card-holo card-violet rounded-3xl p-6 flex flex-col overflow-hidden card-tilt">
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-neon-violet/30 blur-3xl" />
            <div className="flex items-center justify-between mb-3">
              <span className="chip-violet">MAP · WORLD</span>
              <span className="font-mono text-[11px] text-neon-violet">
                12.97°N · 77.59°E
              </span>
            </div>
            <div className="relative w-full h-[260px] sm:h-[290px]">
              <HoloGlobe />
            </div>
            <div className="font-display text-xl text-hud-text mt-2">
              Bangalore <span className="text-neon-magenta">·</span> India
            </div>
            <p className="font-sans text-sm text-hud-text/75 mt-1">
              Flexible across timezones — open to remote roles worldwide.
            </p>
          </div>

          {/* ===== Tech loadout ===== */}
          <div className="about-card col-span-12 lg:col-span-7 relative card-base card-holo card-cyan rounded-3xl p-6 sm:p-9 overflow-hidden card-tilt">
            <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full bg-neon-cyan/20 blur-3xl" />

            <div className="relative flex items-center justify-between mb-6">
              <div>
                <span className="chip-cyan">INVENTORY · LOADOUT</span>
                <div className="font-display text-2xl sm:text-3xl text-hud-text mt-2">
                  EQUIPPED <span className="text-holo">POWERS</span>
                </div>
              </div>
              <span className="font-mono text-[11px] text-neon-cyan">
                {Object.values(skills).flat().length} MODULES
              </span>
            </div>
            <div className="relative grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group}>
                  <div className="font-display text-[11px] uppercase tracking-[0.3em] text-holo mb-3">
                    ▸ {group}
                  </div>
                  <div className="space-y-3.5">
                    {items.map((s) => (
                      <SkillBar key={s.name} {...s} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Trophy cabinet ===== */}
          <div className="about-card col-span-12 lg:col-span-5 relative card-base card-holo card-amber rounded-3xl p-6 sm:p-8 overflow-hidden card-tilt">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-neon-amber/25 blur-3xl" />
            <div className="relative flex items-center justify-between mb-5">
              <div>
                <span className="chip-amber">TROPHY ROOM</span>
                <div className="font-display text-2xl text-hud-text mt-2">
                  ACHIEVEMENTS
                </div>
              </div>
              <span className="font-mono text-[11px] text-neon-amber">
                {achievements.length} / {achievements.length}
              </span>
            </div>
            <ul className="relative space-y-3">
              {achievements.map((a) => (
                <li
                  key={a.code}
                  className="group flex items-center gap-3 p-3 rounded-2xl border border-hud-line bg-void-700/40 hover:border-neon-amber/60 transition-all duration-300">
                  <span
                    className={`shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl font-display text-base font-black tier-${a.tier}`}>
                    {a.tier}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] text-hud-text truncate">{a.title}</div>
                    <div className="font-mono text-[10px] text-hud-dim uppercase tracking-[0.22em] mt-0.5">
                      {a.issuer} · {a.label}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Education ===== */}
          <div className="about-card col-span-12 sm:col-span-7 relative card-base card-holo card-lime rounded-3xl p-6 sm:p-7 overflow-hidden card-tilt">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-neon-lime/20 blur-3xl" />
            <div className="relative flex items-center justify-between mb-3">
              <span className="chip-lime">ACADEMY</span>
              <span className="chip-soft">{education.status}</span>
            </div>
            <div className="relative font-display text-2xl text-hud-text">{education.school}</div>
            <div className="font-mono text-sm text-hud-text/80 mt-1">{education.degree}</div>
            <div className="font-display text-[12px] text-holo mt-3 tracking-[0.22em]">
              {education.duration}
            </div>
          </div>

          {/* ===== Comms ping ===== */}
          <div className="about-card col-span-12 sm:col-span-5 relative card-base card-holo card-magenta rounded-3xl p-6 flex flex-col justify-between overflow-hidden card-tilt">
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-neon-magenta/30 blur-3xl" />
            <div className="relative">
              <span className="chip-magenta">COMMS · PING</span>
              <div className="font-mono text-xs text-hud-dim uppercase tracking-[0.25em] mt-3">
                DIRECT LINK
              </div>
              <div className="font-display text-lg sm:text-xl text-hud-text break-all mt-1">
                {profile.email}
              </div>
            </div>
            <button onClick={handleCopy} className="btn-primary mt-5 justify-center w-full">
              {hasCopied ? 'COPIED ✓' : 'COPY ADDRESS'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value, accent }) => {
  const color = {
    cyan: 'text-neon-cyan',
    magenta: 'text-neon-magenta',
    lime: 'text-neon-lime',
    violet: 'text-neon-violet',
    gold: 'text-neon-gold',
  };
  return (
    <div className="rounded-xl border border-hud-line bg-void-700/40 p-3">
      <div className="font-mono uppercase tracking-[0.22em] text-[9px] text-hud-dim">{label}</div>
      <div className={`mt-1 font-display text-sm ${color[accent] || 'text-hud-text'}`}>{value}</div>
    </div>
  );
};

export default About;
