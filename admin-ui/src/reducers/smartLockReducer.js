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
  SMART_LOCKS_RESOURCE_TYPE,
  SMART_LOCK_RESOURCE_TYPE,
  SMART_LOCK_USERS_RESOURCE_TYPE,
  SMART_LOCK_USER_RESOURCE_TYPE,
  SMART_LOCK_GROUPS_RESOURCE_TYPE,
  SMART_LOCK_GROUP_RESOURCE_TYPE
} from "../actions/actionResourceTypes";

const smartLockReducer = (state, action) => {
  // Read smart locks
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === SMART_LOCKS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === SMART_LOCKS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      smartLocks: action.payload.smartLocks,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === SMART_LOCKS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Create smart locks
  if (
    action.type === CREATE_RESOURCES_PENDING &&
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
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
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
  ) {
    return {
      ...state,
      newSmartLock: action.payload.newSmartLock,
      loading: false,
      error: null,
      didInvalidate: true
    };
  }

  if (
    action.type === CREATE_RESOURCES_FAILED &&
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Read smart lock
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
  ) {
    return {
      ...state,
      smartLock: action.payload.smartLock,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Update smart locks
  if (
    action.type === UPDATE_RESOURCES_PENDING &&
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
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
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
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
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Delete smart locks
  if (
    action.type === DELETE_RESOURCES_PENDING &&
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
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
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
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
    action.resourceType === SMART_LOCK_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Read smart lock users
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === SMART_LOCK_USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === SMART_LOCK_USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      smartLockUsers: action.payload.smartLockUsers,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === SMART_LOCK_USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Read smart lock user
  if (
    action.type === CREATE_RESOURCES_PENDING &&
    action.resourceType === SMART_LOCK_USER_RESOURCE_TYPE
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
    action.resourceType === SMART_LOCK_USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      newSmartLockUser: action.payload.newSmartLockUser,
      loading: false,
      error: null,
      didInvalidate: true
    };
  }

  if (
    action.type === CREATE_RESOURCES_FAILED &&
    action.resourceType === SMART_LOCK_USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Delete smart lock user
  if (
    action.type === DELETE_RESOURCES_PENDING &&
    action.resourceType === SMART_LOCK_USER_RESOURCE_TYPE
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
    action.resourceType === SMART_LOCK_USER_RESOURCE_TYPE
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
    action.resourceType === SMART_LOCK_USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Read smart lock group
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === SMART_LOCK_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === SMART_LOCK_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      smartLockGroups: action.payload.smartLockGroups,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === SMART_LOCK_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Create smart lock group
  if (
    action.type === CREATE_RESOURCES_PENDING &&
    action.resourceType === SMART_LOCK_GROUP_RESOURCE_TYPE
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
    action.resourceType === SMART_LOCK_GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      newSmartLockGroup: action.payload.newSmartLockGroup,
      loading: false,
      error: null,
      didInvalidate: true
    };
  }

  if (
    action.type === CREATE_RESOURCES_FAILED &&
    action.resourceType === SMART_LOCK_GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // Delete smart lock group
  if (
    action.type === DELETE_RESOURCES_PENDING &&
    action.resourceType === SMART_LOCK_GROUP_RESOURCE_TYPE
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
    action.resourceType === SMART_LOCK_GROUP_RESOURCE_TYPE
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
    action.resourceType === SMART_LOCK_GROUP_RESOURCE_TYPE
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

export default smartLockReducer;