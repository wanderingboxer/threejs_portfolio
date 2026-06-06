import { useEffect, useState } from 'react';

const pad = (n) => n.toString().padStart(2, '0');

const fmt = (date, tz) => {
  try {
    const f = new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    return f.format(date);
  } catch {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }
};

const LiveTime = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const blr = fmt(now, 'Asia/Kolkata');
  const visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'local';
  const visitor = fmt(now, visitorTz);
  const sameZone = visitorTz === 'Asia/Kolkata';

  return (
    <div className="font-mono text-[10px] tracking-[0.25em] flex items-center gap-3">
      <span className="text-neon-cyan/90">
        BLR <span className="text-white">{blr}</span>
      </span>
      {!sameZone && (
        <span className="text-hud-dim">
          / YOU <span className="text-hud-text">{visitor}</span>
        </span>
      )}
    </div>
  );
};

export default LiveTime;
