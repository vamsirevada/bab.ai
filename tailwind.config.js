/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#3b82f6', // Blue-500
        'brand-charcoal': '#1f2937', // Gray-800
        'brand-white': '#ffffff',
        'functional-success': '#10b981', // Green-500
        'whatsapp-green': '#25D366',
      },
      fontFamily: {
        heading: ['Geist Sans', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Geist Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}
