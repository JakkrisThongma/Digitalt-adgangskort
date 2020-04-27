import {
  GET_SMART_LOCKS_PENDING,
  GET_SMART_LOCKS_SUCCEEDED,
  GET_SMART_LOCKS_FAILED,
  GET_SMART_LOCK_PENDING,
  GET_SMART_LOCK_SUCCEEDED,
  GET_SMART_LOCK_FAILED,
  ADD_SMART_LOCK_PENDING,
  ADD_SMART_LOCK_SUCCEEDED,
  ADD_SMART_LOCK_FAILED,
  GET_SMART_LOCK_GROUPS_FAILED,
  GET_SMART_LOCK_GROUPS_SUCCEEDED,
  GET_SMART_LOCK_GROUPS_PENDING,
  GET_SMART_LOCK_USERS_FAILED,
  GET_SMART_LOCK_USERS_SUCCEEDED,
  GET_SMART_LOCK_USERS_PENDING,
  ADD_SMART_LOCK_GROUP_FAILED,
  ADD_SMART_LOCK_GROUP_PENDING,
  ADD_SMART_LOCK_GROUP_SUCCEEDED,
  ADD_SMART_LOCK_USER_FAILED,
  ADD_SMART_LOCK_USER_PENDING,
  ADD_SMART_LOCK_USER_SUCCEEDED,
  UPDATE_SMART_LOCK_PENDING,
  UPDATE_SMART_LOCK_SUCCEEDED,
  UPDATE_SMART_LOCK_FAILED,
  DELETE_SMART_LOCK_PENDING,
  DELETE_SMART_LOCK_SUCCEEDED,
  DELETE_SMART_LOCK_FAILED,
  DELETE_SMART_LOCK_GROUP_FAILED,
  DELETE_SMART_LOCK_GROUP_PENDING,
  DELETE_SMART_LOCK_GROUP_SUCCEEDED,
  DELETE_SMART_LOCK_USER_FAILED,
  DELETE_SMART_LOCK_USER_PENDING,
  DELETE_SMART_LOCK_USER_SUCCEEDED,
  SET_SELECTED_GROUP_ID,
  SET_SELECTED_SMART_LOCK_ID
} from "../actions/actionTypes";

const smartLockReducer = (state, action) => {
  console.log("Smart lock action: ", action.type);

  // Get smart locks
  if (action.type === GET_SMART_LOCKS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_SMART_LOCKS_SUCCEEDED) {
    return {
      ...state,
      smartLocks: action.payload.smartLocks,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_SMART_LOCKS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Add smart lock
  if (action.type === ADD_SMART_LOCK_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      addFailed: false,
      addSucceed: false
    };
  }

  if (action.type === ADD_SMART_LOCK_SUCCEEDED) {
    return {
      ...state,
      newSmartLock: action.payload.newSmartLock,
      loading: false,
      error: null,
      didInvalidate: true,
      addSucceed: true
    };
  }

  if (action.type === ADD_SMART_LOCK_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      addFailed: true
    };
  }

  // Get smart lock
  if (action.type === GET_SMART_LOCK_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_SMART_LOCK_SUCCEEDED) {
    return {
      ...state,
      smartLock: action.payload.smartLock,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_SMART_LOCK_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Update smart lock
  if (action.type === UPDATE_SMART_LOCK_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      updateFailed: false,
      updateSucceed: false
    };
  }

  if (action.type === UPDATE_SMART_LOCK_SUCCEEDED) {
    return {
      ...state,
      loading: false,
      error: null,
      didInvalidate: true,
      updateSucceed: true
    };
  }

  if (action.type === UPDATE_SMART_LOCK_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      updateFailed: true
    };
  }

  // Delete smart lock
  if (action.type === DELETE_SMART_LOCK_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      deleteFailed: false,
      deleteSucceed: false
    };
  }

  if (action.type === DELETE_SMART_LOCK_SUCCEEDED) {
    return {
      ...state,
      loading: false,
      error: null,
      didInvalidate: true,
      deleteSucceed: true
    };
  }

  if (action.type === DELETE_SMART_LOCK_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      deleteFailed: true
    };
  }

  // Get smart lock users
  if (action.type === GET_SMART_LOCK_USERS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_SMART_LOCK_USERS_SUCCEEDED) {
    return {
      ...state,
      smartLockUsers: action.payload.smartLockUsers,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_SMART_LOCK_USERS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Add smart lock user
  if (action.type === ADD_SMART_LOCK_USER_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      addUserFailed: false,
      addUserSucceed: false
    };
  }

  if (action.type === ADD_SMART_LOCK_USER_SUCCEEDED) {
    return {
      ...state,
      newSmartLockUser: action.payload.newSmartLockUser,
      loading: false,
      error: null,
      didInvalidate: true,
      addUserSucceed: true
    };
  }

  if (action.type === ADD_SMART_LOCK_USER_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      addUserFailed: true
    };
  }

  // Delete smart lock user
  if (action.type === DELETE_SMART_LOCK_USER_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      deleteUserFailed: false,
      deleteUserSucceed: false
    };
  }

  if (action.type === DELETE_SMART_LOCK_USER_SUCCEEDED) {
    return {
      ...state,
      loading: false,
      error: null,
      didInvalidate: true,
      deleteUserSucceed: true
    };
  }

  if (action.type === DELETE_SMART_LOCK_USER_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      deleteUserFailed: true
    };
  }

  // Get smart lock groups
  if (action.type === GET_SMART_LOCK_GROUPS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_SMART_LOCK_GROUPS_SUCCEEDED) {
    return {
      ...state,
      smartLockGroups: action.payload.smartLockGroups,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_SMART_LOCK_GROUPS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Add smart lock group
  if (action.type === ADD_SMART_LOCK_GROUP_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      addGroupFailed: false,
      addGroupSucceed: false
    };
  }

  if (action.type === ADD_SMART_LOCK_GROUP_SUCCEEDED) {
    return {
      ...state,
      newSmartLockGroup: action.payload.newSmartLockGroup,
      loading: false,
      error: null,
      didInvalidate: true,
      addGroupSucceed: true
    };
  }

  if (action.type === ADD_SMART_LOCK_GROUP_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      addGroupFailed: true
    };
  }

  // Delete smart lock group
  if (action.type === DELETE_SMART_LOCK_GROUP_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      deleteGroupFailed: false,
      deleteGroupSucceed: false
    };
  }

  if (action.type === DELETE_SMART_LOCK_GROUP_SUCCEEDED) {
    return {
      ...state,
      loading: false,
      error: null,
      didInvalidate: true,
      deleteGroupSucceed: true
    };
  }

  if (action.type === DELETE_SMART_LOCK_GROUP_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      deleteGroupFailed: true
    };
  }

  // Set selected group id
  if (action.type === SET_SELECTED_SMART_LOCK_ID) {
    return {
      ...state,
      smartLockId: action.payload.smartLockId
    };
  }

  return state;
};

export default smartLockReducer;
