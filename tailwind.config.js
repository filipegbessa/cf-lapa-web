/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/admin/**/*.{js,ts,jsx,tsx}',
    './components/admin/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E63946',
          dark: '#1B2833',
          light: '#F0F2F5',
        },
      },
    },
  },
  plugins: [],
}
