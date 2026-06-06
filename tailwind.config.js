/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        void: {
          DEFAULT: '#05060A',
          900: '#05060A',
          800: '#0A0C14',
          700: '#10121C',
          600: '#161826',
          500: '#1E2030',
          400: '#262A3C',
        },
        neon: {
          cyan: '#00F0FF',
          magenta: '#FF2E97',
          lime: '#B6FF3C',
          amber: '#FFB347',
          violet: '#9B5DE5',
        },
        hud: {
          text: '#D9DEEC',
          dim: '#7A8199',
          line: '#1F2436',
          ok: '#5CFF9D',
          warn: '#FFB347',
          err: '#FF3D6E',
        },
      },
      backgroundImage: {
        'grid-cyber':
          'linear-gradient(rgba(0,240,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.06) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(circle at 50% 0%, rgba(0,240,255,0.10), transparent 60%)',
      },
      boxShadow: {
        'neon-cyan': '0 0 12px rgba(0,240,255,0.5), 0 0 32px rgba(0,240,255,0.25)',
        'neon-magenta': '0 0 12px rgba(255,46,151,0.55), 0 0 32px rgba(255,46,151,0.25)',
        'neon-lime': '0 0 12px rgba(182,255,60,0.55), 0 0 32px rgba(182,255,60,0.25)',
        'hud': '0 0 0 1px rgba(0,240,255,0.18), inset 0 0 28px rgba(0,240,255,0.04)',
      },
      animation: {
        flicker: 'flicker 4s linear infinite',
        scanline: 'scanline 8s linear infinite',
        glitch: 'glitch 2.4s steps(1) infinite',
        blink: 'blink 1.1s steps(2, start) infinite',
        marquee: 'marquee 28s linear infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'spin-rev': 'spinRev 24s linear infinite',
        'float-y': 'floatY 6s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%,19.999%,22%,62.999%,64%,64.999%,70%,100%': { opacity: 1 },
          '20%,21.999%,63%,63.999%,65%,69.999%': { opacity: 0.7 },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(1px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
          '100%': { transform: 'translate(0,0)' },
        },
        blink: {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: 0.9 },
          '50%': { opacity: 0.4 },
        },
        spinRev: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        floatY: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
