const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "nord-layer": {
          50: "#fbfef4",
          100: "#f7fde9",
          200: "#ecfac8",
          300: "#e0f7a6",
          400: "#c8f164",
          500: "#b1eb21",
          600: "#9fd41e",
          700: "#85b019",
          800: "#6a8d14",
          900: "#577310",
        },
        midnight: {
          50: "#f2f2f4",
          100: "#e6e6e9",
          200: "#bfc0c9",
          300: "#999aa9",
          400: "#4d4e68",
          500: "#000227",
          600: "#000223",
          700: "#00021d",
          800: "#000117",
          900: "#000113",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
