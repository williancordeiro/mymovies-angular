/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './components/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffb59b',
        secondary: '#c7c6c6',
        accent: '#fa5c15',
        background_default: '#121212',
        background_black: '#000000'
      },
      fontFamily: {
        headline: ['Be Vietnam Pro', 'sans-serif'],
        body: ['Be Vietnam Pro', 'sans-serif'],
      },
      borderRadius: {
        brand: '0.25rem',
      },
    },
  },
  plugins: [],
};