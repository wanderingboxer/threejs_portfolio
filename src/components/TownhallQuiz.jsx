import { useEffect, useRef, useState } from 'react';

import { QUIZ_QUESTIONS, QUIZ_DURATION, rankFor } from '../lib/quiz.js';
import { achievementSound, clickSound, rankUpSound, tickSound } from '../lib/sound.js';

const ACCENT = {
  magenta: { fill: 'linear-gradient(135deg,#FF2E97,#9B5DE5)', text: 'text-neon-magenta', glow: '0 0 24px rgba(255,46,151,0.6)' },
  cyan: { fill: 'linear-gradient(135deg,#00F0FF,#7C5BFF)', text: 'text-neon-cyan', glow: '0 0 24px rgba(0,240,255,0.6)' },
  lime: { fill: 'linear-gradient(135deg,#B6FF3C,#00F0FF)', text: 'text-neon-lime', glow: '0 0 24px rgba(182,255,60,0.6)' },
  violet: { fill: 'linear-gradient(135deg,#9B5DE5,#FF2E97)', text: 'text-neon-violet', glow: '0 0 24px rgba(155,93,229,0.6)' },
  amber: { fill: 'linear-gradient(135deg,#FFD24A,#FF6B35)', text: 'text-neon-amber', glow: '0 0 24px rgba(255,210,74,0.6)' },
};

const ANSWER_COLORS = ['#FF2E97', '#00F0FF', '#B6FF3C', '#FFD24A'];

const MAX_POINTS = 1000;

const computePoints = (timeLeft) => {
  // Linear with a tiny floor: 200 + up to 800 from speed
  const base = 200;
  const bonus = Math.round((timeLeft / QUIZ_DURATION) * 800);
  return Math.min(MAX_POINTS, base + bonus);
};

const TownhallQuiz = ({ open, onClose }) => {
  const [phase, setPhase] = useState('intro'); // intro | playing | reveal | done
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picks, setPicks] = useState([]); // [{i, correct, points}]
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [pickedIdx, setPickedIdx] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!open) {
      // Reset when closed
      setPhase('intro');
      setIndex(0);
      setScore(0);
      setPicks([]);
      setTimeLeft(QUIZ_DURATION);
      setPickedIdx(null);
      clearInterval(intervalRef.current);
    }
  }, [open]);

  useEffect(() => {
    if (phase !== 'playing') return;
    setTimeLeft(QUIZ_DURATION);
    setPickedIdx(null);
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) {
          clearInterval(intervalRef.current);
          handleAnswer(null);
          return 0;
        }
        return t - 0.1;
      });
    }, 100);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, index]);

  const handleAnswer = (chosenIdx) => {
    clearInterval(intervalRef.current);
    setPickedIdx(chosenIdx);
    clickSound();
    const q = QUIZ_QUESTIONS[index];
    const correct = chosenIdx === q.correct;
    const pts = correct ? computePoints(timeLeft) : 0;
    setPicks((prev) => [...prev, { i: chosenIdx, correct, points: pts }]);
    if (correct) {
      setScore((s) => s + pts);
      setTimeout(() => achievementSound(), 220);
    }
    setPhase('reveal');
  };

  const goNext = () => {
    clickSound();
    if (index + 1 >= QUIZ_QUESTIONS.length) {
      setPhase('done');
      setTimeout(() => rankUpSound(), 200);
      setTimeout(() => achievementSound(), 800);
    } else {
      setIndex((i) => i + 1);
      setPhase('playing');
    }
  };

  if (!open) return null;

  const total = QUIZ_QUESTIONS.length;
  const max = total * MAX_POINTS;
  const q = QUIZ_QUESTIONS[index];
  const accent = ACCENT[q?.accent || 'magenta'];
  const result = rankFor(score, max);

  return (
    <div className="quiz-stage" role="dialog" aria-label="Townhall Quiz">
      {/* Animated background */}
      <div
        className="quiz-bg"
        style={
          phase === 'playing' || phase === 'reveal'
            ? { background: `radial-gradient(120% 80% at 50% 0%, ${accent.fill.replace('linear-gradient(135deg,', '').replace(')', '')} 0%, transparent 60%), #07061A` }
            : undefined
        }
      />
      <div className="quiz-grain" />

      <button onClick={onClose} className="quiz-close" aria-label="Close quiz">
        × CLOSE
      </button>

      {phase === 'intro' && (
        <div className="quiz-card max-w-2xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-neon-gold">
            EXCLUSIVE · PLAYABLE PROD
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-rainbow mt-3 leading-[0.95]">
            TOWNHALL
            <br />
            QUIZ
          </h2>
          <p className="text-hud-text/85 mt-5 max-w-md mx-auto">
            The actual Kahoot-style quiz Aditya built for GoComet — 200 employees played the
            live version. This is a portable cut with 7 questions about him.
          </p>

          <div className="grid grid-cols-3 gap-3 mt-7 max-w-sm mx-auto">
            <Stat label="QUESTIONS" value={String(QUIZ_QUESTIONS.length).padStart(2, '0')} />
            <Stat label="TIMER" value={`${QUIZ_DURATION}s`} />
            <Stat label="MAX SCORE" value={(max / 1000).toFixed(0) + 'K'} />
          </div>

          <button
            onClick={() => {
              clickSound();
              setPhase('playing');
            }}
            className="btn-primary mt-8 !px-10 !py-4 text-sm">
            PRESS START → PLAY
          </button>

          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-hud-dim mt-4">
            Faster answers = higher score
          </div>
        </div>
      )}

      {(phase === 'playing' || phase === 'reveal') && q && (
        <div className="quiz-card max-w-3xl">
          {/* Header row */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="chip-gold">Q · {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
              <span className={`chip ${accent.text} border-current`}>
                {q.accent.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-hud-dim">SCORE</span>
              <span className="font-display text-2xl text-holo">{score.toLocaleString()}</span>
            </div>
          </div>

          {/* Timer ring */}
          <div className="quiz-timer">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" stroke="rgba(255,255,255,0.12)" strokeWidth="6" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke={ANSWER_COLORS[index % ANSWER_COLORS.length]}
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={2 * Math.PI * 46 * (1 - timeLeft / QUIZ_DURATION)}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
              <text x="50" y="56" textAnchor="middle" fill="#fff" fontSize="22" fontFamily="Orbitron, sans-serif" fontWeight="700">
                {timeLeft.toFixed(1)}
              </text>
            </svg>
          </div>

          {/* Question */}
          <h3 className="font-display text-2xl sm:text-4xl text-white mt-3 leading-[1.05]">
            {q.q}
          </h3>

          {/* Options */}
          <div className="grid sm:grid-cols-2 gap-3 mt-7">
            {q.options.map((opt, i) => {
              const isCorrect = phase === 'reveal' && i === q.correct;
              const isWrongPick = phase === 'reveal' && i === pickedIdx && i !== q.correct;
              const muted = phase === 'reveal' && !isCorrect && !isWrongPick;
              return (
                <button
                  key={i}
                  disabled={phase !== 'playing'}
                  onClick={() => handleAnswer(i)}
                  onMouseEnter={() => phase === 'playing' && tickSound()}
                  className={`quiz-opt ${isCorrect ? 'quiz-opt-correct' : ''} ${isWrongPick ? 'quiz-opt-wrong' : ''} ${muted ? 'opacity-40' : ''}`}
                  style={{
                    background:
                      phase === 'reveal' && isCorrect
                        ? 'linear-gradient(135deg, #5CFF9D, #B6FF3C)'
                        : phase === 'reveal' && isWrongPick
                          ? 'linear-gradient(135deg, #FF3D6E, #FF6B35)'
                          : 'rgba(255,255,255,0.06)',
                  }}>
                  <span
                    className="quiz-opt-badge"
                    style={{ background: ANSWER_COLORS[i] }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="quiz-opt-text">{opt}</span>
                </button>
              );
            })}
          </div>

          {phase === 'reveal' && (
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-sm text-hud-text/85 max-w-lg">
                <span className="text-neon-cyan font-mono uppercase tracking-[0.22em] text-[10px] block mb-1">
                  CONTEXT
                </span>
                {q.detail}
              </div>
              <button onClick={goNext} className="btn-primary">
                {index + 1 >= total ? 'SEE RESULTS →' : 'NEXT QUESTION →'}
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="quiz-card max-w-2xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-neon-gold">
            GAME COMPLETE · RANK ASSIGNED
          </div>
          <div className="mt-3 grid grid-cols-2 gap-6 items-center">
            <div>
              <div className="font-display text-7xl sm:text-8xl text-rainbow leading-none">
                {result.tier}
              </div>
              <div className="font-display text-xl text-hud-text mt-2 tracking-[0.22em]">
                {result.rank}
              </div>
              <div className="font-mono text-xs text-hud-dim mt-1 max-w-xs">{result.praise}</div>
            </div>
            <div className="space-y-3">
              <Stat label="SCORE" value={score.toLocaleString()} highlight />
              <Stat label="MAX" value={max.toLocaleString()} />
              <Stat label="CORRECT" value={`${picks.filter((p) => p.correct).length} / ${total}`} />
            </div>
          </div>

          <div className="hud-divider my-6" />

          {/* Per-question recap */}
          <div className="grid grid-cols-7 gap-2">
            {QUIZ_QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-8 rounded-md flex items-center justify-center font-mono text-[10px] ${
                  picks[i]?.correct
                    ? 'bg-neon-lime/15 text-neon-lime border border-neon-lime/40'
                    : 'bg-neon-magenta/15 text-neon-magenta border border-neon-magenta/40'
                }`}>
                {String(i + 1).padStart(2, '0')}
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                clickSound();
                setPhase('intro');
                setIndex(0);
                setScore(0);
                setPicks([]);
              }}
              className="btn-secondary">
              ↺ PLAY AGAIN
            </button>
            <a
              href={`mailto:aditya.saxena4052@gmail.com?subject=${encodeURIComponent(
                `Townhall Quiz · ${result.rank} (${score.toLocaleString()})`
              )}&body=${encodeURIComponent(
                `Hey Aditya — I just played the Townhall quiz on your portfolio and ranked ${result.rank} with ${score.toLocaleString()} points. Wanted to say hi.`
              )}`}
              onClick={clickSound}
              className="btn-primary">
              SEND MY SCORE → ADITYA
            </a>
            <button onClick={onClose} className="btn-ghost">
              × CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Stat = ({ label, value, highlight }) => (
  <div className="rounded-xl border border-hud-line bg-void-700/50 p-3 text-left">
    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-hud-dim">{label}</div>
    <div className={`mt-1 font-display text-2xl ${highlight ? 'text-holo' : 'text-hud-text'}`}>
      {value}
    </div>
  </div>
);

export default TownhallQuiz;
