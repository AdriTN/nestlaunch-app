import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de marca NestLaunch
        brand: {
          50: '#f0f4ff',
          100: '#dde8ff',
          200: '#c3d3ff',
          300: '#99b4ff',
          400: '#6b8bff',
          500: '#4a64ff',
          600: '#3040f5',
          700: '#2630e0',
          800: '#2129b5',
          900: '#20278e',
          950: '#141855',
        },
      },
    },
  },
  plugins: [],
};

export default config;
