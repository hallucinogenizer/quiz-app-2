module.exports = {
  purge: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "iec-blue": "#2A6095",
        "iec-blue-hover": "#306aa5",
      },
      left: {
        "1/8": "12.5%",
      },
      dropShadow:{
        'gradient':"0 15px 15px rgba(72,8,94,0.5)",
        'little':"0 3px 3px rgba(72,8,94,0.5)",
        'none':"0 0 0"
      },
      maxWidth: {
        'my1':"200px"
      },
      inset: {
        "my1":'55%'
      }
    },
  },
  fontFamily: {
    body: ["Roboto", "sans-serif"],
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      backgroundOpacity: ["focus"],
      dropShadow: ["hover","active"]
    },
  },
  plugins: [],
};