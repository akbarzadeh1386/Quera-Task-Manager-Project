export default {
  darkMode:'class',
  content: [
    "./index.html",
      "./**/*.{html,js}"
    // "./src/**/*.{js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2C7EF8",
        backgroundc: "#90F677",
        "primary-hover-light": "#075CD9",
        "on-primary-light": "#FFFFFF",

        "background-light": "#FFFFFF",
        "on-background-light": "#191C1E",

        "surface-light": "#FFFFFF",
        
      },
     fontFamily: {
        body: ["YekanRegular", "Yekan", "YekanSemiBold", "YekanBold"],
        title: ["KalamehBold", "Yekan", "YekanSemiBold", "YekanBold"],
      }, 
    },
  },
};
