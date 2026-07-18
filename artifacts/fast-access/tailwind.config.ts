import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'fa-bg': '#FAFAF9',
        'fa-ink': '#14171A',
        'fa-route': '#1A4D8F',
        'fa-calm': '#2F6B5E',
        'fa-caution': '#C77D22',
        'fa-border': '#E4E1DC',
      },
      fontFamily: {
        sans: ['var(--font-atkinson)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-ibm-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
