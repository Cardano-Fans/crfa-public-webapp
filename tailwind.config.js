module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    container: false,
  },
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

  plugins: [
    ({ addComponents, theme }) => {
      addComponents({
        '.container': {
          '@screen sm': {
            maxWidth: theme('screens.sm'),
          },
          '@screen md': {
            maxWidth: theme('screens.md'),
          },
          '@screen lg': {
            maxWidth: theme('screens.lg'),
          },
          '@screen xl': {
            maxWidth: 1140,
          },
          '@screen 2xl': {
            maxWidth: 1320,
          },
        },
      })
    },
  ],
}
