/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'class'
  theme: {
    fontFamily: {
      sans: ['Roboto', 'Arial', 'sans-serif'],
      serif: ['IvarDisplay', 'Georgia', 'serif'],
      headline: ['IvarHeadline', 'Georgia', 'serif'],
    },
    extend: {
      backgroundImage: {
        'hero-image': "url('../public/images/hero-image.jpeg')",
      },
      leading: {
        11: '2.75rem', // 44px
        15: '4.375rem',
      },
      screens: {
        xs: '360px',
        profile: '56em',
        ...defaultTheme.screens,
      },
      boxShadow: {
        xs: '0px 1px 2px rgba(16, 24, 40, 0.05);',
        sm: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);',
        md: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);',
        lg: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);',
        xl: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03);',
        '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18);',
        '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14);',
        input: '0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FFE4E1',
        'survey-option-icon': '0px 3.33333px 6.66667px -1.66667px rgba(16, 24, 40, 0.1), 0px 1.66667px 3.33333px -1.66667px rgba(16, 24, 40, 0.06);',
        profile: '0 0.5em 1em -0.5em rgba(0,0,0,.2), 0 1rem 1rem -1rem rgba(0,0,0,.1), 0 1.675rem 0.5rem -1.5rem rgba(0,0,0,.1);',
        container: '0 1.5rem 1.25rem -1rem rgba(0,0,0,.15), 0 1rem 1rem -1rem rgba(0,0,0,.05), 0 1.675rem 0.5rem -1.5rem rgba(0,0,0,.05)',
      },
      backgroundPosition: {
        'cookie-policy': '1em 50%',
      },
      borderRadius: {
        'survey-option-icon': '833.333px',
        '5xl': '2.5rem',
      },
      colors: {
        primary: {
          25: '#FFFBFA',
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          300: '#FDA29B',
          400: '#F97066',
          500: '#F04438', // main brand color
          600: '#D92D20',
          700: '#B42318',
          800: '#912018',
          900: '#7A271A',
        },
        charcoal: {
          25: '#D5D5E0',
          50: '#C0C0D0',
          100: '#ACACC0',
          200: '#9797B0',
          300: '#8282A1',
          400: '#6D6D91',
          500: '#5E5E7C',
          600: '#4E4E67',
          700: '#3E3E52',
          800: '#2E2E3E',
          900: '#1E1E28', // main brand color
        },
        ivory: {
          25: '#FEFEFD',
          50: '#FCFCFA',
          100: '#FAF9F5',
          200: '#F7F6F1',
          300: '#F5F3EC',
          400: '#F2F0E7', // main brand color
          500: '#DAD8D0',
          600: '#C2C0B9',
          700: '#A9A8A2',
          800: '#91908B',
          900: '#797874',
        },
        cream: {
          25: '#FFFBF7',
          50: '#FFF6EC',
          100: '#FFEBD4',
          200: '#FFE5C8',
          300: '#FFE0BD',
          400: '#FFDAB1', // main brand color
          500: '#E6C39E',
          600: '#CCAE8E',
          700: '#B3987A',
          800: '#9A846A',
          900: '#816E5A',
        },
        salmon: {
          25: '#FFFBF7',
          50: '#FFE9DA',
          100: '#FFDAC1',
          200: '#FFCBA8',
          300: '#FFBC8F',
          400: '#FFB482', // main brand color
          500: '#E6A275',
          600: '#CC9068',
          700: '#B37E5B',
          800: '#996C4E',
          900: '#805A41',
        },
        caramel: {
          25: '#FFFCF8',
          50: '#FEFAF0',
          100: '#FDF5E2',
          200: '#FCEDCC',
          300: '#FBEAC5',
          400: '#FAE5B6', // main brand color
          500: '#E1CEA4',
          600: '#C8B792',
          700: '#AFA07F',
          800: '#96896D',
          900: '#7D735B',
        },
        sunshine: {
          25: '#FEFAF1',
          50: '#FDF4E2',
          100: '#FBE9C5',
          200: '#F9DEA8',
          300: '#F7D38B',
          400: '#F5C86E', // main brand color
          500: '#DDB463',
          600: '#C4A058',
          700: '#AC8C4D',
          800: '#937842',
          900: '#7B6437',
        },
        stone: {
          25: '#FCFBFA',
          50: '#F5F4F1',
          100: '#EFEDE8',
          200: '#E9E6DE',
          300: '#E5E2D9',
          400: '#DFDBD0', // main brand color
          500: '#C9C5BB',
          600: '#B2AFA6',
          700: '#9C9992',
          800: '#86837D',
          900: '#706E68',
        },
        slate: {
          25: '#FAF9F8',
          50: '#F5F3F2',
          100: '#EAE7E4',
          200: '#E0DCD7',
          300: '#D5D0C9',
          400: '#CBC4BC', // main brand color
          500: '#B7B0A9',
          600: '#A29D96',
          700: '#8E8984',
          800: '#7A7671',
          900: '#66625E',
        },
        blue: {
          25: '#F1F8FE',
          50: '#DBEEFB',
          100: '#C5E3F9',
          200: '#9ACEF5',
          300: '#6EB9F0',
          400: '#3791CD', // main brand color
          500: '#3283B9',
          600: '#05589D',
          700: '#044B85',
          800: '#043E6E',
          900: '#02233F',
        },
        violet: {
          25: '#F7F7FD',
          50: '#EBEAF9',
          100: '#DFDDF5',
          200: '#C7C4EE',
          300: '#AFAAE6',
          400: '#8080CE', // main brand color
          500: '#7373B9',
          600: '#6666A5',
          700: '#5C4E91',
          800: '#403766',
          900: '#332B50',
        },
        green: {
          25: '#EFF5EF',
          50: '#DFEBDF',
          100: '#CFE1CF',
          200: '#AFCDAF',
          300: '#7FAF7F',
          400: '#6FA56F',
          500: '#5F9B5F', // main brand color
          600: '#568C56',
          700: '#4C7C4C',
          800: '#436D43',
          900: '#304E30',
        },
        red: {
          25: '#FFFBFA',
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          300: '#FDA29B',
          400: '#F97066',
          500: '#F04438', // main brand color
          600: '#D92D20',
          700: '#B42318',
          800: '#912018',
          900: '#7A271A',
        },
        yellow: {
          25: '#FFFCF5',
          50: '#FFFAEB',
          100: '#FEF0C7',
          200: '#FEDF89',
          300: '#FEC84B',
          400: '#FDB022',
          500: '#F79009', // main brand color
          600: '#DC6803',
          700: '#B54708',
          800: '#93370D',
          900: '#7A2E0E',
        },
      },
    },
  },
  safelist: [
    {
      pattern: /^text-(purple|charcoal|ivory|cream|salmon|caramel|sunshine|stone|slate|gray|blue|violet|green|red|yellow)-(300|400|500|600|700|800|900)$/,
    },
  ],
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
