import { useEffect, useState } from 'react';

import { navLinks, profile } from '../constants/index.js';
import SystemClock from '../components/SystemClock.jsx';

const NavItems = ({ onClick, activeId }) => (
  <ul className="flex flex-col sm:flex-row gap-1 sm:gap-1.5">
    {navLinks.map((item) => {
      const active = activeId === item.href.slice(1);
      return (
        <li key={item.id}>
          <a
            href={item.href}
            onClick={onClick}
            className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-full font-display text-[12px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
              active
                ? 'text-void-900 shadow-neon-magenta'
                : 'text-hud-text hover:text-white'
            }`}
            style={
              active
                ? {
                    background:
                      'linear-gradient(90deg, #00F0FF 0%, #9B5DE5 50%, #FF2E97 100%)',
                  }
                : {}
            }>
            <span
              className={
                active ? 'text-void-900/70' : 'text-neon-cyan/70 group-hover:text-neon-cyan'
              }>
              {item.key}
            </span>
            <span>{item.name}</span>
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
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-void-900/85 backdrop-blur-md border-b border-hud-line' : 'bg-transparent'
      }`}>
      <div className="hidden md:flex container-x c-space pt-3 items-center justify-between text-[10px] font-mono uppercase tracking-[0.3em]">
        <div className="flex items-center gap-4 text-hud-dim">
          <span className="text-holo">PORTFOLIO.LIVE</span>
          <span>·</span>
          <span>{profile.handle}</span>
        </div>
        <div className="flex items-center gap-4 text-hud-dim">
          <span className="flex items-center gap-2 text-neon-lime">
            <span className="dot-lime" /> ONLINE
          </span>
          <SystemClock />
        </div>
      </div>

      <div className="container-x c-space">
        <div className="flex items-center justify-between py-3 sm:py-4">
          <a href="#home" className="flex items-center gap-3">
            <span
              className="relative inline-flex w-9 h-9 items-center justify-center rounded-xl font-display font-black text-sm text-void-900"
              style={{
                background:
                  'linear-gradient(135deg, #00F0FF 0%, #9B5DE5 50%, #FF2E97 100%)',
                boxShadow: '0 0 18px rgba(155,93,229,0.55)',
              }}>
              A
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-neon-gold animate-blink" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-sm tracking-[0.18em] text-hud-text">
                ADITYA.SAXENA
              </div>
              <div className="hidden sm:block font-mono text-[10px] tracking-[0.3em] text-holo">
                BUILDER · SHIPPER · OPERATOR
              </div>
            </div>
          </a>

          <button
            onClick={() => setOpen((o) => !o)}
            className="sm:hidden text-hud-text border border-hud-line w-9 h-9 flex items-center justify-center rounded-full"
            aria-label="Toggle menu">
            {open ? '×' : '≡'}
          </button>

          <nav className="hidden sm:block">
            <NavItems activeId={active} />
          </nav>
        </div>

        <div className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${open ? 'max-h-96' : 'max-h-0'}`}>
          <div className="py-3 border-t border-hud-line">
            <NavItems activeId={active} onClick={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
