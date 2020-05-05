import {
  ADD_USER_FAILED,
  ADD_USER_PENDING,
  ADD_USER_SUCCEEDED,
  DELETE_USER_FAILED,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCEEDED,
  GET_CURRENT_AUTHENTICATED_USER_FAILED,
  GET_CURRENT_AUTHENTICATED_USER_PENDING,
  GET_CURRENT_AUTHENTICATED_USER_SUCCEEDED,
  GET_USER_FAILED,
  GET_USER_GROUPS_FAILED,
  GET_USER_GROUPS_PENDING,
  GET_USER_GROUPS_SUCCEEDED,
  GET_USER_PENDING,
  GET_USER_SMART_LOCKS_FAILED,
  GET_USER_SMART_LOCKS_PENDING,
  GET_USER_SMART_LOCKS_SUCCEEDED,
  GET_USER_SUCCEEDED,
  GET_USERS_FAILED,
  GET_USERS_PENDING,
  GET_USERS_SUCCEEDED,
  SET_SELECTED_USER_ID,
  UPDATE_USER_FAILED,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCEEDED
} from "../actions/actionTypes";

const userReducer = (state, action) => {
  if (process.env.NODE_ENV !== "development")
    console.log("User action dispatched: ", action.type);

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

  return state;
};

export default userReducer;
