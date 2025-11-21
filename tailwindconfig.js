/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif', 'Gilroy'],
        gothic: ['"League Gothic"', 'sans-serif'],
      },
      colors: {
        movwise: "#008236", 
        'convey-green': '#008236',
      },
      keyframes: {
        sliding: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        sliding: 'sliding 1s infinite alternate cubic-bezier(0.77, 0, 0.175, 1)',
      },
    },
  },
  plugins: [],
}
