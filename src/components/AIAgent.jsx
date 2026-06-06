import { useEffect, useRef, useState } from 'react';

import { askAditya } from '../lib/ai.js';
import { suggestions } from '../lib/knowledge.js';
import { tickSound, clickSound } from '../lib/sound.js';

const initialMessage = {
  role: 'assistant',
  content:
    "Hey — I'm Aditya AI. I know everything in his resume: GoComet work, projects, stack, certs, availability. Ask me anything.",
};

const AIAgent = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [pulse, setPulse] = useState(true);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

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
      {/* Floating launcher */}
      <button
        onClick={() => {
          setOpen((o) => !o);
          setPulse(false);
          clickSound();
        }}
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
