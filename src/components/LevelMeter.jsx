import { useEffect, useRef, useState } from 'react';
import { rankUpSound } from '../lib/sound.js';

// Scroll-driven Level meter. Climbs from 1 → 99 as the user moves through the
// page. Triggers a chime + flash whenever a tier (every 10 levels) is crossed.

const RANK_TIERS = [
  { at: 99, rank: 'S+', accent: 'text-neon-gold' },
  { at: 88, rank: 'S', accent: 'text-neon-amber' },
  { at: 70, rank: 'A', accent: 'text-neon-magenta' },
  { at: 50, rank: 'B', accent: 'text-neon-violet' },
  { at: 30, rank: 'C', accent: 'text-neon-cyan' },
  { at: 0, rank: 'D', accent: 'text-hud-dim' },
];

const rankFor = (lvl) => {
  for (const t of RANK_TIERS) if (lvl >= t.at) return t;
  return RANK_TIERS[RANK_TIERS.length - 1];
};

const LevelMeter = () => {
  const [level, setLevel] = useState(1);
  const [flash, setFlash] = useState(false);
  const lastTierRef = useRef(0);
  const rafRef = useRef();

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = (doc.scrollHeight - window.innerHeight) || 1;
        const pct = Math.min(1, Math.max(0, window.scrollY / max));
        const lvl = Math.max(1, Math.round(1 + pct * 98));
        setLevel((prev) => {
          if (lvl > prev) {
            const tier = Math.floor(lvl / 10);
            if (tier > lastTierRef.current) {
              lastTierRef.current = tier;
              setFlash(true);
              rankUpSound();
              setTimeout(() => setFlash(false), 700);
            }
          }
          return lvl;
        });
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const rank = rankFor(level);
  const pct = ((level - 1) / 98) * 100;

  return (
    <div className={`level-meter ${flash ? 'level-meter-flash' : ''}`}>
      <div className="level-meter-inner">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-hud-dim">
            LVL
          </span>
          <span className="font-display text-base text-holo leading-none">
            {level.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="level-meter-track">
          <div className="level-meter-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-hud-dim">
            RANK
          </span>
          <span className={`font-display text-base ${rank.accent} leading-none`}>
            {rank.rank}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LevelMeter;
