import { createMuiTheme } from "@material-ui/core/styles";
import palette from "./palette";

const theme = createMuiTheme({
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

export default theme;
