import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#F36E20',   // Adventure Orange
          hover: '#FDAF16',     // Warm Amber
          soft: '#FFF4EC',      // Soft background tint
        },
      },

      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },

      boxShadow: {
        premium: '0 10px 40px rgba(0,0,0,0.06)',
        brand: '0 10px 30px rgba(243,110,32,0.25)',
      },

      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #F36E20 0%, #FDAF16 100%)',
      },

      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
