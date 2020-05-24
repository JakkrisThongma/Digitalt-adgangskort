import {
  SCALE_FONT_DOWN,
  SCALE_FONT_UP,
  CLOSE_ADD_DIALOG,
  CLOSE_DELETE_DIALOG,
  CLOSE_EDIT_DIALOG,
  CLOSE_VIEW_DIALOG,
  OPEN_ADD_DIALOG,
  OPEN_DELETE_DIALOG,
  OPEN_EDIT_DIALOG,
  OPEN_VIEW_DIALOG
} from "@/actions/actionTypes";

const uiReducer = (state, action) => {
  if (process.env.NODE_ENV !== "development")
    console.log("UI action dispatched: ", action.type);

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

  if (action.type === SCALE_FONT_UP) {
    if (state.fontScaleLevel < 3)
      return {
        ...state,
        fontScaleLevel: state.fontScaleLevel + 1
      };
    return state;
  }

  if (action.type === SCALE_FONT_DOWN) {
    if (state.fontScaleLevel > 0)
      return {
        ...state,
        fontScaleLevel: state.fontScaleLevel - 1
      };
    return state;
  }

  return state;
};

export default uiReducer;
