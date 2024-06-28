module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gray: {
        900: '#1a1a1a',
      },
      yellow: {
        500: '#FFD700',
      },
      blue: {
        600: '#1e40af',
        700: '#1e3a8a',
      },
      green: {
        500: '#10b981',
        600: '#059669',
        700: '#047857',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
