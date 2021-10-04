const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: {
        50: "#e9fcf1",
        100: "#d3f8e2",
        200: "#a7f1c6",
        300: "#7beaa9",
        400: "#4fe38d",
        500: "#23dc70",
        600: "#1cb05a",
        700: "#158443",
        800: "#0e582d",
        900: "#072c16",
      },

      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    },
  },
  // fontFamily: {
  //   sans: ["Graphik", "sans-serif"],
  //   serif: ["Merriweather", "serif"],
  // },
};
