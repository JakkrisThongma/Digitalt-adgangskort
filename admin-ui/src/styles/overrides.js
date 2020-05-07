import palette from "./palette";

export default {
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
};
