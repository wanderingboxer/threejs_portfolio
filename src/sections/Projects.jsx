import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';

const accentClass = {
  cyan: 'text-neon-cyan border-neon-cyan/40',
  magenta: 'text-neon-magenta border-neon-magenta/40',
  lime: 'text-neon-lime border-neon-lime/40',
  amber: 'text-neon-amber border-neon-amber/40',
  violet: 'text-neon-violet border-neon-violet/40',
};

const Projects = () => {
  const [index, setIndex] = useState(0);
  const project = myProjects[index];
  const sectionRef = useRef(null);

  const nav = (dir) =>
    setIndex((p) =>
      dir === 'prev' ? (p === 0 ? myProjects.length - 1 : p - 1) : (p === myProjects.length - 1 ? 0 : p + 1)
    );

  useGSAP(() => {
    gsap.fromTo(
      '.mission-reveal',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.05, ease: 'power2.out' }
    );
  }, { dependencies: [index] });

  return (
    <section ref={sectionRef} id="missions" className="section-wrap">
      <div className="container-x c-space">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="hud-eyebrow text-neon-cyan/80">// SECTOR 03 — MISSION ARCHIVE</div>
            <h2 className="display-text mt-3 text-4xl sm:text-6xl">
              <span className="text-hud-text">SELECTED</span>{' '}
              <span className="text-gradient-cyber">MISSIONS</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-hud-dim">
            <span>BRIEFING</span>
            <span className="text-neon-cyan/80">{String(index + 1).padStart(2, '0')} / {String(myProjects.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 items-stretch">
          {/* Briefing panel */}
          <div className="relative col-span-12 lg:col-span-6 hud-panel frame-cut p-6 sm:p-8 flex flex-col">
            <span className="hud-corner hud-corner-tl" />
            <span className="hud-corner hud-corner-tr" />
            <span className="hud-corner hud-corner-bl" />
            <span className="hud-corner hud-corner-br" />

            <div className="flex items-center justify-between mb-4">
              <span className={`chip ${accentClass[project.accent] || accentClass.cyan}`}>
                {project.code} · {project.status}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-hud-dim">
                {String(index + 1).padStart(2, '0')} / {String(myProjects.length).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mission-reveal display-text text-3xl sm:text-4xl text-hud-text leading-[1] mt-2">
              {project.title}
            </h3>
            <p className="mission-reveal mt-2 font-mono text-sm text-neon-cyan/80 uppercase tracking-[0.18em]">
              {project.sub}
            </p>

            <div className="mission-reveal hud-divider my-5" />

            <p className="mission-reveal text-hud-text/85 leading-relaxed">{project.desc}</p>

            <div className="mission-reveal mt-5 grid grid-cols-3 gap-2 sm:gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="border border-hud-line bg-void-700/40 p-2.5 sm:p-3 frame-cut-sm">
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-hud-dim">{m.label}</div>
                  <div className="font-display text-sm sm:text-base text-hud-text mt-1">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="mission-reveal mt-5 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>

            <div className="mt-auto pt-7 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={() => nav('prev')} className="neon-btn !px-4 !py-2">‹ PREV</button>
                <button onClick={() => nav('next')} className="neon-btn !px-4 !py-2">NEXT ›</button>
              </div>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="neon-btn-magenta !px-4 !py-2">
                <span>OPEN LIVE</span>
                <span>↗</span>
              </a>
            </div>

            {/* Mission selector dots */}
            <div className="mt-5 flex items-center gap-1.5">
              {myProjects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setIndex(i)}
                  className={`h-1 transition-all ${
                    i === index ? 'w-10 bg-neon-cyan shadow-neon-cyan' : 'w-5 bg-hud-line hover:bg-hud-dim'
                  }`}
                  aria-label={`Mission ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Viewport panel */}
          <div className="relative col-span-12 lg:col-span-6 hud-panel frame-cut overflow-hidden min-h-[440px] lg:min-h-0">
            <span className="hud-corner hud-corner-tl" />
            <span className="hud-corner hud-corner-tr" />
            <span className="hud-corner hud-corner-bl" />
            <span className="hud-corner hud-corner-br" />

            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
              <span className="text-neon-cyan/80 flex items-center gap-2">
                <span className="blink-dot-cyan" />
                VIEWPORT.LIVE
              </span>
              <span className="text-hud-dim">TARGET: {project.code}</span>
            </div>

            <div className="absolute inset-0 bg-grid-dense opacity-30 pointer-events-none" />

            <div className="absolute inset-0">
              <Canvas dpr={[1, 1.5]}>
                <ambientLight intensity={Math.PI} />
                <directionalLight position={[10, 10, 5]} intensity={0.8} color="#00F0FF" />
                <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#FF2E97" />
                <Center>
                  <Suspense fallback={<CanvasLoader />}>
                    <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                      <DemoComputer texture={project.texture} />
                    </group>
                  </Suspense>
                </Center>
                <OrbitControls
                  maxPolarAngle={Math.PI / 2}
                  enableZoom={false}
                  enablePan={false}
                />
              </Canvas>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-hud-dim">
              <span>{project.impact}</span>
              <span className="text-neon-cyan/70">DRAG TO ROTATE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
