import { useEffect, useState } from 'react';

const LINES = [
  { t: '> Spinning up the arcade...', c: 'text-neon-cyan' },
  { t: '> Loading inventory & power-ups', c: 'text-neon-violet' },
  { t: '> Mounting quest log', c: 'text-neon-lime' },
  { t: '> Sync XP · trophies · stats', c: 'text-neon-amber' },
  { t: '> Pilot recognised: ADITYA.SAXENA', c: 'text-neon-magenta' },
  { t: '> Ready Player 1 ✦', c: 'text-neon-gold' },
];

const BootScreen = ({ onComplete }) => {
  const [printed, setPrinted] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let i = 0;
    const lineT = setInterval(() => {
      if (i >= LINES.length) {
        clearInterval(lineT);
        setDone(true);
        return;
      }
      setPrinted((p) => [...p, LINES[i]]);
      i += 1;
    }, 220);

    const progT = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 9 + 4));
    }, 140);

    return () => {
      clearInterval(lineT);
      clearInterval(progT);
    };
  }, []);

  useEffect(() => {
    if (done && progress >= 100) {
      const t1 = setTimeout(() => setHide(true), 500);
      const t2 = setTimeout(() => onComplete && onComplete(), 1200);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [done, progress, onComplete]);

  return (
    <div
      className="boot-screen transition-opacity duration-700"
      style={{ opacity: hide ? 0 : 1, pointerEvents: hide ? 'none' : 'auto' }}>
      <div className="absolute inset-0 bg-grid-dense opacity-30" />
      <div className="aurora" />

      <div className="relative w-[min(560px,92vw)] z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="dot-cyan" />
            <span className="font-mono uppercase tracking-[0.35em] text-[10px] text-hud-text/90">
              GAME LOADING
            </span>
          </div>
          <span className="font-mono uppercase tracking-[0.35em] text-[10px] text-hud-dim">
            v2.0 · ARCADE
          </span>
        </div>

        <div className="relative card-base card-holo rounded-3xl p-6 sm:p-8 font-mono text-[13px] leading-relaxed overflow-hidden">
          <div className="text-hud-text/90 whitespace-pre-line min-h-[180px]">
            {printed.map((l, idx) => (
              <div key={idx} className={l.c}>
                {l.t}
              </div>
            ))}
            <div className="typing-caret text-neon-cyan h-4" />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-[10px] text-hud-dim mb-2 font-mono uppercase tracking-[0.25em]">
              <span>Loading</span>
              <span className="text-holo">{Math.floor(progress)}%</span>
            </div>
            <div className="xp-track h-2.5">
              <div
                className="xp-fill transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between font-mono uppercase tracking-[0.35em] text-[10px] text-hud-dim">
          <span>BLR · 12.97°N 77.59°E</span>
          <span className="text-holo">PRESS START</span>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
