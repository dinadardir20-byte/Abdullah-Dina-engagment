/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sage-green': '#9CAF88',
        'dusty-rose': '#C9A0A0',
        gold: '#D4AF37',
        cream: '#F5F1E8',
        sage: {
          700: '#4f6145',
          800: '#47573f',
          900: '#38442f',
        },
      },
      fontFamily: {
        calligraphy: ['"Playfair Display"', 'serif'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
