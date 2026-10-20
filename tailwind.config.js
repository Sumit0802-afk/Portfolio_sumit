/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#030705',
        'bg-raised': '#08140c',
        ink: '#f1fbf5',
        muted: '#8ea89a',
        border: '#143021',
        accent: '#00ff9d',
        'accent-2': '#10b981',
        emerald: '#059669',
        mint: '#34d399',
        'neon-green': '#00ff9d',
        'neon-mint': '#00ff9d',
        'deep-emerald': '#047857',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ["'Source Serif 4'", 'Georgia', "'Times New Roman'", 'serif'],
        mono: ["'JetBrains Mono'", 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        card: '14px',
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
    },
  },
  plugins: [],
}
