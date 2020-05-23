import {
  ADD_USER_FAILED,
  ADD_USER_PENDING,
  ADD_USER_SUCCEEDED,
  DELETE_USER_FAILED,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCEEDED,
  GET_CURRENT_AUTHENTICATED_USER_FAILED,
  GET_CURRENT_AUTHENTICATED_USER_PENDING,
  GET_CURRENT_AUTHENTICATED_USER_SUCCEEDED,
  GET_CURRENT_USER_ACCESS_LEVEL_PENDING,
  GET_CURRENT_USER_ACCESS_LEVEL_FAILED,
  GET_CURRENT_USER_ACCESS_LEVEL_SUCCEEDED,
  GET_USER_FAILED,
  GET_USER_GROUPS_FAILED,
  GET_USER_GROUPS_PENDING,
  GET_USER_GROUPS_SUCCEEDED,
  GET_USER_PENDING,
  GET_USER_SMART_LOCKS_FAILED,
  GET_USER_SMART_LOCKS_PENDING,
  GET_USER_SMART_LOCKS_SUCCEEDED,
  GET_USER_SUCCEEDED,
  GET_USERS_FAILED,
  GET_USERS_PENDING,
  GET_USERS_SUCCEEDED,
  SET_SELECTED_USER_ID,
  UPDATE_USER_FAILED,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCEEDED
} from "@/actions/actionTypes";
import {
  addUser as addUserFromAPI,
  deleteUser as deleteUserFromAPI,
  getCurrentAuthenticatedUser as getCurrentAuthenticatedUserFromAPI,
  getCurrentUserAccessLevel as getCurrentUserAccessLevelFromAPI,
  getUser as getUserFromAPI,
  getUserGroups as getUserGroupsFromAPI,
  getUsers as getUsersFromAPI,
  getUserSmartLocks as getUserSmartLocksFromAPI,
  updateUser as updateUserFromAPI
} from "../services/api";

const getUsers = dispatch => {
  dispatch({ type: GET_USERS_PENDING });
  getUsersFromAPI()
    .then(response =>
      dispatch({
        type: GET_USERS_SUCCEEDED,
        payload: { users: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_USERS_FAILED,
        payload: { error }
      })
    );
};

const addUser = (dispatch, data) => {
  dispatch({
    type: ADD_USER_PENDING
  });
  addUserFromAPI(data)
    .then(response =>
      dispatch({
        type: ADD_USER_SUCCEEDED,
        payload: { newUser: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: ADD_USER_FAILED,
        payload: { error }
      })
    );
};

const getUser = (dispatch, userId) => {
  dispatch({ type: GET_USER_PENDING });
  getUserFromAPI(userId)
    .then(response =>
      dispatch({
        type: GET_USER_SUCCEEDED,
        payload: { user: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_USER_FAILED,
        payload: { error }
      })
    );
};

const updateUser = (dispatch, userId, data) => {
  dispatch({
    type: UPDATE_USER_PENDING
  });
  updateUserFromAPI(userId, data)
    .then(() =>
      dispatch({
        type: UPDATE_USER_SUCCEEDED
      })
    )
    .catch(error =>
      dispatch({
        type: UPDATE_USER_FAILED,
        payload: { error }
      })
    );
};

const deleteUser = (dispatch, userId) => {
  dispatch({
    type: DELETE_USER_PENDING
  });
  deleteUserFromAPI(userId)
    .then(() =>
      dispatch({
        type: DELETE_USER_SUCCEEDED
      })
    )
    .catch(error =>
      dispatch({
        type: DELETE_USER_FAILED,
        payload: { error }
      })
    );
};

const getUserGroups = (dispatch, userId) => {
  dispatch({
    type: GET_USER_GROUPS_PENDING
  });
  getUserGroupsFromAPI(userId)
    .then(response =>
      dispatch({
        type: GET_USER_GROUPS_SUCCEEDED,
        payload: { userGroups: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_USER_GROUPS_FAILED,
        payload: { error }
      })
    );
};

const getUserSmartLocks = (dispatch, userId) => {
  dispatch({
    type: GET_USER_SMART_LOCKS_PENDING
  });
  getUserSmartLocksFromAPI(userId)
    .then(response =>
      dispatch({
        type: GET_USER_SMART_LOCKS_SUCCEEDED,
        payload: { userSmartLocks: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_USER_SMART_LOCKS_FAILED,
        payload: { error }
      })
    );
};

const getCurrentAuthenticatedUser = dispatch => {
  dispatch({
    type: GET_CURRENT_AUTHENTICATED_USER_PENDING
  });
  getCurrentAuthenticatedUserFromAPI()
    .then(response =>
      dispatch({
        type: GET_CURRENT_AUTHENTICATED_USER_SUCCEEDED,
        payload: { currentAuthenticatedUser: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_CURRENT_AUTHENTICATED_USER_FAILED,
        payload: { error }
      })
    );
};

const getCurrentUserAccessLevel = dispatch => {
  dispatch({
    type: GET_CURRENT_USER_ACCESS_LEVEL_PENDING
  });
  getCurrentUserAccessLevelFromAPI()
    .then(response =>
      dispatch({
        type: GET_CURRENT_USER_ACCESS_LEVEL_SUCCEEDED,
        payload: { currentUserAccessLevel: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_CURRENT_USER_ACCESS_LEVEL_FAILED,
        payload: { error }
      })
    );
};

const setSelectedUserId = (dispatch, userId) => {
  dispatch({
    type: SET_SELECTED_USER_ID,
    payload: { userId }
  });
};

export {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getUserGroups,
  getUserSmartLocks,
  getCurrentAuthenticatedUser,
  getCurrentUserAccessLevel,
  setSelectedUserId
};
