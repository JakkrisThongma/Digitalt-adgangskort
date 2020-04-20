import {
  getGroups as getGroupsFromAPI,
  addGroup as addGroupFromAPI,
  getGroup as getGroupFromAPI,
  updateGroup as updateGroupFromAPI,
  deleteGroup as deleteGroupFromAPI,
  getGroupUsers as getGroupUsersFromAPI,
  getGroupSmartLocks as getGroupSmartLocksFromAPI
} from "../services/api";
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
} from "./actionTypes";

import {
  GROUPS_RESOURCE_TYPE,
  GROUP_RESOURCE_TYPE,
  GROUP_USERS_RESOURCE_TYPE,
  GROUP_SMART_LOCKS_RESOURCE_TYPE
} from "./actionResourceTypes";

const getGroups = dispatch => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: GROUPS_RESOURCE_TYPE
  });
  getGroupsFromAPI()
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: GROUPS_RESOURCE_TYPE,
        payload: { groups: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: GROUPS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const addGroup = (dispatch, data) => {
  dispatch({
    type: CREATE_RESOURCES_PENDING,
    resourceType: GROUP_RESOURCE_TYPE
  });
  addGroupFromAPI(data)
    .then(response =>
      dispatch({
        type: CREATE_RESOURCES_SUCCEEDED,
        resourceType: GROUP_RESOURCE_TYPE,
        payload: { newGroup: response }
      })
    )
    .catch(error =>
      dispatch({
        type: CREATE_RESOURCES_FAILED,
        resourceType: GROUP_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getGroup = (dispatch, groupId) => {
  dispatch({ type: READ_RESOURCES_PENDING, resourceType: GROUP_RESOURCE_TYPE });
  getGroupFromAPI(groupId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: GROUP_RESOURCE_TYPE,
        payload: { group: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: GROUP_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const updateGroup = (dispatch, groupId, data) => {
  dispatch({
    type: UPDATE_RESOURCES_PENDING,
    resourceType: GROUP_RESOURCE_TYPE
  });
  updateGroupFromAPI(groupId, data)
    .then(() =>
      dispatch({
        type: UPDATE_RESOURCES_SUCCEEDED,
        resourceType: GROUP_RESOURCE_TYPE
      })
    )
    .catch(error =>
      dispatch({
        type: UPDATE_RESOURCES_FAILED,
        resourceType: GROUP_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const deleteGroup = (dispatch, groupId) => {
  dispatch({
    type: DELETE_RESOURCES_PENDING,
    resourceType: GROUP_RESOURCE_TYPE
  });
  deleteGroupFromAPI(groupId)
    .then(() =>
      dispatch({
        type: DELETE_RESOURCES_SUCCEEDED,
        resourceType: GROUP_RESOURCE_TYPE
      })
    )
    .catch(error =>
      dispatch({
        type: DELETE_RESOURCES_FAILED,
        resourceType: GROUP_RESOURCE_TYPE,
        payload: { error }
      })
    );
};
const getGroupUsers = (dispatch, groupId) => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: GROUP_USERS_RESOURCE_TYPE
  });
  getGroupUsersFromAPI(groupId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: GROUP_USERS_RESOURCE_TYPE,
        payload: { groupUsers: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: GROUP_USERS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getGroupSmartLocks = (dispatch, groupId) => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: GROUP_SMART_LOCKS_RESOURCE_TYPE
  });
  getGroupSmartLocksFromAPI(groupId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: GROUP_SMART_LOCKS_RESOURCE_TYPE,
        payload: { groupSmartLocks: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: GROUP_SMART_LOCKS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

export {
  getGroups,
  addGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  getGroupUsers,
  getGroupSmartLocks
};
