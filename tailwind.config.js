/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
      spacing: {
        '104': '28rem',
      }
    },
    colors: {
      'red': '#e20100',
      'white': '#FFFFFF',
      'black': '#191818',
      'grey': '#aaacb1',
      'lightgrey': '#ededee',
      'darkgrey': '#333131'
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
