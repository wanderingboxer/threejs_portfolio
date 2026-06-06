// Web Audio API synth engine. No audio files — everything is generated.
// Singleton style. Survives HMR. Respects a global mute flag.

let ctx = null;
let masterGain = null;
let ambientNodes = null;
let muted = true; // default OFF — user must opt-in (browser autoplay rules)

const ensure = () => {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    ctx = new Ctx();
    masterGain = ctx.createGain();
    masterGain.gain.value = muted ? 0 : 0.45;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
};

export const isMuted = () => muted;

export const setMuted = (next) => {
  muted = !!next;
  if (masterGain) {
    masterGain.gain.cancelScheduledValues(ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(muted ? 0 : 0.45, ctx.currentTime + 0.15);
  }
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('portfolio:muted', muted ? '1' : '0');
    } catch {}
  }
};

export const initMuteFromStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    const v = localStorage.getItem('portfolio:muted');
    if (v !== null) muted = v === '1';
  } catch {}
};

// ---- Helpers ----------------------------------------------------------------
const env = (gain, t, attack, decay, peak = 1) => {
  gain.gain.cancelScheduledValues(t);
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(peak, t + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
};

// ---- Public triggers --------------------------------------------------------

export const tickSound = () => {
  if (muted) return;
  const c = ensure();
  if (!c) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1400, t);
  osc.frequency.exponentialRampToValueAtTime(900, t + 0.05);
  env(g, t, 0.001, 0.07, 0.16);
  osc.connect(g);
  g.connect(masterGain);
  osc.start(t);
  osc.stop(t + 0.09);
};

export const clickSound = () => {
  if (muted) return;
  const c = ensure();
  if (!c) return;
  const t = c.currentTime;
  // tonal blip
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(380, t);
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.12);
  env(g, t, 0.001, 0.16, 0.22);
  osc.connect(g);
  g.connect(masterGain);
  osc.start(t);
  osc.stop(t + 0.2);

  // noise transient
  const noiseBuf = c.createBuffer(1, c.sampleRate * 0.05, c.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = c.createBufferSource();
  src.buffer = noiseBuf;
  const ng = c.createGain();
  ng.gain.value = 0.12;
  const filt = c.createBiquadFilter();
  filt.type = 'highpass';
  filt.frequency.value = 1800;
  src.connect(filt);
  filt.connect(ng);
  ng.connect(masterGain);
  src.start(t);
};

export const rankUpSound = () => {
  if (muted) return;
  const c = ensure();
  if (!c) return;
  const t = c.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = 'triangle';
    osc.frequency.value = freq;
    const start = t + i * 0.08;
    env(g, start, 0.005, 0.35, 0.28);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(start);
    osc.stop(start + 0.5);
  });
};

export const achievementSound = () => {
  if (muted) return;
  const c = ensure();
  if (!c) return;
  const t = c.currentTime;
  const seq = [659.25, 880, 1318.5];
  seq.forEach((f, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = 'sine';
    o.frequency.value = f;
    const start = t + i * 0.06;
    env(g, start, 0.005, 0.18, 0.3);
    o.connect(g);
    g.connect(masterGain);
    o.start(start);
    o.stop(start + 0.25);
  });
};

export const startAmbient = () => {
  const c = ensure();
  if (!c) return;
  if (ambientNodes) return;
  const t = c.currentTime;

  // Low drone
  const drone = c.createOscillator();
  drone.type = 'sawtooth';
  drone.frequency.value = 55; // ~A1
  const droneGain = c.createGain();
  droneGain.gain.value = 0.0;
  const filt = c.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.value = 240;
  drone.connect(filt);
  filt.connect(droneGain);
  droneGain.connect(masterGain);
  drone.start(t);
  droneGain.gain.linearRampToValueAtTime(0.18, t + 1.2);

  // Slow LFO pad
  const pad = c.createOscillator();
  pad.type = 'sine';
  pad.frequency.value = 220;
  const padGain = c.createGain();
  padGain.gain.value = 0.0;
  const lfo = c.createOscillator();
  lfo.frequency.value = 0.12;
  const lfoGain = c.createGain();
  lfoGain.gain.value = 0.06;
  lfo.connect(lfoGain);
  lfoGain.connect(padGain.gain);
  pad.connect(padGain);
  padGain.connect(masterGain);
  pad.start(t);
  lfo.start(t);
  padGain.gain.linearRampToValueAtTime(0.08, t + 2.5);

  ambientNodes = { drone, droneGain, pad, padGain, lfo, lfoGain, filt };
};

export const stopAmbient = () => {
  if (!ambientNodes || !ctx) return;
  const t = ctx.currentTime;
  try {
    ambientNodes.droneGain.gain.linearRampToValueAtTime(0, t + 0.4);
    ambientNodes.padGain.gain.linearRampToValueAtTime(0, t + 0.4);
    setTimeout(() => {
      try {
        ambientNodes.drone.stop();
        ambientNodes.pad.stop();
        ambientNodes.lfo.stop();
      } catch {}
      ambientNodes = null;
    }, 500);
  } catch {}
};
