import { useEffect, useRef, useState } from 'react';

const SkillBar = ({ name, level }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between font-mono text-[11px]">
        <span className="text-hud-text uppercase tracking-[0.15em]">{name}</span>
        <span className="text-neon-cyan/90">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill transition-[width] duration-[1400ms] ease-out"
          style={{ width: visible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
