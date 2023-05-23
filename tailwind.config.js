/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', //
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      montserrat: ['var(--font-montserrat)'],
      madreRose: ['var(--font-madre-rose)'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fffcfc',
      snow: {
        50: '#fefefd',
        100: '#fdfcfb',
        200: '#fcfaf9',
        300: '#fbf7f6',
        400: '#faf6f4',
        DEFAULT: '#f9f4f2',
        600: '#f8f3f0',
        700: '#f7f1ee',
        800: '#f6efec',
        900: '#f5ece8',
      },
      black: {
        50: '#e2e2e2',
        100: '#b8b8b8',
        200: '#888888',
        300: '#585858',
        400: '#353535',
        DEFAULT: '#111111',
        600: '#0f0f0f',
        700: '#0c0c0c',
        800: '#0a0a0a',
        900: '#050505',
      },
      brown: {
        50: '#f2eeee',
        100: '#ded4d4',
        200: '#c9b8b8',
        300: '#b39b9b',
        400: '#a28585',
        DEFAULT: '#927070',
        600: '#8a6868',
        700: '#7f5d5d',
        800: '#755353',
        900: '#634141',
      },
      orange: {
        50: '#fdeee0',
        100: '#fad5b3',
        200: '#f7b980',
        300: '#f49d4d',
        400: '#f18826',
        DEFAULT: '#ef7300',
        600: '#ed6b00',
        700: '#eb6000',
        800: '#e85600',
        900: '#e44300',
      },
    },
    extend: {
      screens: {
        '3xl': '1800px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), //
    require('@tailwindcss/forms'),
  ],
};
