import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';
import SceneBoundary from '../components/SceneBoundary.jsx';

const accentTextClass = {
  cyan: 'text-neon-cyan',
  magenta: 'text-neon-magenta',
  lime: 'text-neon-lime',
  amber: 'text-neon-amber',
  violet: 'text-neon-violet',
};

const accentChipClass = {
  cyan: 'chip-cyan',
  magenta: 'chip-magenta',
  lime: 'chip-lime',
  amber: 'chip-amber',
  violet: 'chip-violet',
};

const accentCardClass = {
  cyan: 'card-cyan',
  magenta: 'card-magenta',
  lime: 'card-lime',
  amber: 'card-amber',
  violet: 'card-violet',
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
    <section ref={sectionRef} id="missions" className="section-wrap relative">
      <div className="aurora" />
      <div className="container-x c-space relative">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <div className="hud-eyebrow text-neon-cyan/80">// LEVEL 03 — QUEST SELECT</div>
            <h2 className="display-text mt-3 text-4xl sm:text-6xl">
              <span className="text-hud-text">SELECTED</span>{' '}
              <span className="text-holo">QUESTS</span>
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-hud-dim">
            <span>QUEST</span>
            <span className="text-holo font-bold">
              {String(index + 1).padStart(2, '0')} / {String(myProjects.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 items-stretch">
          {/* ===== Quest brief ===== */}
          <div
            className={`relative col-span-12 lg:col-span-6 card-base card-holo ${accentCardClass[project.accent] || ''} rounded-3xl p-6 sm:p-8 flex flex-col overflow-hidden`}>
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-neon-magenta/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-neon-cyan/20 blur-3xl pointer-events-none" />

            <div className="relative flex items-center justify-between mb-4 flex-wrap gap-2">
              <span className={`${accentChipClass[project.accent] || 'chip-cyan'}`}>
                {project.code} · {project.status}
              </span>
              <span className="chip-gold">★ {project.badge}</span>
            </div>

            <h3 className="mission-reveal display-text text-3xl sm:text-5xl text-hud-text leading-[0.95] mt-2">
              {project.title}
            </h3>
            <p
              className={`mission-reveal mt-3 font-display text-sm sm:text-base uppercase tracking-[0.15em] ${accentTextClass[project.accent] || 'text-neon-cyan'}`}>
              {project.sub}
            </p>

            <div className="mission-reveal hud-divider my-5" />

            <p className="mission-reveal text-hud-text/85 leading-relaxed">{project.desc}</p>

            <div className="mission-reveal mt-5 grid grid-cols-3 gap-2 sm:gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-hud-line bg-void-700/50 p-2.5 sm:p-3 hover:border-neon-violet/50 transition-colors">
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-hud-dim">
                    {m.label}
                  </div>
                  <div className="font-display text-sm sm:text-base text-holo mt-1">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="mission-reveal mt-5 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="chip-soft">{t}</span>
              ))}
            </div>

            <div className="mt-auto pt-7 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button onClick={() => nav('prev')} className="btn-secondary !px-4 !py-2.5">
                  ‹ PREV
                </button>
                <button onClick={() => nav('next')} className="btn-secondary !px-4 !py-2.5">
                  NEXT ›
                </button>
              </div>
              <a href={project.href} target="_blank" rel="noreferrer" className="btn-primary">
                PLAY LIVE <span>↗</span>
              </a>
            </div>

            {/* Mission selector dots */}
            <div className="mt-5 flex items-center gap-1.5">
              {myProjects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index
                      ? 'w-10'
                      : 'w-5 bg-hud-line hover:bg-hud-dim'
                  }`}
                  style={
                    i === index
                      ? {
                          background:
                            'linear-gradient(90deg,#00F0FF,#9B5DE5,#FF2E97)',
                          boxShadow: '0 0 12px rgba(255,46,151,0.6)',
                        }
                      : {}
                  }
                  aria-label={`Quest ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ===== Live preview viewport ===== */}
          <div className="relative col-span-12 lg:col-span-6 card-base card-holo rounded-3xl overflow-hidden min-h-[440px] lg:min-h-0">
            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em]">
              <span className="text-holo flex items-center gap-2">
                <span className="dot-magenta" />
                PREVIEW · LIVE
              </span>
              <span className="text-hud-dim">TARGET: {project.code}</span>
            </div>

            <div className="absolute inset-0 bg-grid-dense opacity-25 pointer-events-none" />

            <div className="absolute inset-0">
              <SceneBoundary>
                <Canvas dpr={[1, 1.25]} gl={{ powerPreference: 'high-performance' }}>
                  <ambientLight intensity={Math.PI} />
                  <directionalLight position={[10, 10, 5]} intensity={0.9} color="#FF2E97" />
                  <directionalLight position={[-10, 5, -5]} intensity={0.6} color="#00F0FF" />
                  <pointLight position={[0, 0, 5]} intensity={0.5} color="#B6FF3C" />
                  <Center>
                    <Suspense fallback={<CanvasLoader />}>
                      <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                        <DemoComputer texture={project.texture} />
                      </group>
                    </Suspense>
                  </Center>
                  <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
                </Canvas>
              </SceneBoundary>
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-hud-dim">
              <span className="text-neon-lime">{project.impact}</span>
              <span>DRAG TO ROTATE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
