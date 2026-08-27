/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        munrock: {
          navy: "#0A2540",
          "navy-dark": "#061729",
          orange: "#F26522",
          "orange-hover": "#D95316",
          bg: "#F4F6F9",
        },
      },
    },
  },
  plugins: [],
};