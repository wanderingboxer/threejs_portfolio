import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import Developer from '../components/Developer.jsx';
import CanvasLoader from '../components/Loading.jsx';
import { workExperiences } from '../constants/index.js';

gsap.registerPlugin(ScrollTrigger);

const statusClass = (s) => {
  if (s === 'ONGOING') return 'text-neon-lime border-neon-lime/50';
  return 'text-neon-cyan border-neon-cyan/40';
};

const WorkExperience = () => {
  const [animationName, setAnimationName] = useState('idle');
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.utils.toArray('.log-entry').forEach((el) => {
      gsap.from(el, {
        x: -30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="log" className="section-wrap">
      <div className="container-x c-space">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="hud-eyebrow text-neon-cyan/80">// SECTOR 04 — MISSION LOG</div>
            <h2 className="display-text mt-3 text-4xl sm:text-6xl">
              <span className="text-hud-text">CAREER</span>{' '}
              <span className="text-gradient-cyber">TIMELINE</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-hud-dim">
            <span>{workExperiences.length} ENTRIES</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* Avatar viewport */}
          <div className="relative col-span-12 lg:col-span-5 hud-panel frame-cut overflow-hidden min-h-[420px]">
            <span className="hud-corner hud-corner-tl" />
            <span className="hud-corner hud-corner-tr" />
            <span className="hud-corner hud-corner-bl" />
            <span className="hud-corner hud-corner-br" />

            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
              <span className="text-neon-magenta flex items-center gap-2">
                <span className="blink-dot-magenta" /> AVATAR.LIVE
              </span>
              <span className="text-hud-dim">MODE: {animationName.toUpperCase()}</span>
            </div>

            <div className="absolute inset-0 bg-grid-dense opacity-25 pointer-events-none" />

            <div className="absolute inset-0">
              <Canvas dpr={[1, 1.5]}>
                <ambientLight intensity={5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} color="#00F0FF" />
                <directionalLight position={[-10, 5, 10]} intensity={1} color="#FF2E97" />
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
                <Suspense fallback={<CanvasLoader />}>
                  <Developer position-y={-3} scale={3} animationName={animationName} />
                </Suspense>
              </Canvas>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-hud-dim">
              <span>HOVER LOG → TRIGGER ANIMATION</span>
            </div>
          </div>

          {/* Log timeline */}
          <div className="col-span-12 lg:col-span-7 hud-panel frame-cut p-5 sm:p-7 relative">
            <span className="hud-corner hud-corner-tl" />
            <span className="hud-corner hud-corner-tr" />
            <span className="hud-corner hud-corner-bl" />
            <span className="hud-corner hud-corner-br" />

            <div className="flex items-center justify-between mb-4">
              <span className="hud-label">MISSION.LOG</span>
              <span className="font-mono text-[10px] text-hud-dim">DESC ORDER</span>
            </div>

            <ol className="relative space-y-5 pl-5 sm:pl-7">
              <div className="absolute left-1.5 sm:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan/60 via-neon-magenta/40 to-transparent" />
              {workExperiences.map((item) => (
                <li
                  key={item.id}
                  className="log-entry relative pl-3 sm:pl-4"
                  onMouseEnter={() => setAnimationName(item.animation.toLowerCase())}
                  onMouseLeave={() => setAnimationName('idle')}
                  onClick={() => setAnimationName(item.animation.toLowerCase())}>
                  <span className="absolute -left-[6px] sm:-left-[10px] top-3 w-3 h-3 rounded-full bg-neon-cyan shadow-neon-cyan" />

                  <div className="hud-panel frame-cut-sm p-4 sm:p-5 hover:border-neon-cyan/60 transition-colors duration-300 cursor-pointer">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-neon-cyan/80 uppercase tracking-[0.25em]">
                          {item.code}
                        </span>
                        <span className={`chip ${statusClass(item.status)}`}>● {item.status}</span>
                      </div>
                      <span className="font-mono text-[10px] text-hud-dim uppercase tracking-[0.25em]">
                        {item.timestamp} · {item.location}
                      </span>
                    </div>

                    <div className="mt-3 font-display text-xl sm:text-2xl text-hud-text">
                      {item.company}
                    </div>
                    <div className="font-mono text-xs text-neon-magenta mt-0.5">{item.role}</div>

                    <p className="mt-3 text-sm text-hud-text/80">{item.summary}</p>

                    <ul className="mt-3 space-y-1.5 text-sm text-hud-text/80">
                      {item.objectives.map((o, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="text-neon-cyan shrink-0">▸</span>
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
