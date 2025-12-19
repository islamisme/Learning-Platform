/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'brand': {
          'dark': '#050615',
          'darker': '#0F1223',
          'accent': '#60F5FF',
          'purple': '#6C47FF',
          'pink': '#FF7DE8',
          'light': '#F5F7FF',
          'muted': '#B7BCD9',
          'dim': '#C7CCF5',
        }
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #050615 0%, #1F1A55 50%, #6C47FF 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(15,18,35,0.8) 0%, rgba(26,29,58,0.6) 100%)',
        'gradient-glow': 'radial-gradient(circle, rgba(96,245,255,0.1) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(96,245,255,0.15)',
        'glow-purple': '0 0 20px rgba(108,71,255,0.15)',
        'glow-pink': '0 0 20px rgba(255,125,232,0.15)',
        'card': '0 8px 32px -12px rgba(96,245,255,0.15)',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(96,245,255,0.15)' },
          '50%': { boxShadow: '0 0 30px rgba(96,245,255,0.3)' },
        },
      },
    },
  },
  plugins: [],
}