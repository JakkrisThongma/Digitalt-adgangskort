import {
  READ_RESOURCES_PENDING,
  READ_RESOURCES_SUCCEEDED,
  READ_RESOURCES_FAILED,
  CREATE_RESOURCES_PENDING,
  CREATE_RESOURCES_SUCCEEDED,
  CREATE_RESOURCES_FAILED,
  UPDATE_RESOURCES_PENDING,
  UPDATE_RESOURCES_SUCCEEDED,
  UPDATE_RESOURCES_FAILED,
  DELETE_RESOURCES_PENDING,
  DELETE_RESOURCES_SUCCEEDED,
  DELETE_RESOURCES_FAILED
} from "../actions/actionTypes";

import {
  USERS_RESOURCE_TYPE,
  USER_RESOURCE_TYPE,
  USER_GROUPS_RESOURCE_TYPE,
  USER_SMART_LOCKS_RESOURCE_TYPE,
  CURRENT_AUTHENTICATED_USER_RESOURCE_TYPE
} from "../actions/actionResourceTypes";

const userReducer = (state, action) => {
  // Read users
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      users: action.payload.users,
      loading: false,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Create users
  if (
    action.type === CREATE_RESOURCES_PENDING &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === CREATE_RESOURCES_SUCCEEDED &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      newUser: action.payload.newUser,
      loading: false,
      error: null,
      didInvalidate: true
    };
  }

  if (
    action.type === CREATE_RESOURCES_FAILED &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Read user
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      user: action.payload.user,
      loading: false,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Update user
  if (
    action.type === UPDATE_RESOURCES_PENDING &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === UPDATE_RESOURCES_SUCCEEDED &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: null,
      didInvalidate: true
    };
  }

  if (
    action.type === UPDATE_RESOURCES_FAILED &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Delete user
  if (
    action.type === DELETE_RESOURCES_PENDING &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === DELETE_RESOURCES_SUCCEEDED &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: null,
      didInvalidate: true
    };
  }

  if (
    action.type === DELETE_RESOURCES_FAILED &&
    action.resourceType === USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Read user groups
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === USER_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === USER_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      userGroups: action.payload.userGroups,
      loading: false,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === USER_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Read user smart locks
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === USER_SMART_LOCKS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === USER_SMART_LOCKS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      userSmartLocks: action.payload.userSmartLocks,
      loading: false,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === USER_SMART_LOCKS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Read current user
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === CURRENT_AUTHENTICATED_USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === CURRENT_AUTHENTICATED_USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      currentAuthenticatedUser: action.payload.currentAuthenticatedUser,
      loading: false,
      error: null,
      didInvalidate: false
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === CURRENT_AUTHENTICATED_USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  return state;
};

export default userReducer;
