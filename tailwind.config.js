/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg))',
        surface: 'hsl(var(--surface))',
        'text-primary': 'hsl(var(--text))',
        muted: 'hsl(var(--muted))',
        stroke: 'hsl(var(--stroke))',
        'accent-blue': '#D9DADE',
        'accent-deep': '#A7ABB2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.85' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'breathe-soft': {
          '0%, 100%': { transform: 'scale(0.98)' },
          '50%': { transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 70s linear infinite',
        'spin-medium': 'spin-slow 45s linear infinite',
        'spin-reverse': 'spin-reverse 55s linear infinite',
        'spin-slowest': 'spin-slow 150s linear infinite',
        breathe: 'breathe 9s ease-in-out infinite',
        'breathe-soft': 'breathe-soft 11s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 7s ease-in-out infinite',
        shimmer: 'shimmer 8s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
