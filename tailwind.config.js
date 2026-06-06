module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0B0A08',
        espresso: '#1A130C',
        brown: '#2A1F14',
        gold: '#D4AF37',
        goldDark: '#B8945F',
        royal: '#142B5C',
        royalDark: '#0F1E3D',
        ivory: '#F5F1EA',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.25em',
      }
    },
  },
  plugins: [],
}
