const white = "#FFFFFF";
const black = "#000000";
const lightBlue = "#C6D6E3";
const red = "#ED3426";
const blue = "#0057B8";
const purple = "#753BBD";
const darkGray = "#53565A";
const quillGray = "#D9D9D6";
const brickRed = "#AF272F";
const lightPink = "#FFD2BB";
const lima = "#6ABE0F";

export default {
  black,
  white,
  lightBlue,
  red,
  blue,
  purple,
  darkGray,
  quillGray,
  brickRed,
  lightPink,
  primary: {
    contrastText: white,
    main: darkGray,
    dark: "#3a3c3e",
    light: "#75777b"
  },
  secondary: {
    contrastText: darkGray,
    main: white,
    dark: "#b2b2b2",
    light: white
  },
  success: {
    contrastText: white,
    main: lima,
    dark: "#4a850a",
    light: "#87cb3f"
  },
  info: {
    contrastText: white,
    main: blue,
    dark: "#003c80",
    light: "#3378c6"
  },
  warning: {
    contrastText: black,
    main: lightPink,
    dark: "#b29382",
    light: "#ffdbc8"
  },
  error: {
    contrastText: white,
    main: brickRed,
    dark: "#7a1b20",
    light: "#bf5258"
  },
  text: {
    primary: black,
    secondary: darkGray,
    link: blue
  },
  background: {
    default: lightBlue,
    paper: white
  }
};
