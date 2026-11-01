/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#03060c',
        'bg-raised': '#081222',
        ink: '#f1f6fd',
        muted: '#8fa6c0',
        border: '#14284a',
        accent: '#4da3ff',
        'accent-2': '#1f6feb',
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
