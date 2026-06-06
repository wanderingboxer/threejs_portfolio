import { useEffect, useRef, useState } from 'react';

import { askAditya } from '../lib/ai.js';
import { suggestions } from '../lib/knowledge.js';
import { tickSound, clickSound, achievementSound } from '../lib/sound.js';

const initialMessage = {
  role: 'assistant',
  content:
    "Hey — I'm Aditya AI. I know everything in his resume: GoComet work, projects, stack, certs, availability. Ask me anything.",
};

const BOOT_LINES = [
  'INITIALIZING ADITYA-GPT',
  'LOADING RESUME · CONTEXT WINDOW',
  'INDEXING PROJECTS · 6 / 6',
  'WARMING UP NEURAL CORE',
  'READY · YOU MAY ASK',
];

const BOOT_KEY = 'portfolio:aiBooted';

const AIAgent = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [booting, setBooting] = useState(false);
  const [bootLine, setBootLine] = useState(0);
  const [bootProgress, setBootProgress] = useState(0);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const openAgent = () => {
    setPulse(false);
    clickSound();
    const hasBooted = (() => {
      try {
        return !!localStorage.getItem(BOOT_KEY);
      } catch {
        return false;
      }
    })();
    if (!hasBooted) {
      setBooting(true);
      setBootLine(0);
      setBootProgress(0);
    } else {
      setOpen(true);
    }
  };

  // Run boot sequence
  useEffect(() => {
    if (!booting) return;
    let i = 0;
    const lineT = setInterval(() => {
      i += 1;
      setBootLine(i);
      if (i >= BOOT_LINES.length) clearInterval(lineT);
    }, 380);
    const progT = setInterval(() => {
      setBootProgress((p) => Math.min(100, p + Math.random() * 8 + 5));
    }, 90);
    const doneT = setTimeout(() => {
      clearInterval(lineT);
      clearInterval(progT);
      setBootProgress(100);
      achievementSound();
      setTimeout(() => {
        setBooting(false);
        setOpen(true);
        try { localStorage.setItem(BOOT_KEY, '1'); } catch {}
      }, 450);
    }, 2200);
    return () => {
      clearInterval(lineT);
      clearInterval(progT);
      clearTimeout(doneT);
    };
  }, [booting]);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 280);
    }
  }, [open]);

  const send = async (raw) => {
    const text = (raw ?? input).trim();
    if (!text || thinking) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: text }]);
    setThinking(true);
    clickSound();

    // Streamed-feel: build the reply char by char from the resolved string.
    try {
      const reply = await askAditya(text, messages);
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);
      const total = reply.length;
      const step = Math.max(2, Math.floor(total / 80));
      let i = 0;
      const tick = setInterval(() => {
        i = Math.min(total, i + step);
        setMessages((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          if (last && last.role === 'assistant') {
            next[next.length - 1] = { role: 'assistant', content: reply.slice(0, i) };
          }
          return next;
        });
        if (i >= total) {
          clearInterval(tick);
          setThinking(false);
        }
      }, 18);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'Hmm — connection blip. Try again in a sec.' },
      ]);
      setThinking(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  return (
    <>
      {/* Boot takeover */}
      {booting && (
        <div className="ai-boot-overlay">
          <div className="ai-boot-card">
            <div className="ai-boot-orb">
              <div className="ring2" />
              <div className="ring1" />
              <div className="core">AI</div>
            </div>
            <div className="font-display text-[10px] uppercase tracking-[0.4em] text-neon-cyan/80">
              SYSTEM
            </div>
            <div className="font-display text-2xl sm:text-3xl text-rainbow mt-2 leading-[1]">
              ADITYA-GPT
            </div>
            <div className="font-mono text-[11px] text-hud-text/80 mt-5 min-h-[80px] text-left max-w-xs mx-auto">
              {BOOT_LINES.slice(0, bootLine).map((line, i) => (
                <div key={i} className={i === bootLine - 1 ? 'text-neon-cyan' : 'text-hud-text/60'}>
                  ▸ {line}
                  {i === bootLine - 1 && i < BOOT_LINES.length - 1 && <span className="typing-caret" />}
                </div>
              ))}
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.3em] text-hud-dim mb-2">
                <span>LOAD</span>
                <span className="text-holo">{Math.floor(bootProgress)}%</span>
              </div>
              <div className="holo-xp-track h-2">
                <div
                  className="holo-xp-fill transition-[width] duration-200"
                  style={{ width: `${bootProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating launcher */}
      <button
        onClick={() => (open ? setOpen(false) : openAgent())}
        onMouseEnter={() => tickSound()}
        className={`ai-launcher ${pulse ? 'ai-launcher-pulse' : ''}`}
        aria-label="Open Aditya AI">
        <span className="ai-launcher-orb">
          <span className="ai-launcher-ring" />
          <span className="ai-launcher-core">AI</span>
        </span>
        <span className="ai-launcher-label">
          <span className="block font-display text-[11px] tracking-[0.22em] text-white">
            ASK ADITYA AI
          </span>
          <span className="block font-mono text-[9px] tracking-[0.3em] text-white/60">
            POWERED BY HIS BRAIN
          </span>
        </span>
      </button>

      {/* Panel */}
      <div className={`ai-panel ${open ? 'ai-panel-open' : ''}`} aria-hidden={!open}>
        <div className="ai-panel-inner">
          <div className="ai-panel-head">
            <div className="flex items-center gap-2.5">
              <span className="ai-orb-mini">
                <span className="ai-orb-mini-core">AI</span>
              </span>
              <div>
                <div className="font-display text-sm tracking-[0.18em] text-white">
                  ADITYA AI
                </div>
                <div className="font-mono text-[10px] tracking-[0.28em] text-neon-lime flex items-center gap-1.5">
                  <span className="dot-lime" /> ONLINE
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white text-xl leading-none px-2"
              aria-label="Close">
              ×
            </button>
          </div>

          <div ref={scrollRef} className="ai-panel-scroll">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`ai-msg ${m.role === 'user' ? 'ai-msg-user' : 'ai-msg-bot'}`}>
                {m.role === 'assistant' && (
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-holo mb-1">
                    ADITYA AI
                  </div>
                )}
                <div className="whitespace-pre-line">{m.content || (thinking ? '…' : '')}</div>
              </div>
            ))}
            {thinking && messages[messages.length - 1]?.role === 'user' && (
              <div className="ai-msg ai-msg-bot">
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-holo mb-1">
                  ADITYA AI
                </div>
                <div className="ai-typing">
                  <span /> <span /> <span />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="ai-suggestions">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="ai-chip">
                  {s}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="ai-form">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Aditya…"
              className="ai-input"
            />
            <button type="submit" className="ai-send" disabled={!input.trim() || thinking}>
              SEND ↗
            </button>
          </form>

          <div className="ai-foot">
            <span>Runs locally · upgrades to Claude when API key set</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAgent;
