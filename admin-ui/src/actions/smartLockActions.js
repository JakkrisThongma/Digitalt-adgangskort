import {
  addSmartLock as addSmartLockFromAPI,
  addSmartLockGroup as addSmartLockGroupFromAPI,
  addSmartLockUser as addSmartLockUserFromAPI,
  deleteSmartLock as deleteSmartLockFromAPI,
  deleteSmartLockGroup as deleteSmartLockGroupFromAPI,
  deleteSmartLockUser as deleteSmartLockUserFromAPI,
  getSmartLock as getSmartLockFromAPI,
  getSmartLockGroups as getSmartLockGroupsFromAPI,
  getSmartLocks as getSmartLocksFromAPI,
  getSmartLockUsers as getSmartLockUsersFromAPI,
  updateSmartLock as updateSmartLockFromAPI
} from "../services/api";
import {
  ADD_SMART_LOCK_FAILED,
  ADD_SMART_LOCK_GROUP_FAILED,
  ADD_SMART_LOCK_GROUP_PENDING,
  ADD_SMART_LOCK_GROUP_SUCCEEDED,
  ADD_SMART_LOCK_PENDING,
  ADD_SMART_LOCK_SUCCEEDED,
  ADD_SMART_LOCK_USER_FAILED,
  ADD_SMART_LOCK_USER_PENDING,
  ADD_SMART_LOCK_USER_SUCCEEDED,
  DELETE_SMART_LOCK_FAILED,
  DELETE_SMART_LOCK_GROUP_FAILED,
  DELETE_SMART_LOCK_GROUP_PENDING,
  DELETE_SMART_LOCK_GROUP_SUCCEEDED,
  DELETE_SMART_LOCK_PENDING,
  DELETE_SMART_LOCK_SUCCEEDED,
  DELETE_SMART_LOCK_USER_FAILED,
  DELETE_SMART_LOCK_USER_PENDING,
  DELETE_SMART_LOCK_USER_SUCCEEDED,
  GET_SMART_LOCK_FAILED,
  GET_SMART_LOCK_GROUPS_FAILED,
  GET_SMART_LOCK_GROUPS_PENDING,
  GET_SMART_LOCK_GROUPS_SUCCEEDED,
  GET_SMART_LOCK_PENDING,
  GET_SMART_LOCK_SUCCEEDED,
  GET_SMART_LOCK_USERS_FAILED,
  GET_SMART_LOCK_USERS_PENDING,
  GET_SMART_LOCK_USERS_SUCCEEDED,
  GET_SMART_LOCKS_FAILED,
  GET_SMART_LOCKS_PENDING,
  GET_SMART_LOCKS_SUCCEEDED,
  SET_SELECTED_SMART_LOCK_ID,
  UPDATE_SMART_LOCK_FAILED,
  UPDATE_SMART_LOCK_PENDING,
  UPDATE_SMART_LOCK_SUCCEEDED
} from "./actionTypes";

const getSmartLocks = dispatch => {
  dispatch({
    type: GET_SMART_LOCKS_PENDING
  });
  getSmartLocksFromAPI()
    .then(response =>
      dispatch({
        type: GET_SMART_LOCKS_SUCCEEDED,
        payload: { smartLocks: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_SMART_LOCKS_FAILED,
        payload: { error }
      })
    );
};

const addSmartLock = (dispatch, data) => {
  dispatch({
    type: ADD_SMART_LOCK_PENDING
  });
  addSmartLockFromAPI(data)
    .then(response =>
      dispatch({
        type: ADD_SMART_LOCK_SUCCEEDED,
        payload: { newSmartLock: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: ADD_SMART_LOCK_FAILED,
        payload: { error }
      })
    );
};

const getSmartLock = (dispatch, smartLockId) => {
  dispatch({
    type: GET_SMART_LOCK_PENDING
  });
  getSmartLockFromAPI(smartLockId)
    .then(response =>
      dispatch({
        type: GET_SMART_LOCK_SUCCEEDED,
        payload: { smartLock: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_SMART_LOCK_FAILED,
        payload: { error }
      })
    );
};

const updateSmartLock = (dispatch, smartLockId, data) => {
  dispatch({
    type: UPDATE_SMART_LOCK_PENDING
  });
  updateSmartLockFromAPI(smartLockId, data)
    .then(() =>
      dispatch({
        type: UPDATE_SMART_LOCK_SUCCEEDED
      })
    )
    .catch(error =>
      dispatch({
        type: UPDATE_SMART_LOCK_FAILED,
        payload: { error }
      })
    );
};

const deleteSmartLock = (dispatch, smartLockId) => {
  dispatch({
    type: DELETE_SMART_LOCK_PENDING
  });
  deleteSmartLockFromAPI(smartLockId)
    .then(() =>
      dispatch({
        type: DELETE_SMART_LOCK_SUCCEEDED
      })
    )
    .catch(error =>
      dispatch({
        type: DELETE_SMART_LOCK_FAILED,
        payload: { error }
      })
    );
};

const getSmartLockUsers = (dispatch, smartLockId) => {
  dispatch({
    type: GET_SMART_LOCK_USERS_PENDING
  });
  getSmartLockUsersFromAPI(smartLockId)
    .then(response =>
      dispatch({
        type: GET_SMART_LOCK_USERS_SUCCEEDED,
        payload: { smartLockUsers: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_SMART_LOCK_USERS_FAILED,
        payload: { error }
      })
    );
};

const addSmartLockUser = (dispatch, smartLockId, data) => {
  dispatch({
    type: ADD_SMART_LOCK_USER_PENDING
  });
  addSmartLockUserFromAPI(smartLockId, data)
    .then(response =>
      dispatch({
        type: ADD_SMART_LOCK_USER_SUCCEEDED,
        payload: { newSmartLockUser: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: ADD_SMART_LOCK_USER_FAILED,
        payload: { error }
      })
    );
};

const deleteSmartLockUser = (dispatch, smartLockId, userId) => {
  dispatch({
    type: DELETE_SMART_LOCK_USER_PENDING
  });
  deleteSmartLockUserFromAPI(smartLockId, userId)
    .then(() =>
      dispatch({
        type: DELETE_SMART_LOCK_USER_SUCCEEDED
      })
    )
    .catch(error =>
      dispatch({
        type: DELETE_SMART_LOCK_USER_FAILED,
        payload: { error }
      })
    );
};

const getSmartLockGroups = (dispatch, smartLockId) => {
  dispatch({
    type: GET_SMART_LOCK_GROUPS_PENDING
  });
  getSmartLockGroupsFromAPI(smartLockId)
    .then(response =>
      dispatch({
        type: GET_SMART_LOCK_GROUPS_SUCCEEDED,
        payload: { smartLockGroups: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_SMART_LOCK_GROUPS_FAILED,
        payload: { error }
      })
    );
};

const addSmartLockGroup = (dispatch, smartLockId, data) => {
  dispatch({
    type: ADD_SMART_LOCK_GROUP_PENDING
  });
  addSmartLockGroupFromAPI(smartLockId, data)
    .then(response =>
      dispatch({
        type: ADD_SMART_LOCK_GROUP_SUCCEEDED,
        payload: { newSmartLockGroup: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: ADD_SMART_LOCK_GROUP_FAILED,
        payload: { error }
      })
    );
};

const deleteSmartLockGroup = (dispatch, smartLockId, groupId) => {
  dispatch({
    type: DELETE_SMART_LOCK_GROUP_PENDING
  });
  deleteSmartLockGroupFromAPI(smartLockId, groupId)
    .then(() =>
      dispatch({
        type: DELETE_SMART_LOCK_GROUP_SUCCEEDED
      })
    )
    .catch(error =>
      dispatch({
        type: DELETE_SMART_LOCK_GROUP_FAILED,
        payload: { error }
      })
    );
};

const setSelectedSmartLockId = (dispatch, smartLockId) => {
  dispatch({
    type: SET_SELECTED_SMART_LOCK_ID,
    payload: { smartLockId }
  });
};

export {
  getSmartLocks,
  addSmartLock,
  getSmartLock,
  updateSmartLock,
  deleteSmartLock,
  getSmartLockUsers,
  addSmartLockUser,
  deleteSmartLockUser,
  getSmartLockGroups,
  addSmartLockGroup,
  deleteSmartLockGroup,
  setSelectedSmartLockId
};
