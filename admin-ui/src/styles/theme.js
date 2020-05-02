import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import palette from "./palette";

const themeConfing = createMuiTheme({
  palette,
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
