/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '104': '28rem',
      }
    },
    colors: {
      'red': '#e20100',
      'white': '#FFFFFF',
      'black': '#191818',
      'grey': '#aaacb1'
    },
    fontWeight: {
      fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 900,
      }
    }
  },
  plugins: [],
}
