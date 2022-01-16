module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      "1/2": "50vh",
      "1/4": "25vh",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
