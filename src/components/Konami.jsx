import { useEffect, useState } from 'react';

import { achievementSound } from '../lib/sound.js';

const CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const Konami = () => {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let buf = [];
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buf.push(key);
      if (buf.length > CODE.length) buf = buf.slice(-CODE.length);
      const match = buf.length === CODE.length && buf.every((k, i) => k === CODE[i]);
      setProgress(buf.filter((k, i) => k === CODE[i]).length);
      if (match) {
        setActive(true);
        achievementSound();
        document.documentElement.classList.add('god-mode');
        setTimeout(() => {
          setActive(false);
          // Keep god-mode visual on after the first burst — it's a permanent unlock
        }, 4200);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!active) return null;

  return (
    <div className="konami-overlay">
      <div className="konami-card">
        <div className="font-display text-[10px] tracking-[0.35em] text-neon-gold">
          ACHIEVEMENT UNLOCKED
        </div>
        <div className="font-display text-4xl sm:text-5xl text-rainbow mt-2 leading-none">
          GOD MODE
        </div>
        <div className="font-mono text-xs text-white/80 mt-3 tracking-[0.18em] uppercase">
          + 1000 XP · KONAMI MASTER · S+ RANK BOOST
        </div>
      </div>
    </div>
  );
};

export default Konami;
