import {
  READ_RESOURCES_PENDING,
  READ_RESOURCES_SUCCEEDED,
  READ_RESOURCES_FAILED
} from "../actions/actionTypes";

import {
  AZURE_AD_USERS_RESOURCE_TYPE,
  AZURE_AD_USER_RESOURCE_TYPE,
  AZURE_AD_USER_PHOTO_RESOURCE_TYPE,
  AZURE_AD_USER_GROUPS_RESOURCE_TYPE,
  AZURE_AD_GROUPS_RESOURCE_TYPE,
  AZURE_AD_GROUP_RESOURCE_TYPE,
  AZURE_AD_GROUP_MEMBERS_RESOURCE_TYPE
} from "../actions/actionResourceTypes";

const azureAdReducer = (state, action) => {
  // Read Azure Ad users
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === AZURE_AD_USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === AZURE_AD_USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      azureAdUsers: action.payload.azureAdUsers,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === AZURE_AD_USERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Read Azure Ad user
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === AZURE_AD_USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === AZURE_AD_USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      azureAdUser: action.payload.azureAdUser,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === AZURE_AD_USER_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Read Azure Ad user photo

  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === AZURE_AD_USER_PHOTO_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === AZURE_AD_USER_PHOTO_RESOURCE_TYPE
  ) {
    return {
      ...state,
      azureAdUserPhoto: action.payload.azureAdUserPhoto,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === AZURE_AD_USER_PHOTO_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Read Azure Ad user groups
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === AZURE_AD_USER_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === AZURE_AD_USER_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      azureAdUserGroups: action.payload.azureAdUserGroups,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === AZURE_AD_USER_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Read Azure Ad groups
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === AZURE_AD_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === AZURE_AD_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      azureAdGroups: action.payload.azureAdGroups,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === AZURE_AD_GROUPS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Read Azure Ad group
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === AZURE_AD_GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === AZURE_AD_GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      azureAdGroup: action.payload.azureAdGroup,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === AZURE_AD_GROUP_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Read Azure Ad group memebers
  if (
    action.type === READ_RESOURCES_PENDING &&
    action.resourceType === AZURE_AD_GROUP_MEMBERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_SUCCEEDED &&
    action.resourceType === AZURE_AD_GROUP_MEMBERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      azureAdGroupMembers: action.payload.azureAdGroupMembers,
      loading: false,
      error: null
    };
  }

  if (
    action.type === READ_RESOURCES_FAILED &&
    action.resourceType === AZURE_AD_GROUP_MEMBERS_RESOURCE_TYPE
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  return state;
};

export default azureAdReducer;
