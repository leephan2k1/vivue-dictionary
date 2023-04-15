/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      fontFamily: {
        main: 'Nunito, sans-serif'
      },
      colors: {
        ['main-background']: '#111116',
        main: '#42d392',
        content: '#9ca3af'
      }
    }
  },
  plugins: []
};
