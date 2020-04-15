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
} from "../types/actionTypes";

import {
  GROUPS_RESOURCE_TYPE,
  GROUP_RESOURCE_TYPE,
  GROUP_USERS_RESOURCE_TYPE,
  GROUP_SMART_LOCKS_RESOURCE_TYPE
} from "../types/resourceTypes";

const groupReducer = (state, action) => {
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      groups: action.payload.groups,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // -------------

  if (
    action.type === CREATE_RESOURCES_PENDING &&
    action.resourceType === GROUP_RESOURCE_TYPE
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
    action.resourceType === GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      newGroup: action.payload.newGroup,
      loading: false,
      error: null,
      didInvalidate: true
    };
  }

  if (
    action.type === CREATE_RESOURCES_FAILED &&
    action.resourceType === GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // ------

  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      group: action.payload.group,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // ------

  if (
    action.type === UPDATE_RESOURCES_PENDING &&
    action.resourceType === GROUP_RESOURCE_TYPE
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
    action.resourceType === GROUP_RESOURCE_TYPE
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
    action.resourceType === GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // ------

  if (
    action.type === DELETE_RESOURCES_PENDING &&
    action.resourceType === GROUP_RESOURCE_TYPE
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
    action.resourceType === GROUP_RESOURCE_TYPE
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
    action.resourceType === GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      didInvalidate: false
    };
  }

  // ------

  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === GROUP_USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === GROUP_USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      groupUsers: action.payload.groupUsers,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === GROUP_USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // ------------

  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === GROUP_SMART_LOCKS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === GROUP_SMART_LOCKS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      groupSmartLocks: action.payload.groupSmartLocks,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === GROUP_SMART_LOCKS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  return state;
};

export default groupReducer;
