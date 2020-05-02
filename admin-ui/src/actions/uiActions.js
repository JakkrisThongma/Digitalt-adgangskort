import {
  CLOSE_ADD_DIALOG,
  CLOSE_DELETE_DIALOG,
  CLOSE_EDIT_DIALOG,
  CLOSE_VIEW_DIALOG,
  OPEN_ADD_DIALOG,
  OPEN_DELETE_DIALOG,
  OPEN_EDIT_DIALOG,
  OPEN_VIEW_DIALOG
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

const openViewDialog = dispatch => {
  dispatch({
    type: OPEN_VIEW_DIALOG
  });
};
const closeViewDialog = dispatch => {
  dispatch({
    type: CLOSE_VIEW_DIALOG
  });
};

export {
  openAddDialog,
  closeAddDialog,
  openEditDialog,
  closeEditDialog,
  openDeleteDialog,
  closeDeleteDialog,
  openViewDialog,
  closeViewDialog
};
