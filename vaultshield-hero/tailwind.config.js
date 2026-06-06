/** @type {import('tailwindcss').Config} */
export default {
  important: '#vaultshield-hero-root',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      colors: {
        vault: {
          text: '#192837',
          accent: '#7342E2',
          login: '#f0efe9',
          sheet: '#CFC8C5',
        },
      },
    },
  },
  plugins: [],
};
