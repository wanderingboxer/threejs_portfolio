import { useRef } from 'react';

import { profile } from '../constants/index.js';

const HoloCard = () => {
  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const foilRef = useRef(null);

  const handleMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rotY = (px - 0.5) * 20;
    const rotX = -(py - 0.5) * 16;
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;

    if (shineRef.current) {
      shineRef.current.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(255,255,255,0.18), transparent 45%)`;
    }
    if (foilRef.current) {
      const hueShift = px * 360;
      foilRef.current.style.background = `linear-gradient(${hueShift}deg, rgba(0,240,255,0.55), rgba(155,93,229,0.55) 30%, rgba(255,46,151,0.55) 55%, rgba(255,210,74,0.55) 80%, rgba(182,255,60,0.55))`;
      foilRef.current.style.opacity = 0.55;
      foilRef.current.style.mixBlendMode = 'color-dodge';
      foilRef.current.style.transform = `translate(${(px - 0.5) * 18}px, ${(py - 0.5) * 18}px)`;
    }
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    if (foilRef.current) {
      foilRef.current.style.opacity = 0.25;
      foilRef.current.style.transform = 'translate(0,0)';
    }
    if (shineRef.current) shineRef.current.style.background = 'transparent';
  };

  return (
    <div className="holo-stage" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div ref={cardRef} className="holo-card" data-cursor="hover">
        {/* Background gradient */}
        <div className="absolute inset-0 holo-bg" />
        {/* Foil overlay (animated by mouse) */}
        <div ref={foilRef} className="absolute inset-0 holo-foil" />
        {/* Sparkle pattern */}
        <div className="absolute inset-0 holo-sparkle pointer-events-none" />
        {/* Shine highlight (animated by mouse) */}
        <div ref={shineRef} className="absolute inset-0 pointer-events-none" />

        {/* Card content */}
        <div className="relative z-10 p-6 sm:p-7 h-full flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex w-9 h-9 items-center justify-center rounded-xl font-display font-black text-sm text-void-900"
                style={{
                  background:
                    'linear-gradient(135deg, #00F0FF 0%, #9B5DE5 50%, #FF2E97 100%)',
                  boxShadow: '0 0 12px rgba(155,93,229,0.55)',
                }}>
                A
              </span>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/90">
                PLAYER CARD · S·RANK
              </div>
            </div>
            <span className="font-display text-3xl text-white/95 drop-shadow-[0_0_8px_rgba(255,210,74,0.6)]">
              S
            </span>
          </div>

          <div className="mt-5">
            <div className="font-display text-2xl sm:text-3xl text-white leading-[1]">
              {profile.callsign}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/80 mt-1.5">
              {profile.classType}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 font-mono text-[11px] text-white/90">
            <Cell label="SECTOR" value="BLR · IN" />
            <Cell label="CLASS" value="PRODUCT.ENG" />
            <Cell label="CURRENT" value="GOCOMET" />
            <Cell label="ACADEMY" value="MAIT 22-26" />
          </div>

          <div className="mt-auto pt-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 mb-1.5">
              LVL {profile.level} · {profile.xp} / 100 XP
            </div>
            <div className="holo-xp-track">
              <div className="holo-xp-fill" style={{ width: `${profile.xp}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="holo-card-caption">
        <span className="dot-magenta" />
        TILT WITH CURSOR · COLLECTIBLE EDITION
      </div>
    </div>
  );
};

const Cell = ({ label, value }) => (
  <div className="rounded-lg bg-white/[0.06] backdrop-blur-sm border border-white/15 px-2.5 py-1.5">
    <div className="text-white/50 uppercase tracking-[0.22em] text-[8.5px]">{label}</div>
    <div className="text-white/95 mt-0.5">{value}</div>
  </div>
);

export default HoloCard;
