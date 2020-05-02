import {
  CLOSE_ADD_DIALOG,
  CLOSE_DELETE_DIALOG,
  CLOSE_EDIT_DIALOG,
  CLOSE_VIEW_DIALOG,
  OPEN_ADD_DIALOG,
  OPEN_DELETE_DIALOG,
  OPEN_EDIT_DIALOG,
  OPEN_VIEW_DIALOG
} from "../actions/actionTypes";

const uiReducer = (state, action) => {
  console.log("UI action: ", action.type);

  // Add dialog
  if (action.type === OPEN_ADD_DIALOG) {
    return {
      ...state,
      addDialogOpen: true
    };
  }

  if (action.type === CLOSE_ADD_DIALOG) {
    return {
      ...state,
      addDialogOpen: false
    };
  }

  if (action.type === OPEN_EDIT_DIALOG) {
    return {
      ...state,
      editDialogOpen: true
    };
  }

  if (action.type === CLOSE_EDIT_DIALOG) {
    return {
      ...state,
      editDialogOpen: false
    };
  }

  if (action.type === OPEN_DELETE_DIALOG) {
    return {
      ...state,
      deleteDialogOpen: true
    };
  }

  if (action.type === CLOSE_DELETE_DIALOG) {
    return {
      ...state,
      deleteDialogOpen: false
    };
  }

  if (action.type === OPEN_VIEW_DIALOG) {
    return {
      ...state,
      viewDialogOpen: true
    };
  }

  if (action.type === CLOSE_VIEW_DIALOG) {
    return {
      ...state,
      viewDialogOpen: false
    };
  }
  return state;
};

export default uiReducer;
