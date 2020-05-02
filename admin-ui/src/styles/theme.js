import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import palette from "./palette";

const themeConfing = createMuiTheme({
  palette,
  typography: {
    fontSize: 18,
    display4: {
      fontSize: 18
    },
    display3: {
      fontSize: 18
    },
    display2: {
      fontSize: 18
    },
    display1: {
      fontSize: 18
    },
    headline: {
      fontSize: 18
    },
    title: {
      fontSize: 18
    },
    subheading: {
      fontSize: 18
    },
    body2: {
      fontSize: 18
    },
    body1: {
      fontSize: 18
    },
    caption: {
      fontSize: 18
    },
    button: {
      fontSize: 18
    }
  },
  overrides: {
    MuiTableRow: {
      root: {
        "&$selected": {
          backgroundColor: palette.quillGray
        },
        "&$hover": {
          "&:hover": {
            backgroundColor: palette.quillGray,
            cursor: "pointer"
          }
        }
      }
    }
  }
});

const theme = responsiveFontSizes(themeConfing);

export default theme;
