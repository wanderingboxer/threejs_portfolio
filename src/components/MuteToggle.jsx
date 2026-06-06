import { useEffect, useState } from 'react';

import {
  initMuteFromStorage,
  isMuted,
  setMuted,
  startAmbient,
  stopAmbient,
} from '../lib/sound.js';

const Wave = ({ on }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M11 5L6 9H3v6h3l5 4V5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {on ? (
      <>
        <path d="M16 8c1.5 1.4 1.5 6.6 0 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 5c3 2.5 3 11.5 0 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </>
    ) : (
      <path d="M16 8l5 8M21 8l-5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    )}
  </svg>
);

const MuteToggle = () => {
  const [on, setOn] = useState(false); // true = sound on

  useEffect(() => {
    initMuteFromStorage();
    setOn(!isMuted());
    if (!isMuted()) startAmbient();
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    setMuted(!next);
    if (next) startAmbient();
    else stopAmbient();
  };

  return (
    <button
      onClick={toggle}
      data-magnetic
      className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hud-line bg-void-700/70 hover:border-neon-cyan/60 transition-colors font-mono text-[10px] uppercase tracking-[0.28em]"
      aria-label={on ? 'Mute sound' : 'Unmute sound'}>
      <span className={on ? 'text-neon-lime' : 'text-hud-dim'}>
        <Wave on={on} />
      </span>
      <span className={on ? 'text-neon-lime' : 'text-hud-dim'}>
        {on ? 'SOUND ON' : 'SOUND OFF'}
      </span>
    </button>
  );
};

export default MuteToggle;
