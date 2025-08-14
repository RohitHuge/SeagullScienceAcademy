/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grape: { DEFAULT: '#6600a6' },
        eminence: { DEFAULT: '#6c198e' },
        african_violet: { DEFAULT: '#be88d3' },
        jet: { DEFAULT: '#453b44' },
        gold: { DEFAULT: '#f2c94c' },
        white: { DEFAULT: '#ffffff' }
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        numeric: ['Roboto', 'ui-sans-serif', 'system-ui']
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards'
      },
      scale: {
        '102': '1.02',
        '98': '0.98'
      },
      backdropBlur: {
        'xs': '2px'
      }
    },
  },
  plugins: [],
}

