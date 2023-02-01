/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3c0101",
        secondary: "#f5c1c170",
        third: "#d01b1b",
        inputColor: "#159BDE",
        "primary-button": "#01ACE6",
      },
    },
  },
  plugins: [],
};
