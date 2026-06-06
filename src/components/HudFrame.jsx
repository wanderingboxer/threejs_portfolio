const HudFrame = ({ children, className = '', glow = false, label, accent = 'cyan' }) => {
  const accentMap = {
    cyan: 'border-neon-cyan/50 text-neon-cyan',
    magenta: 'border-neon-magenta/50 text-neon-magenta',
    lime: 'border-neon-lime/50 text-neon-lime',
    amber: 'border-neon-amber/50 text-neon-amber',
    violet: 'border-neon-violet/50 text-neon-violet',
  };

  return (
    <div className={`relative ${glow ? 'hud-panel-glow' : 'hud-panel'} ${className}`}>
      <span className={`hud-corner hud-corner-tl ${accentMap[accent] || accentMap.cyan}`} />
      <span className={`hud-corner hud-corner-tr ${accentMap[accent] || accentMap.cyan}`} />
      <span className={`hud-corner hud-corner-bl ${accentMap[accent] || accentMap.cyan}`} />
      <span className={`hud-corner hud-corner-br ${accentMap[accent] || accentMap.cyan}`} />
      {label && (
        <div className="absolute -top-2.5 left-4 px-2 bg-void-900 font-mono uppercase tracking-[0.3em] text-[10px] text-neon-cyan/80">
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

export default HudFrame;
