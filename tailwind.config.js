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
        white: { DEFAULT: '#ffffff' },
        // Cyberpunk/Neon colors
        'neon-blue': '#00BFFF',
        'neon-cyan': '#00FFFF',
        'neon-green': '#39FF14',
        'neon-red': '#FF3131',
        'neon-yellow': '#FFD300',
        'matte-black': '#0A0A0A',
        'light-text': '#EAEAEA'
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
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px #00BFFF, 0 0 10px #00BFFF, 0 0 15px #00BFFF'
          },
          '50%': {
            boxShadow: '0 0 10px #00BFFF, 0 0 20px #00BFFF, 0 0 30px #00BFFF'
          }
        },
        'neon-sweep': {
          '0%': {
            boxShadow: '0 0 5px #00BFFF, 0 0 10px #00BFFF, 0 0 15px #00BFFF'
          },
          '100%': {
            boxShadow: '0 0 20px #00BFFF, 0 0 30px #00BFFF, 0 0 40px #00BFFF'
          }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'neon-sweep': 'neon-sweep 0.5s ease-out forwards'
      },
      scale: {
        '102': '1.02',
        '98': '0.98'
      },
      backdropBlur: {
        'xs': '2px'
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00BFFF, 0 0 10px #00BFFF, 0 0 15px #00BFFF',
        'neon-cyan': '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF',
        'neon-green': '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 15px #39FF14',
        'neon-red': '0 0 5px #FF3131, 0 0 10px #FF3131, 0 0 15px #FF3131'
      }
    },
  },
  plugins: [],
}

