import {
  GET_AZURE_AD_GROUP_FAILED,
  GET_AZURE_AD_GROUP_MEMBERS_FAILED,
  GET_AZURE_AD_GROUP_MEMBERS_PENDING,
  GET_AZURE_AD_GROUP_MEMBERS_SUCCEEDED,
  GET_AZURE_AD_GROUP_PENDING,
  GET_AZURE_AD_GROUP_SUCCEEDED,
  GET_AZURE_AD_GROUPS_FAILED,
  GET_AZURE_AD_GROUPS_PENDING,
  GET_AZURE_AD_GROUPS_SUCCEEDED,
  GET_AZURE_AD_USER_FAILED,
  GET_AZURE_AD_USER_GROUPS_FAILED,
  GET_AZURE_AD_USER_GROUPS_PENDING,
  GET_AZURE_AD_USER_GROUPS_SUCCEEDED,
  GET_AZURE_AD_USER_PENDING,
  GET_AZURE_AD_USER_PHOTO_FAILED,
  GET_AZURE_AD_USER_PHOTO_PENDING,
  GET_AZURE_AD_USER_PHOTO_SUCCEEDED,
  GET_AZURE_AD_USER_SUCCEEDED,
  GET_AZURE_AD_USERS_FAILED,
  GET_AZURE_AD_USERS_PENDING,
  GET_AZURE_AD_USERS_SUCCEEDED
} from "../actions/actionTypes";

const azureAdReducer = (state, action) => {
  if (process.env.NODE_ENV !== "development")
    console.log("Azure Ad action dispatched: ", action.type);

  // Get Azure Ad users
  if (action.type === GET_AZURE_AD_USERS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_USERS_SUCCEEDED) {
    return {
      ...state,
      azureAdUsers: action.payload.azureAdUsers,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_USERS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Get Azure Ad user
  if (action.type === GET_AZURE_AD_USER_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_USER_SUCCEEDED) {
    return {
      ...state,
      azureAdUser: action.payload.azureAdUser,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_USER_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Get Azure Ad user photo

  if (action.type === GET_AZURE_AD_USER_PHOTO_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_USER_PHOTO_SUCCEEDED) {
    return {
      ...state,
      azureAdUserPhoto: action.payload.azureAdUserPhoto,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_USER_PHOTO_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Get Azure Ad user groups
  if (action.type === GET_AZURE_AD_USER_GROUPS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_USER_GROUPS_SUCCEEDED) {
    return {
      ...state,
      azureAdUserGroups: action.payload.azureAdUserGroups,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_USER_GROUPS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Get Azure Ad groups
  if (action.type === GET_AZURE_AD_GROUPS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_GROUPS_SUCCEEDED) {
    return {
      ...state,
      azureAdGroups: action.payload.azureAdGroups,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_GROUPS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Get Azure Ad group
  if (action.type === GET_AZURE_AD_GROUP_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_GROUP_SUCCEEDED) {
    return {
      ...state,
      azureAdGroup: action.payload.azureAdGroup,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_GROUP_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  // Get Azure Ad group members
  if (action.type === GET_AZURE_AD_GROUP_MEMBERS_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_GROUP_MEMBERS_SUCCEEDED) {
    return {
      ...state,
      azureAdGroupMembers: action.payload.azureAdGroupMembers,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_AZURE_AD_GROUP_MEMBERS_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  return state;
};

export default azureAdReducer;
