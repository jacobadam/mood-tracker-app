/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        lavender: {
          300: "#8582DD",
          200: "#C2C0FA",
          100: "#F1F5FE",
        },
        midnight: {
          100: "#F5F6F4",
          200: "#C6C5C5",
          300: "#6C757D",
          400: "#2E2F39",
        },
      },
    },
  },
  plugins: [],
};
