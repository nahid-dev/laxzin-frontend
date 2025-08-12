module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxxsm: { min: "320px" },
      xxsm: { min: "375px" },
      xsm: { min: "425px" },
      xs: { min: "576px" },

      sm: { min: "768px" },

      md: { min: "1024px" },

      lg: { min: "1280px" },

      xl: { min: "1536px" },

      xxl: { min: "1820px" },
      xxxl: { min: "2000px" },
    },
    extend: {
      colors: {
        primary: "#000",
        secondary: "#FFE198",
      },
      fontFamily: {
        body: ["Geist", "sans-serif"],
      },
    },
  },
};
