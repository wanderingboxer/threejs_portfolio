const Alert = ({ type, text }) => {
  const isErr = type === 'danger';
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div
        className={`hud-panel frame-cut-sm flex items-center gap-3 px-4 py-3 font-mono text-xs ${
          isErr ? 'border-hud-err/60 text-hud-err' : 'border-hud-ok/60 text-hud-ok'
        }`}>
        <span className={`blink-dot${isErr ? '-magenta' : ''}`} />
        <span className="uppercase tracking-[0.25em]">
          {isErr ? '> TRANSMISSION FAILED' : '> TRANSMISSION RECEIVED'}
        </span>
        <span className="text-hud-text/90">{text}</span>
      </div>
    </div>
  );
};

export default Alert;
