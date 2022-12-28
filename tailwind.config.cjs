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
          0: "#ffffff",
          10: "#ececec",
          20: "#e5e5e5",
          50: "#d9d9d9",
          100: "#cccccc",
          200: "#c0c0c0",
          300: "#3a3a3a",
          400: "#3d3d3d",
          500: "#333333",
          600: "#262626",
          700: "#212121",
          800: "#181818",
          900: "#090909"
        }
      }
    },
  },
  plugins: [],
}