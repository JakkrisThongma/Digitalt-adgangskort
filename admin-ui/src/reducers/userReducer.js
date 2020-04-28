import {
  GET_USERS_PENDING,
  GET_USERS_SUCCEEDED,
  GET_USERS_FAILED,
  GET_USER_PENDING,
  GET_USER_SUCCEEDED,
  GET_USER_FAILED,
  ADD_USER_PENDING,
  ADD_USER_SUCCEEDED,
  ADD_USER_FAILED,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCEEDED,
  UPDATE_USER_FAILED,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCEEDED,
  DELETE_USER_FAILED,
  GET_CURRENT_AUTHENTICATED_USER_FAILED,
  GET_CURRENT_AUTHENTICATED_USER_SUCCEEDED,
  GET_CURRENT_AUTHENTICATED_USER_PENDING,
  GET_USER_SMART_LOCKS_FAILED,
  GET_USER_SMART_LOCKS_SUCCEEDED,
  GET_USER_SMART_LOCKS_PENDING,
  GET_USER_GROUPS_FAILED,
  GET_USER_GROUPS_SUCCEEDED,
  GET_USER_GROUPS_PENDING,
  CLOSE_VIEW_USER_DIALOG,
  OPEN_VIEW_USER_DIALOG,
  CLOSE_DELETE_USER_DIALOG,
  OPEN_DELETE_USER_DIALOG,
  CLOSE_EDIT_USER_DIALOG,
  OPEN_EDIT_USER_DIALOG,
  CLOSE_ADD_USER_DIALOG,
  OPEN_ADD_USER_DIALOG,
  SET_SELECTED_USER_ID
} from "../actions/actionTypes";

const userReducer = (state, action) => {
  console.log("User action: ", action.type);

  // Get users
  if (action.type === GET_USERS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (action.type === GET_USERS_SUCCEEDED) {
    return {
      ...state,
      users: action.payload.users,
      loading: false,
      error: null,
      didInvalidate: false
    };
  }

  if (action.type === GET_USERS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Add user
  if (action.type === ADD_USER_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      addFailed: false,
      addSucceed: false
    };
  }

  if (action.type === ADD_USER_SUCCEEDED) {
    return {
      ...state,
      newUser: action.payload.newUser,
      loading: false,
      error: null,
      didInvalidate: true,
      addSucceed: true
    };
  }

  if (action.type === ADD_USER_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      addFailed: true
    };
  }

  // Get user
  if (action.type === GET_USER_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (action.type === GET_USER_SUCCEEDED) {
    return {
      ...state,
      user: action.payload.user,
      loading: false,
      error: null,
      didInvalidate: false
    };
  }

  if (action.type === GET_USER_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Update user
  if (action.type === UPDATE_USER_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      updateFailed: false,
      updateSucceed: false
    };
  }

  if (action.type === UPDATE_USER_SUCCEEDED) {
    return {
      ...state,
      loading: false,
      error: null,
      didInvalidate: true,
      updateSucceed: true
    };
  }

  if (action.type === UPDATE_USER_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      updateFailed: false
    };
  }

  // Delete user
  if (action.type === DELETE_USER_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      deleteFailed: false,
      deleteSucceed: false
    };
  }

  if (action.type === DELETE_USER_SUCCEEDED) {
    return {
      ...state,
      loading: false,
      error: null,
      didInvalidate: true,
      deleteSucceed: true
    };
  }

  if (action.type === DELETE_USER_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      deleteFailed: true
    };
  }

  // Get user groups
  if (action.type === GET_USER_GROUPS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (action.type === GET_USER_GROUPS_SUCCEEDED) {
    return {
      ...state,
      userGroups: action.payload.userGroups,
      loading: false,
      error: null,
      didInvalidate: false
    };
  }

  if (action.type === GET_USER_GROUPS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Get user smart locks
  if (action.type === GET_USER_SMART_LOCKS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (action.type === GET_USER_SMART_LOCKS_SUCCEEDED) {
    return {
      ...state,
      userSmartLocks: action.payload.userSmartLocks,
      loading: false,
      error: null,
      didInvalidate: false
    };
  }

  if (action.type === GET_USER_SMART_LOCKS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Get current user
  if (action.type === GET_CURRENT_AUTHENTICATED_USER_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (action.type === GET_CURRENT_AUTHENTICATED_USER_SUCCEEDED) {
    return {
      ...state,
      currentAuthenticatedUser: action.payload.currentAuthenticatedUser,
      loading: false,
      error: null,
      didInvalidate: false
    };
  }

  if (action.type === GET_CURRENT_AUTHENTICATED_USER_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Set selected user id
  if (action.type === SET_SELECTED_USER_ID) {
    return {
      ...state,
      selectedUserId: action.payload.userId
    };
  }

  // Add group dialog
  if (action.type === OPEN_ADD_USER_DIALOG) {
    return {
      ...state,
      addDialogOpen: true
    };
  }

  if (action.type === CLOSE_ADD_USER_DIALOG) {
    return {
      ...state,
      addDialogOpen: false
    };
  }

  if (action.type === OPEN_EDIT_USER_DIALOG) {
    return {
      ...state,
      editDialogOpen: true
    };
  }

  if (action.type === CLOSE_EDIT_USER_DIALOG) {
    return {
      ...state,
      editDialogOpen: false
    };
  }

  if (action.type === OPEN_DELETE_USER_DIALOG) {
    return {
      ...state,
      deleteDialogOpen: true
    };
  }

  if (action.type === CLOSE_DELETE_USER_DIALOG) {
    return {
      ...state,
      deleteDialogOpen: false
    };
  }

  if (action.type === OPEN_VIEW_USER_DIALOG) {
    return {
      ...state,
      viewDialogOpen: true
    };
  }

  if (action.type === CLOSE_VIEW_USER_DIALOG) {
    return {
      ...state,
      viewDialogOpen: false
    };
  }


  return state;
};

export default userReducer;
