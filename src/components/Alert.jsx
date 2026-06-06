const Alert = ({ type, text }) => {
  const isErr = type === 'danger';
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div
        className={`relative card-base card-holo rounded-2xl px-4 py-3 flex items-center gap-3 font-mono text-xs ${
          isErr ? 'card-magenta text-neon-magenta' : 'card-lime text-neon-lime'
        }`}>
        <span className={`dot ${isErr ? 'dot-magenta' : 'dot-lime'}`} />
        <span className="uppercase tracking-[0.25em]">
          {isErr ? 'TRANSMISSION FAILED' : 'MESSAGE SENT'}
        </span>
        <span className="text-hud-text/90">{text}</span>
      </div>
    </div>
  );
};

export default Alert;
