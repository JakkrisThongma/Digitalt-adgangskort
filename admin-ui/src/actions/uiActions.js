import {
  CLOSE_ADD_DIALOG,
  CLOSE_DELETE_DIALOG,
  CLOSE_EDIT_DIALOG,
  OPEN_ADD_DIALOG,
  OPEN_DELETE_DIALOG,
  OPEN_EDIT_DIALOG,
  SCALE_FONT_DOWN,
  SCALE_FONT_UP
} from "./actionTypes";

const openAddDialog = dispatch => {
  dispatch({
    type: OPEN_ADD_DIALOG
  });
};
const closeAddDialog = dispatch => {
  dispatch({
    type: CLOSE_ADD_DIALOG
  });
};

const openEditDialog = dispatch => {
  dispatch({
    type: OPEN_EDIT_DIALOG
  });
};
const closeEditDialog = dispatch => {
  dispatch({
    type: CLOSE_EDIT_DIALOG
  });
};

const openDeleteDialog = dispatch => {
  dispatch({
    type: OPEN_DELETE_DIALOG
  });
};
const closeDeleteDialog = dispatch => {
  dispatch({
    type: CLOSE_DELETE_DIALOG
  });
};

const scaleFontUp = dispatch => {
  dispatch({
    type: SCALE_FONT_UP
  });
};
const scaleFontDown = dispatch => {
  dispatch({
    type: SCALE_FONT_DOWN
  });
};

export {
  openAddDialog,
  closeAddDialog,
  openEditDialog,
  closeEditDialog,
  openDeleteDialog,
  closeDeleteDialog,
  scaleFontUp,
  scaleFontDown
};
