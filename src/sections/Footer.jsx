import { profile } from '../constants/index.js';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-hud-line">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="relative container-x c-space py-10 sm:py-12">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 sm:col-span-5">
            <div className="font-display text-4xl sm:text-5xl">
              <span className="text-rainbow">GAME OVER</span>
              <span className="text-neon-magenta">.</span>
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-hud-dim">
              THANKS FOR PLAYING · DM IF YOU WANT TO START A NEW GAME
            </p>
          </div>

          <div className="col-span-12 sm:col-span-4">
            <div className="font-display text-[10px] uppercase tracking-[0.3em] text-holo mb-3">
              CHANNELS
            </div>
            <div className="flex flex-wrap gap-2">
              <SocialLink href={profile.socials.github} label="GITHUB" />
              <SocialLink href={profile.socials.linkedin} label="LINKEDIN" />
              <SocialLink href={profile.socials.leetcode} label="LEETCODE" />
            </div>
          </div>

          <div className="col-span-12 sm:col-span-3 text-left sm:text-right">
            <div className="font-display text-[10px] uppercase tracking-[0.3em] text-hud-dim">
              BUILD
            </div>
            <div className="font-mono text-xs text-hud-text mt-1">v2.0 · ARCADE</div>
            <div className="font-mono text-[10px] text-hud-dim mt-2">
              © {year} ADITYA SAXENA
            </div>
          </div>
        </div>

        <div className="hud-divider my-8" />

        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-hud-dim">
          <div className="flex items-center gap-3">
            <span className="dot-lime" /> SYSTEM ONLINE
            <span>·</span>
            <span>BLR · 12.97°N 77.59°E</span>
          </div>
          <div className="flex items-center gap-3">
            <span>CRAFTED WITH REACT · R3F · GSAP · TAILWIND</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="chip-soft hover:border-neon-magenta/60 hover:text-neon-magenta transition-colors">
    {label} ↗
  </a>
);

export default Footer;
