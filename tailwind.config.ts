import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#08090b', panel: '#111317', line: '#262a31', muted: '#9ca3af', accent: '#ff4f5e'
      },
      boxShadow: { glow: '0 0 70px rgba(255,79,94,.12)' }
    }
  },
  plugins: []
}
export default config
