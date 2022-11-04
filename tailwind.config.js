const colors = require('tailwindcss/colors')
module.exports = {
    purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          "at-light-green": "#7c3aed",
          "at-green": "#a855f7",
          "light-grey": "#f5f3ff",
          "indigo": "#312e81",
          'success':'#009',
          'alert':'#990000',
          'white':'#ffffff'
          
        },
      },
      fontFamily: {
        Poppins: ["Poppins, sans-serif"],
      },
      flex: {
        "1": "1 1 0%",
        "2": "2 2 0%",
      },
      container: {
        center: true,
        screens: {
          lg: "1124px",
          xl: "1124px",
          "2xl": "1124px",
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  };