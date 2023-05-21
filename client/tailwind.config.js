/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        midnight: '#1A1A2E',
        pastel_red: '#E94560',
        dark_purp: '  #141424'
      },
      html: {
        backgroundColor: '1A1A2E',
      }
    },
  },
  plugins: [],
}

