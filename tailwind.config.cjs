/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          300: "#3a3a3a",
          400: "#282828",
          600: "#2a2a2a",
          700: "#181818"
        }
      }
    },
  },
  plugins: [],
}