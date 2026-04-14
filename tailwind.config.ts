import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#521830',
        'primary-container': '#6d2e46',
        secondary: '#864f51',
        surface: '#fcf9f4',
        'surface-low': '#f6f3ee',
        'surface-mid': '#f0ede9',
        'surface-high': '#eae8e3',
        gold: '#EDB74D',
        'on-surface': '#1c1c19',
        'on-surface-variant': '#524347',
      },
      borderRadius: {
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '9999px',
      },
      fontFamily: {
        headline: ['var(--font-newsreader)', 'serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
        label: ['var(--font-jakarta)', 'sans-serif'],
        script: ['var(--font-allura)', 'cursive'],
      },
    },
  },
  plugins: [],
}

export default config
