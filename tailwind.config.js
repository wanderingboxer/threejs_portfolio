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
          DEFAULT: '#07061A',
          900: '#07061A',
          800: '#0E0B2A',
          700: '#171338',
          600: '#211C48',
          500: '#2C2660',
          400: '#3A3380',
        },
        neon: {
          cyan: '#00F0FF',
          magenta: '#FF2E97',
          pink: '#FF5DA2',
          lime: '#B6FF3C',
          amber: '#FFB347',
          orange: '#FF6B35',
          violet: '#9B5DE5',
          indigo: '#7C5BFF',
          gold: '#FFD24A',
        },
        hud: {
          text: '#EDE9FF',
          dim: '#8B8AB0',
          line: '#2A2754',
          ok: '#5CFF9D',
          warn: '#FFB347',
          err: '#FF3D6E',
        },
      },
      backgroundImage: {
        'grid-cyber':
          'linear-gradient(rgba(124,91,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,91,255,0.08) 1px, transparent 1px)',
        'aurora':
          'radial-gradient(circle at 20% 20%, rgba(255,46,151,0.35), transparent 45%), radial-gradient(circle at 80% 30%, rgba(0,240,255,0.25), transparent 45%), radial-gradient(circle at 50% 90%, rgba(155,93,229,0.35), transparent 50%)',
        'holo': 'linear-gradient(120deg, #00F0FF 0%, #9B5DE5 35%, #FF2E97 65%, #FFB347 100%)',
        'holo-soft':
          'linear-gradient(120deg, rgba(0,240,255,0.18) 0%, rgba(155,93,229,0.18) 35%, rgba(255,46,151,0.18) 65%, rgba(255,179,71,0.18) 100%)',
      },
      boxShadow: {
        'neon-cyan': '0 0 12px rgba(0,240,255,0.6), 0 0 32px rgba(0,240,255,0.3)',
        'neon-magenta': '0 0 12px rgba(255,46,151,0.65), 0 0 32px rgba(255,46,151,0.3)',
        'neon-lime': '0 0 12px rgba(182,255,60,0.65), 0 0 32px rgba(182,255,60,0.3)',
        'neon-violet': '0 0 12px rgba(155,93,229,0.6), 0 0 32px rgba(155,93,229,0.28)',
        'neon-gold': '0 0 12px rgba(255,210,74,0.6), 0 0 32px rgba(255,210,74,0.28)',
        'card-hover': '0 22px 60px -20px rgba(124,91,255,0.45), 0 0 0 1px rgba(255,46,151,0.35)',
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
        'blob-1': 'blob1 18s ease-in-out infinite',
        'blob-2': 'blob2 22s ease-in-out infinite',
        'blob-3': 'blob3 26s ease-in-out infinite',
        shimmer: 'shimmer 3.5s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
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
          '0%,100%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-1px, 1px)' },
          '40%': { transform: 'translate(1px, -1px)' },
          '60%': { transform: 'translate(-1px, -1px)' },
          '80%': { transform: 'translate(1px, 1px)' },
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
        blob1: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(40px,-30px) scale(1.15)' },
        },
        blob2: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(-30px,40px) scale(1.1)' },
        },
        blob3: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(20px,30px) scale(0.92)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientX: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
