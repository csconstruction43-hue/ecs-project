// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pro palette v3 — navy blue + white + black, corporate UK training-site feel
        primary: '#1e3a8a',
        'primary-dark': '#1e293b',
        'primary-light': '#2563eb',
        secondary: '#0f172a',
        'secondary-light': '#1e293b',
        volt: '#0f172a',
        earth: '#15803d',
        live: '#dc2626',
        success: '#15803d',
        danger: '#dc2626',
        warning: '#1e3a8a',
        info: '#0f172a',
      },
      borderColor: {
        success: '#15803d',
        danger: '#dc2626',
        warning: '#1e3a8a',
        info: '#1e293b',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulseSlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}