import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Strict Design Tokens from User Specification
        brand: {
          black: '#0D0D0D',
          darkWarm: '#14110C',
          deep: '#080808',
          gold: '#C8A24A',
          goldLight: '#E3C06F',
          goldDark: '#B8892F',
          cream: '#F4ECD8',
          muted: '#A9A294',
          ivory: '#F6F0E3',
          ivoryText: '#1A1712',
          darkGold: '#7A5C16',
        },
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
        xl: '4px',
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", 'Georgia', 'serif'],
        sans: ["'Inter'", 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
