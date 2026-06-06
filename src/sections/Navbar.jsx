import { useEffect, useState } from 'react';

import { navLinks, profile } from '../constants/index.js';
import SystemClock from '../components/SystemClock.jsx';

const NavItems = ({ onClick, activeId }) => (
  <ul className="flex flex-col sm:flex-row gap-1 sm:gap-1">
    {navLinks.map((item) => {
      const active = activeId === item.href.slice(1);
      return (
        <li key={item.id}>
          <a
            href={item.href}
            onClick={onClick}
            className={`group relative flex items-center gap-2 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors ${
              active ? 'text-neon-cyan' : 'text-hud-dim hover:text-hud-text'
            }`}>
            <span className="text-neon-cyan/60 group-hover:text-neon-cyan">[{item.key}]</span>
            <span className="holo-underline">{item.name}</span>
            {active && (
              <span className="absolute -bottom-px left-3 right-3 h-px bg-neon-cyan shadow-neon-cyan" />
            )}
          </a>
        </li>
      );
    })}
  </ul>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-void-900/85 backdrop-blur border-b border-hud-line' : 'bg-transparent'
      }`}>
      {/* Top sysbar */}
      <div className="hidden md:flex container-x c-space pt-3 items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-hud-dim">
        <div className="flex items-center gap-4">
          <span className="text-neon-cyan/80">SYS://PORTFOLIO.LIVE</span>
          <span className="text-hud-dim">·</span>
          <span>{profile.codename}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="blink-dot" /> ONLINE
          </span>
          <SystemClock />
        </div>
      </div>

      <div className="container-x c-space">
        <div className="flex items-center justify-between py-3 sm:py-4">
          <a href="#home" className="flex items-center gap-3">
            <span className="relative inline-flex w-8 h-8 items-center justify-center border border-neon-cyan/60 text-neon-cyan font-display font-black text-sm">
              A
              <span className="absolute -top-px -right-px w-1.5 h-1.5 bg-neon-magenta" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-sm tracking-[0.18em] text-hud-text">
                ADITYA.SAXENA
              </div>
              <div className="hidden sm:block font-mono text-[10px] tracking-[0.3em] text-neon-cyan/70">
                BUILDER · SHIPPER · OPERATOR
              </div>
            </div>
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="sm:hidden text-hud-text border border-hud-line w-9 h-9 flex items-center justify-center font-mono"
            aria-label="Toggle menu">
            {open ? '×' : '≡'}
          </button>

          <nav className="hidden sm:block">
            <NavItems activeId={active} />
          </nav>
        </div>

        <div
          className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            open ? 'max-h-96' : 'max-h-0'
          }`}>
          <div className="py-3 border-t border-hud-line">
            <NavItems activeId={active} onClick={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
