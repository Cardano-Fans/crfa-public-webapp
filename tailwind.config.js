module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#E64646',
        dark: '#00082D',
        card: 'rgba(255,255,255, .04)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
