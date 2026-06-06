import { Html, useProgress } from '@react-three/drei';

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center font-mono text-xs text-neon-cyan/80">
        <div className="w-28 h-28 border border-neon-cyan/40 rounded-full animate-spin-slow flex items-center justify-center">
          <div className="w-16 h-16 border border-neon-magenta/50 rounded-full animate-spin-rev" />
        </div>
        <div className="mt-3 uppercase tracking-[0.3em]">
          {progress !== 0 ? `${progress.toFixed(0)}%` : 'BOOTING'}
        </div>
      </div>
    </Html>
  );
};

export default CanvasLoader;
