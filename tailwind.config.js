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
        // Minimal Brand Colors - Only 3 main colors
        'brand-primary': '#3b82f6', // Blue-500 - Main brand color
        'brand-dark': '#1f2937', // Gray-800 - Dark text/backgrounds
        'brand-light': '#ffffff', // White - Light text/backgrounds

        // Neutral Grays - Only 3 shades
        'gray-light': '#f8fafc', // Gray-50 - Very light backgrounds
        'gray-medium': '#64748b', // Gray-500 - Medium text
        'gray-dark': '#334155', // Gray-700 - Dark text

        // Functional Colors - Only essential ones
        success: '#10b981', // Green-500 - Success states
        whatsapp: '#25D366', // WhatsApp brand color
      },
      fontFamily: {
        heading: [
          'Geist Sans',
          'Inter',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        body: [
          'Geist Sans',
          'Inter',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        cursive: [
          'var(--font-dancing-script)',
          'Brush Script MT',
          'Apple Chancery',
          'cursive',
          'system-ui',
        ],
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
}
