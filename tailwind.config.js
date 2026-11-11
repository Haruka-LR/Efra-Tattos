/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#d4af37',
          500: '#c5a059',
          600: '#997c36',
        },
        silver: {
          100: '#f5f5f7',
          200: '#e5e5ea',
          300: '#d1d1d6',
          400: '#9e9ea7',
          500: '#6c6c75',
        },
        dark: {
          950: '#070708',
          900: '#0d0d0f',
          850: '#121215',
          800: '#18181d',
          700: '#23232a',
          600: '#32323c',
        }
      },
      fontFamily: {
        heading: ['Cinzel', 'serif'],
        gothic: ['"Cinzel Decorative"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-silver': '0 0 25px rgba(220, 220, 235, 0.15)',
        'glow-white': '0 0 35px rgba(255, 255, 255, 0.2)',
      }
    },
  },
  plugins: [],
}
