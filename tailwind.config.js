/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        khaki: {
          50: '#faf8f5',
          100: '#f4efe6',
          150: '#eee6d8',
          200: '#e5dcce',
          300: '#d5c7b2',
          400: '#bfad91',
          500: '#a38f6f',
          600: '#887455',
          700: '#6d5c43',
          800: '#524533',
          900: '#382f23',
          950: '#241e16',
        },
        mandi: {
          50: '#f2f9f5',
          100: '#e1f2e8',
          200: '#c4e6d3',
          300: '#97d2b4',
          400: '#64b690',
          500: '#2d6a4f',
          600: '#1b4332',
          700: '#16382a',
          800: '#112b20',
          900: '#0c1f17',
          950: '#06110d',
        },
        turmeric: {
          100: '#fef3c7',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
        },
        chilli: {
          100: '#fee2e2',
          400: '#f87171',
          500: '#dc2626',
          600: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite ease-in-out',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        }
      }
    },
  },
  plugins: [],
}
