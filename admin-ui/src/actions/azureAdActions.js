import {
  READ_RESOURCES_PENDING,
  READ_RESOURCES_SUCCEEDED,
  READ_RESOURCES_FAILED,
  CREATE_RESOURCES_PENDING,
  CREATE_RESOURCES_SUCCEEDED,
  CREATE_RESOURCES_FAILED
} from "./actionTypes";

import {
  AZURE_AD_USERS_RESOURCE_TYPE,
  AZURE_AD_USER_RESOURCE_TYPE,
  AZURE_AD_USER_PHOTO_RESOURCE_TYPE,
  AZURE_AD_USER_GROUPS_RESOURCE_TYPE,
  AZURE_AD_GROUPS_RESOURCE_TYPE,
  AZURE_AD_GROUP_RESOURCE_TYPE,
  AZURE_AD_GROUP_MEMBERS_RESOURCE_TYPE
} from "./actionResourceTypes";

import {
  getAzureAdUsers as getAzureAdUsersFromAPI,
  getAzureAdUser as getAzureAdUserFromAPI,
  getAzureAdUserPhoto as getAzureAdUserPhotoFromAPI,
  getAzureAdUserGroup as getAzureAdUserGroupFromAPI,
  getAzureAdGroups as getAzureAdGroupsFromAPI,
  getAzureAdGroup as getAzureAdGroupFromAPI,
  getAzureAdGroupMembers as getAzureAdGroupMembersFromAPI
} from "../services/api";

const getAzureAdUsers = dispatch => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: AZURE_AD_USERS_RESOURCE_TYPE
  });
  getAzureAdUsersFromAPI()
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: AZURE_AD_USERS_RESOURCE_TYPE,
        payload: { azureAdUsers: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: AZURE_AD_USERS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getAzureAdUser = (dispatch, userId) => {
  dispatch({
    type: CREATE_RESOURCES_PENDING,
    resourceType: AZURE_AD_USER_RESOURCE_TYPE
  });
  getAzureAdUserFromAPI(userId)
    .then(response =>
      dispatch({
        type: CREATE_RESOURCES_SUCCEEDED,
        resourceType: AZURE_AD_USER_RESOURCE_TYPE,
        payload: { azureAdUser: response }
      })
    )
    .catch(error =>
      dispatch({
        type: CREATE_RESOURCES_FAILED,
        resourceType: AZURE_AD_USER_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getAzureAdUserPhoto = (dispatch, userId) => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: AZURE_AD_USER_PHOTO_RESOURCE_TYPE
  });
  getAzureAdUserPhotoFromAPI(userId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: AZURE_AD_USER_PHOTO_RESOURCE_TYPE,
        payload: { azureAdUserPhoto: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: AZURE_AD_USER_PHOTO_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getAzureAdUserGroup = (dispatch, userId) => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: AZURE_AD_USER_GROUPS_RESOURCE_TYPE
  });
  getAzureAdUserGroupFromAPI(userId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: AZURE_AD_USER_GROUPS_RESOURCE_TYPE,
        payload: { azureAdUserGroups: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: AZURE_AD_USER_GROUPS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};
const getAzureAdGroups = dispatch => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: AZURE_AD_GROUPS_RESOURCE_TYPE
  });
  getAzureAdGroupsFromAPI()
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: AZURE_AD_GROUPS_RESOURCE_TYPE,
        payload: { azureAdGroups: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: AZURE_AD_GROUPS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getAzureAdGroup = (dispatch, groupId) => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: AZURE_AD_GROUP_RESOURCE_TYPE
  });
  getAzureAdGroupFromAPI(groupId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: AZURE_AD_GROUP_RESOURCE_TYPE,
        payload: { azureAdGroup: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: AZURE_AD_GROUP_RESOURCE_TYPE,
        payload: { error }
      })
    );
};
const getAzureAdGroupMembers = (dispatch, groupId) => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: AZURE_AD_GROUP_MEMBERS_RESOURCE_TYPE
  });
  getAzureAdGroupMembersFromAPI(groupId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: AZURE_AD_GROUP_MEMBERS_RESOURCE_TYPE,
        payload: { azureAdGroupMembers: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: AZURE_AD_GROUP_MEMBERS_RESOURCE_TYPE,
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
