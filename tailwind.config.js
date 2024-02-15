/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'screen-no-header': 'calc(100vh - 68px)',
        '1/5-no-m-3': 'calc(20% - 24px)',
      },
    },
  },
  plugins: [],
}

