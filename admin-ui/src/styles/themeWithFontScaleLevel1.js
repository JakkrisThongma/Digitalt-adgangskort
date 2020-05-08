import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import palette from "./palette";
import overrides from "./overrides";
import typography from "./fontScaleLevel1";

const themeConfig = createMuiTheme({
  palette,
  overrides,
  typography
});

const themeWithFontScaleLevel1 = responsiveFontSizes(themeConfig);

export default themeWithFontScaleLevel1;
