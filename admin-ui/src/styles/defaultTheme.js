import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import palette from "./palette";
import overrides from "./overrides";

const themeConfig = createMuiTheme({
  palette,
  overrides
});

const defaultTheme = responsiveFontSizes(themeConfig);

export default defaultTheme;
