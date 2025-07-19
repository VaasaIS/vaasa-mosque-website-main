module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#025A3B',
        secondary: 'rgb(202, 233, 222, 0.5)',
        ascent: '#AADBC9',
        'text-color': '#444053',
        'secondary-variant': {
          100: 'rgb(202, 233, 222)',
        },
        'text-color-variant': {
          100: 'rbg(68, 64, 83, 0.1)',
        },
      },
    },
  },
  plugins: [],
}
