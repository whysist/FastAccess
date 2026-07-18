import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'fa-bg': '#FAFAF9',
        'fa-ink': '#14171A',
        'fa-ink-muted': '#4B5563', // solid replacement for text-fa-ink/40, /50 etc. -- opacity-diluted
                                    // ink was failing WCAG AA (~3.4:1); this is a real color, not a
                                    // faded one, and holds ~7.2:1 against fa-bg
        'fa-route': '#1A4D8F',
        'fa-calm': '#2F6B5E',
        'fa-caution': '#8A5A18', // darkened from #C77D22 (~3.15:1, failed even at full opacity) to
                                   // ~5.65:1 -- still reads as warm amber/ochre, just deep enough to pass
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