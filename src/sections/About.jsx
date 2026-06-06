import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import HoloGlobe from '../components/HoloGlobe.jsx';
import HudFrame from '../components/HudFrame.jsx';
import SkillBar from '../components/SkillBar.jsx';
import { profile, skills, achievements, education } from '../constants/index.js';

gsap.registerPlugin(ScrollTrigger);

const tierStyles = {
  GOLD: 'border-neon-amber/60 text-neon-amber',
  SILVER: 'border-hud-text/40 text-hud-text',
  BRONZE: 'border-neon-magenta/40 text-neon-magenta',
};

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
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="profile" className="section-wrap">
      <div className="container-x c-space">
        {/* Heading */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="hud-eyebrow text-neon-cyan/80">// SECTOR 02 — PILOT PROFILE</div>
            <h2 className="display-text mt-3 text-4xl sm:text-6xl">
              <span className="text-hud-text">PILOT</span>{' '}
              <span className="text-gradient-cyber">DOSSIER</span>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-hud-dim">
            <span className="blink-dot-cyan" /> AUTH OK
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* BIO */}
          <HudFrame className="about-card col-span-12 lg:col-span-7 frame-cut p-6 sm:p-8" label="BIO.LOG">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="hud-eyebrow">{profile.callsign}</div>
                <div className="font-display text-2xl sm:text-3xl text-hud-text mt-1">
                  PRODUCT ENGINEER
                </div>
                <div className="font-mono text-xs text-neon-cyan/80 mt-1">{profile.role}</div>
              </div>
              <div className="font-mono text-[11px] text-right">
                <div className="text-hud-dim uppercase tracking-[0.2em] text-[9px]">CLASS</div>
                <div className="text-hud-text mt-1">BUILDER/OPS</div>
              </div>
            </div>

            <div className="hud-divider my-4" />

            <p className="text-hud-text/85 leading-relaxed font-sans">
              {profile.bio}
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat label="LOC" value="BLR · IN" />
              <Stat label="EDU" value="MAIT" />
              <Stat label="FOCUS" value="AI · OPS" />
              <Stat label="STATUS" value="HIRING-READY" accent="lime" />
            </div>
          </HudFrame>

          {/* LOCATION HOLO */}
          <HudFrame
            className="about-card col-span-12 lg:col-span-5 frame-cut p-6 flex flex-col"
            label="GEO.LINK"
            accent="magenta">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-[11px] text-hud-dim uppercase tracking-[0.25em]">
                COORDINATES
              </div>
              <div className="font-mono text-[11px] text-neon-magenta">
                12.97°N · 77.59°E
              </div>
            </div>
            <div className="relative w-full h-[260px] sm:h-[300px]">
              <HoloGlobe />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
                <span className="text-neon-magenta">▲ BANGALORE.IN</span>
                <span className="text-hud-dim">REMOTE-READY</span>
              </div>
            </div>
            <p className="font-sans text-sm text-hud-text/80 mt-2">
              Based in Bangalore. Flexible across timezones — open to remote roles worldwide.
            </p>
          </HudFrame>

          {/* TECH STACK */}
          <HudFrame
            className="about-card col-span-12 lg:col-span-7 frame-cut p-6 sm:p-8"
            label="LOADOUT.SKILLS"
            accent="lime">
            <div className="flex items-center justify-between mb-6">
              <div className="font-display text-xl text-hud-text">TECH LOADOUT</div>
              <div className="font-mono text-[11px] text-neon-lime">
                {Object.values(skills).flat().length} MODULES
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {Object.entries(skills).map(([group, items]) => (
                <div key={group}>
                  <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-neon-cyan/80 mb-3">
                    [{group}]
                  </div>
                  <div className="space-y-3.5">
                    {items.map((s) => (
                      <SkillBar key={s.name} {...s} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </HudFrame>

          {/* ACHIEVEMENTS */}
          <HudFrame
            className="about-card col-span-12 lg:col-span-5 frame-cut p-6 sm:p-8"
            label="ACHIEVEMENTS"
            accent="amber">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display text-xl text-hud-text">CERTS · UNLOCKED</div>
              <div className="font-mono text-[11px] text-neon-amber">
                {achievements.length} / {achievements.length}
              </div>
            </div>
            <ul className="space-y-3">
              {achievements.map((a) => (
                <li
                  key={a.code}
                  className="flex items-center gap-3 p-3 border border-hud-line bg-void-700/40 frame-cut-sm">
                  <span
                    className={`shrink-0 inline-flex items-center justify-center w-9 h-9 border-2 font-display text-[11px] ${
                      tierStyles[a.tier] || 'border-hud-line text-hud-text'
                    }`}>
                    {a.tier[0]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-hud-text truncate">{a.title}</div>
                    <div className="font-mono text-[10px] text-hud-dim uppercase tracking-[0.2em] mt-0.5">
                      {a.issuer}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-neon-cyan/80">{a.code}</span>
                </li>
              ))}
            </ul>
          </HudFrame>

          {/* EDUCATION */}
          <HudFrame
            className="about-card col-span-12 sm:col-span-7 frame-cut p-6"
            label="EDU.LOG">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-hud-dim">
                ACADEMY
              </div>
              <span className="chip chip-cyan">{education.status}</span>
            </div>
            <div className="font-display text-xl text-hud-text">{education.school}</div>
            <div className="font-mono text-xs text-hud-text/80 mt-1">{education.degree}</div>
            <div className="font-mono text-[11px] text-neon-cyan mt-2 uppercase tracking-[0.25em]">
              {education.duration}
            </div>
          </HudFrame>

          {/* COMMS */}
          <HudFrame
            className="about-card col-span-12 sm:col-span-5 frame-cut p-6 flex flex-col justify-between"
            label="COMMS.PING"
            accent="magenta">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-hud-dim mb-2">
                DIRECT LINK
              </div>
              <div className="font-display text-lg sm:text-xl text-neon-magenta break-all">
                {profile.email}
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="neon-btn-magenta mt-5 w-full justify-center">
              {hasCopied ? '> COPIED ✓' : '> COPY ADDRESS'}
            </button>
          </HudFrame>
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value, accent }) => (
  <div className="border border-hud-line bg-void-700/40 p-3 frame-cut-sm">
    <div className="font-mono uppercase tracking-[0.2em] text-[9px] text-hud-dim">{label}</div>
    <div className={`mt-1 font-display text-sm ${accent === 'lime' ? 'text-neon-lime' : 'text-hud-text'}`}>
      {value}
    </div>
  </div>
);

export default About;
