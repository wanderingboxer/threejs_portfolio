import { useEffect, useState } from 'react';

const pad = (n) => n.toString().padStart(2, '0');

const SystemClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return (
    <span className="font-mono text-[11px] tracking-[0.25em] text-neon-cyan/80">
      {time} <span className="text-hud-dim">IST</span>
    </span>
  );
};

export default SystemClock;
