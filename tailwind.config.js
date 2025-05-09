/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-yellow-400',
    'bg-red-400',
    'bg-blue-400',
    'bg-green-400',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
