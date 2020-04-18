import {
  getUsers as getUsersFromAPI,
  addUser as addUserFromAPI,
  getUser as getUserFromAPI,
  updateUser as updateUserFromAPI,
  deleteUser as deleteUserFromAPI,
  getUserGroups as getUserGroupsFromAPI,
  getUserSmartLocks as getUserSmartLocksFromAPI,
  getCurrentAuthenticatedUser as getCurrentAuthenticatedUserFromAPI
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
  USERS_RESOURCE_TYPE,
  USER_RESOURCE_TYPE,
  USER_GROUPS_RESOURCE_TYPE,
  USER_SMART_LOCKS_RESOURCE_TYPE,
  CURRENT_AUTHENTICATED_USER_RESOURCE_TYPE
} from "./actionResourceTypes";

const getUsers = dispatch => {
  dispatch({ type: READ_RESOURCES_PENDING, resourceType: USERS_RESOURCE_TYPE });
  getUsersFromAPI()
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: USERS_RESOURCE_TYPE,
        payload: { users: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: USERS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const addUSer = (dispatch, data) => {
  dispatch({
    type: CREATE_RESOURCES_PENDING,
    resourceType: USER_RESOURCE_TYPE
  });
  addUserFromAPI(data)
    .then(response =>
      dispatch({
        type: CREATE_RESOURCES_SUCCEEDED,
        resourceType: USER_RESOURCE_TYPE,
        payload: { newUser: response }
      })
    )
    .catch(error =>
      dispatch({
        type: CREATE_RESOURCES_FAILED,
        resourceType: USER_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getUser = (dispatch, userId) => {
  dispatch({ type: READ_RESOURCES_PENDING, resourceType: USER_RESOURCE_TYPE });
  getUserFromAPI(userId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: USER_RESOURCE_TYPE,
        payload: { user: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: USER_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const updateUser = (dispatch, userId, data) => {
  dispatch({
    type: UPDATE_RESOURCES_PENDING,
    resourceType: USER_RESOURCE_TYPE
  });
  updateUserFromAPI(userId, data)
    .then(() =>
      dispatch({
        type: UPDATE_RESOURCES_SUCCEEDED,
        resourceType: USER_RESOURCE_TYPE
      })
    )
    .catch(error =>
      dispatch({
        type: UPDATE_RESOURCES_FAILED,
        resourceType: USER_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const deleteUser = (dispatch, userId) => {
  dispatch({
    type: DELETE_RESOURCES_PENDING,
    resourceType: USER_RESOURCE_TYPE
  });
  deleteUserFromAPI(userId)
    .then(() =>
      dispatch({
        type: DELETE_RESOURCES_SUCCEEDED,
        resourceType: USER_RESOURCE_TYPE
      })
    )
    .catch(error =>
      dispatch({
        type: DELETE_RESOURCES_FAILED,
        resourceType: USER_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getUserGroups = (dispatch, userId) => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: USER_GROUPS_RESOURCE_TYPE
  });
  getUserGroupsFromAPI(userId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: USER_GROUPS_RESOURCE_TYPE,
        payload: { userGroups: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: USER_GROUPS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getUserSmartLocks = (dispatch, userId) => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: USER_SMART_LOCKS_RESOURCE_TYPE
  });
  getUserSmartLocksFromAPI(userId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: USER_SMART_LOCKS_RESOURCE_TYPE,
        payload: { userSmartLocks: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: USER_SMART_LOCKS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getCurrentAuthenticatedUser = dispatch => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: CURRENT_AUTHENTICATED_USER_RESOURCE_TYPE
  });
  getCurrentAuthenticatedUserFromAPI()
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: CURRENT_AUTHENTICATED_USER_RESOURCE_TYPE,
        payload: { currentAuthenticatedUser: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: CURRENT_AUTHENTICATED_USER_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

export {
  getUsers,
  addUSer,
  getUser,
  updateUser,
  deleteUser,
  getUserGroups,
  getUserSmartLocks,
  getCurrentAuthenticatedUser
};
