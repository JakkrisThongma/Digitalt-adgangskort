import {
  GET_GROUPS_PENDING,
  GET_GROUPS_SUCCEEDED,
  GET_GROUPS_FAILED,
  GET_GROUP_PENDING,
  GET_GROUP_SUCCEEDED,
  GET_GROUP_FAILED,
  ADD_GROUP_PENDING,
  ADD_GROUP_SUCCEEDED,
  ADD_GROUP_FAILED,
  UPDATE_GROUP_PENDING,
  UPDATE_GROUP_SUCCEEDED,
  UPDATE_GROUP_FAILED,
  DELETE_GROUP_PENDING,
  DELETE_GROUP_SUCCEEDED,
  DELETE_GROUP_FAILED,
  GET_GROUP_SMART_LOCKS_FAILED,
  GET_GROUP_SMART_LOCKS_SUCCEEDED,
  GET_GROUP_SMART_LOCKS_PENDING,
  GET_GROUP_USERS_FAILED,
  GET_GROUP_USERS_SUCCEEDED,
  GET_GROUP_USERS_PENDING,
  SET_SELECTED_GROUP_ID
} from "../actions/actionTypes";

const groupReducer = (state, action) => {
  console.log("Group action: ", action.type);
  // Get groups
  if (action.type === GET_GROUPS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_GROUPS_SUCCEEDED) {
    return {
      ...state,
      groups: action.payload.groups,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_GROUPS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Add group
  if (action.type === ADD_GROUP_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      addFailed: false,
      addSucceed: false
    };
  }

  if (action.type === ADD_GROUP_SUCCEEDED) {
    return {
      ...state,
      newGroup: action.payload.newGroup,
      loading: false,
      error: null,
      didInvalidate: true,
      addSucceed: true
    };
  }

  if (action.type === ADD_GROUP_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      addSucceed: false
    };
  }

  // Get group
  if (action.type === GET_GROUP_PENDING) {
    return {
      ...state,
      group: null,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_GROUP_SUCCEEDED) {
    return {
      ...state,
      group: action.payload.group,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_GROUP_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Update group
  if (action.type === UPDATE_GROUP_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      updateFailed: false,
      updateSucceed: false
    };
  }

  if (action.type === UPDATE_GROUP_SUCCEEDED) {
    return {
      ...state,
      loading: false,
      error: null,
      didInvalidate: true,
      updateSucceed: true
    };
  }

  if (action.type === UPDATE_GROUP_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      updateFailed: true
    };
  }

  // Delete group

  if (action.type === DELETE_GROUP_PENDING) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false,
      deleteFailed: false,
      deleteSucceed: false
    };
  }

  if (action.type === DELETE_GROUP_SUCCEEDED) {
    return {
      ...state,
      loading: false,
      error: null,
      didInvalidate: true,
      deleteSucceed: true
    };
  }

  if (action.type === DELETE_GROUP_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false,
      deleteFailed: true
    };
  }

  // Get group users
  if (action.type === GET_GROUP_USERS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_GROUP_USERS_SUCCEEDED) {
    return {
      ...state,
      groupUsers: action.payload.groupUsers,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_GROUP_USERS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Get group smart locks
  if (action.type === GET_GROUP_SMART_LOCKS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_GROUP_SMART_LOCKS_SUCCEEDED) {
    return {
      ...state,
      groupSmartLocks: action.payload.groupSmartLocks,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_GROUP_SMART_LOCKS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Set selected group id
  if (action.type === SET_SELECTED_GROUP_ID) {
    return {
      ...state,
      selectedGroupId: action.payload.groupId
    };
  }

  return state;
};

export default groupReducer;
