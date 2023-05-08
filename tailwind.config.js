/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', //
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
      snow: '#f9f4f2',
      black: '#111',
      brown: '#927070',
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
  },
  plugins: [
    require('@tailwindcss/typography'), //
    require('@tailwindcss/forms'),
  ],
};
