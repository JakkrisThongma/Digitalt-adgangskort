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
} from "./actionTypes";

import {
  getAzureAdGroup as getAzureAdGroupFromAPI,
  getAzureAdGroupMembers as getAzureAdGroupMembersFromAPI,
  getAzureAdGroups as getAzureAdGroupsFromAPI,
  getAzureAdUser as getAzureAdUserFromAPI,
  getAzureAdUserGroup as getAzureAdUserGroupFromAPI,
  getAzureAdUserPhoto as getAzureAdUserPhotoFromAPI,
  getAzureAdUsers as getAzureAdUsersFromAPI
} from "../services/api";

const getAzureAdUsers = dispatch => {
  dispatch({
    type: GET_AZURE_AD_USERS_PENDING
  });
  getAzureAdUsersFromAPI()
    .then(response =>
      dispatch({
        type: GET_AZURE_AD_USERS_SUCCEEDED,
        payload: { azureAdUsers: response }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_AZURE_AD_USERS_FAILED,
        payload: { error }
      })
    );
};

const getAzureAdUser = (dispatch, userId) => {
  dispatch({
    type: GET_AZURE_AD_USER_PENDING
  });
  getAzureAdUserFromAPI(userId)
    .then(response =>
      dispatch({
        type: GET_AZURE_AD_USER_SUCCEEDED,
        payload: { azureAdUser: response }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_AZURE_AD_USER_FAILED,
        payload: { error }
      })
    );
};

const getAzureAdUserPhoto = (dispatch, userId) => {
  dispatch({
    type: GET_AZURE_AD_USER_PHOTO_PENDING
  });
  getAzureAdUserPhotoFromAPI(userId)
    .then(response =>
      dispatch({
        type: GET_AZURE_AD_USER_PHOTO_SUCCEEDED,
        payload: { azureAdUserPhoto: response }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_AZURE_AD_USER_PHOTO_FAILED,
        payload: { error }
      })
    );
};

const getAzureAdUserGroup = (dispatch, userId) => {
  dispatch({
    type: GET_AZURE_AD_USER_GROUPS_PENDING
  });
  getAzureAdUserGroupFromAPI(userId)
    .then(response =>
      dispatch({
        type: GET_AZURE_AD_USER_GROUPS_SUCCEEDED,
        payload: { azureAdUserGroups: response }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_AZURE_AD_USER_GROUPS_FAILED,
        payload: { error }
      })
    );
};

const getAzureAdGroups = dispatch => {
  dispatch({
    type: GET_AZURE_AD_GROUPS_PENDING
  });
  getAzureAdGroupsFromAPI()
    .then(response =>
      dispatch({
        type: GET_AZURE_AD_GROUPS_SUCCEEDED,
        payload: { azureAdGroups: response }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_AZURE_AD_GROUPS_FAILED,
        payload: { error }
      })
    );
};

const getAzureAdGroup = (dispatch, groupId) => {
  dispatch({
    type: GET_AZURE_AD_GROUP_PENDING
  });
  getAzureAdGroupFromAPI(groupId)
    .then(response =>
      dispatch({
        type: GET_AZURE_AD_GROUP_SUCCEEDED,
        payload: { azureAdGroup: response }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_AZURE_AD_GROUP_FAILED,
        payload: { error }
      })
    );
};

const getAzureAdGroupMembers = (dispatch, groupId) => {
  dispatch({
    type: GET_AZURE_AD_GROUP_MEMBERS_PENDING
  });
  getAzureAdGroupMembersFromAPI(groupId)
    .then(response =>
      dispatch({
        type: GET_AZURE_AD_GROUP_MEMBERS_SUCCEEDED,
        payload: { azureAdGroupMembers: response }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_AZURE_AD_GROUP_MEMBERS_FAILED,
        payload: { error }
      })
    );
};
export {
  getAzureAdUsers,
  getAzureAdUser,
  getAzureAdUserPhoto,
  getAzureAdGroups,
  getAzureAdGroupMembers,
  getAzureAdUserGroup,
  getAzureAdGroup
};
