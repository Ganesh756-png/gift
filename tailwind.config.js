/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        romantic: {
          blush: '#fff0f5',
          softpink: '#ffe5ec',
          candypink: '#ffb3c6',
          hotpink: '#ff8fab',
          lavender: '#f3e8ff',
          deepLavender: '#9333ea',
          cream: '#fffdfa',
          gold: '#e6b980',
          darkGold: '#b8860b',
          velvet: '#4a0e2e',
          burgundy: '#0c3f16ff',
          night: '#130c25',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', '"Great Vibes"', 'cursive'],
        handwriting: ['"Caveat"', '"Sacramento"', 'cursive'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 2.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'candle-flicker': 'flicker 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)', filter: 'drop-shadow(0 0 15px rgba(244,63,94,0.4))' },
          '50%': { opacity: '1', transform: 'scale(1.05)', filter: 'drop-shadow(0 0 25px rgba(244,63,94,0.8))' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flicker: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.95' },
          '25%': { transform: 'scale(1.08, 0.95) rotate(1deg)', opacity: '1' },
          '50%': { transform: 'scale(0.92, 1.05) rotate(-2deg)', opacity: '0.85' },
          '75%': { transform: 'scale(1.05, 0.98) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.92' },
        }
      }
    },
  },
  plugins: [],
}
