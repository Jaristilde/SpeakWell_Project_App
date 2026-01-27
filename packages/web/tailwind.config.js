/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          DEFAULT: '#0B4CDC',
          50: '#E6EEFB',
          100: '#C2D4F6',
          200: '#85A9ED',
          300: '#487FE4',
          400: '#1F5FD8',
          500: '#0B4CDC',
          600: '#0839A8',
          700: '#062875',
          800: '#041A4D',
          900: '#020D26',
        },
        teal: {
          DEFAULT: '#06B6D4',
        },
        emerald: {
          DEFAULT: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
