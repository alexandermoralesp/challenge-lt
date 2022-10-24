const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/**/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/lib/**/*.{js,ts,jsx,tsx}",
    "./src/App.tsx"
  ],
  theme: {
    extend: {
      fontSize: {
        'tiny': '.65rem',
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        logo: ["Bungee"],
      },
      colors: {
        primary: {
          darker: "#D6641D",
          dark: "#F25C05",
          DEFAULT: "#F28705", // este es el original
          base: "FF914D",
          light: "#FFA066",
          lighter: "#FFAE7D",
        },
        secondary: {
          darker: "#1E1F23",
          dark: "#28292C",
          base: "#3F4045",
          DEFAULT: "#1E1F23", // este es el original
          light: "#646569",
          lighter: "#92949A",
        },
        skyblue: {
          DEFAULT: "#47D3E7",
        },
        primary_70: {
          DEFAULT: "#ffa166",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
