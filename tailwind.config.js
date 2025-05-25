/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#1d4ed8',
          600: '#1e40af',
          700: '#1e3a8a',
        },
        baseblue: '#1d57a8',
        darkblue: '#0e3873',
        footerblue: '#072b5c',
        lightblue: '#5d87c2',
        socialblue: '#3d6cad0',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}