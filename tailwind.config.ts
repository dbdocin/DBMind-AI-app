import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1B34',
          2: '#122A4E',
        },
        indigo: {
          DEFAULT: '#3A55D9',
          2: '#5473F0',
        },
        brandPurple: '#8A7CF0',
        bg: {
          soft: '#F5F6FA',
          soft2: '#EEF0F7',
        },
        line: '#E3E6EF',
        ink: {
          DEFAULT: '#12172A',
          mute: '#565F79',
          faint: '#8790A6',
        },
        good: '#1E9E6B',
        warn: '#C97A2E',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"SF Mono"',
          '"Fira Code"',
          'ui-monospace',
          'Consolas',
          'monospace',
        ],
      },
      borderRadius: {
        s: '8px',
        m: '12px',
        l: '20px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,23,41,0.04), 0 2px 8px rgba(18,23,41,0.05)',
        elevated: '0 8px 24px rgba(18,23,41,0.08), 0 2px 6px rgba(18,23,41,0.04)',
        cardHover: '0 3px 10px rgba(18,23,41,0.05)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
