import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { workExperiences } from '../constants/index.js';

gsap.registerPlugin(ScrollTrigger);

const accentChip = {
  magenta: 'chip-magenta',
  cyan: 'chip-cyan',
  lime: 'chip-lime',
  amber: 'chip-amber',
  violet: 'chip-violet',
};
const accentCard = {
  magenta: 'card-magenta',
  cyan: 'card-cyan',
  lime: 'card-lime',
  amber: 'card-amber',
  violet: 'card-violet',
};
const accentDot = {
  magenta: 'dot-magenta',
  cyan: 'dot-cyan',
  lime: 'dot-lime',
};

const WorkExperience = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray('.chapter-card').forEach((el, i) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 0.85,
        delay: i * 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="log" className="section-wrap relative">
      <div className="aurora" />
      <div className="container-x c-space relative">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <div className="hud-eyebrow text-neon-cyan/80">// LEVEL 04 — STORY MODE</div>
            <h2 className="display-text mt-3 text-4xl sm:text-6xl">
              <span className="text-hud-text">CHAPTER</span>{' '}
              <span className="text-holo">HISTORY</span>
            </h2>
          </div>
          <span className="chip-soft">{workExperiences.length} CHAPTERS UNLOCKED</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {workExperiences.map((item) => (
            <div
              key={item.id}
              className={`chapter-card relative card-base card-holo ${accentCard[item.accent] || ''} rounded-3xl p-6 sm:p-7 overflow-hidden card-tilt`}>
              <div
                className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
                  item.accent === 'magenta'
                    ? 'bg-neon-magenta/25'
                    : item.accent === 'cyan'
                      ? 'bg-neon-cyan/25'
                      : 'bg-neon-lime/25'
                }`}
              />

              <div className="relative flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className={accentChip[item.accent] || 'chip-cyan'}>{item.code}</span>
                <span className="chip-soft flex items-center gap-2">
                  {item.status === 'ONGOING' ? <span className="dot-lime" /> : null}
                  {item.status}
                </span>
              </div>

              <div className="relative font-display text-xs uppercase tracking-[0.3em] text-hud-dim">
                {item.timestamp}
              </div>

              <h3 className="relative font-display text-3xl text-hud-text mt-2 leading-[0.95]">
                {item.company}
              </h3>
              <div
                className={`relative font-mono text-xs sm:text-sm mt-1 ${
                  item.accent === 'magenta'
                    ? 'text-neon-magenta'
                    : item.accent === 'cyan'
                      ? 'text-neon-cyan'
                      : 'text-neon-lime'
                }`}>
                {item.role}
              </div>

              <div className="relative hud-divider my-5" />

              <p className="relative text-sm text-hud-text/80">{item.summary}</p>

              <ul className="relative mt-4 space-y-2.5 text-[13px] text-hud-text/80">
                {item.objectives.map((o, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span
                      className={`shrink-0 mt-0.5 ${
                        item.accent === 'magenta'
                          ? 'text-neon-magenta'
                          : item.accent === 'cyan'
                            ? 'text-neon-cyan'
                            : 'text-neon-lime'
                      }`}>
                      ▸
                    </span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-6 pt-4 border-t border-hud-line flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-hud-dim">
                  {item.location}
                </span>
                <span className="text-holo font-display text-[11px] tracking-[0.25em]">
                  +{500 + item.id * 250} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
