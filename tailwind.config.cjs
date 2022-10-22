/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        bold: "Rajdhani-bold",
        light: "Rajdhani-light",
        medium: "Rajdhani-medium",
        regular: "Rajdhani-regular",
        semiBold: "Rajdhani-semiBold",
        regular: "Rajdhani-regular",
      },
    },
  },
  plugins: [],
};
