import { useEffect, useState } from 'react';

const BOOT_LINES = [
  '> INIT PILOT.OS v2.0',
  '> LOADING NEURAL.CORE ............... [OK]',
  '> MOUNTING TELEMETRY/HUD ............ [OK]',
  '> SYNCING MISSION LOG ............... [OK]',
  '> ESTABLISHING COMMS LINK ........... [OK]',
  '> AUTH: ADITYA.SAXENA',
  '> SYSTEM READY — WELCOME, OPERATOR.',
];

const BootScreen = ({ onComplete }) => {
  const [printed, setPrinted] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let i = 0;
    const lineTimer = setInterval(() => {
      if (i >= BOOT_LINES.length) {
        clearInterval(lineTimer);
        setDone(true);
        return;
      }
      setPrinted((p) => [...p, BOOT_LINES[i]]);
      i += 1;
    }, 220);

    const progTimer = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 9 + 4;
        return next >= 100 ? 100 : next;
      });
    }, 140);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progTimer);
    };
  }, []);

  useEffect(() => {
    if (done && progress >= 100) {
      const t = setTimeout(() => setHide(true), 500);
      const t2 = setTimeout(() => onComplete && onComplete(), 1200);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }
  }, [done, progress, onComplete]);

  return (
    <div
      className="boot-screen transition-opacity duration-700"
      style={{ opacity: hide ? 0 : 1, pointerEvents: hide ? 'none' : 'auto' }}>
      <div className="absolute inset-0 bg-grid-dense opacity-30" />
      <div className="absolute inset-0 bg-radial-fade" />

      <div className="relative w-[min(560px,92vw)] z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="blink-dot-cyan" />
            <span className="hud-eyebrow text-neon-cyan/80">SYSTEM BOOT</span>
          </div>
          <span className="hud-eyebrow">v2.0.0</span>
        </div>

        <div className="hud-panel frame-cut p-5 sm:p-7 font-mono text-[12px] sm:text-sm leading-relaxed">
          <span className="hud-corner hud-corner-tl" />
          <span className="hud-corner hud-corner-tr" />
          <span className="hud-corner hud-corner-bl" />
          <span className="hud-corner hud-corner-br" />

          <div className="text-hud-text/90 whitespace-pre-line min-h-[180px]">
            {printed.map((l, idx) => (
              <div
                key={idx}
                className={
                  l.includes('[OK]')
                    ? 'text-hud-text'
                    : l.startsWith('> AUTH')
                      ? 'text-neon-magenta'
                      : l.startsWith('> SYSTEM READY')
                        ? 'text-neon-lime'
                        : 'text-neon-cyan'
                }>
                {l}
              </div>
            ))}
            <div className="typing-caret text-neon-cyan h-4" />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-[10px] text-hud-dim mb-2">
              <span>LOAD</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div className="skill-bar-track">
              <div
                className="skill-bar-fill transition-[width] duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between hud-eyebrow text-hud-dim">
          <span>BLR · 12.97°N 77.59°E</span>
          <span className="text-neon-cyan/70">PILOT-04052</span>
        </div>
      </div>
    </div>
  );
};

export default BootScreen;
