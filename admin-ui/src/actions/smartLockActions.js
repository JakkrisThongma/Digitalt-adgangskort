import {
  getSmartLocks as getSmartLocksFromAPI,
  addSmartLock as addSmartLockFromAPI,
  getSmartLock as getSmartLockFromAPI,
  updateSmartLock as updateSmartLockFromAPI,
  deleteSmartLock as deleteSmartLockFromAPI,
  getSmartLockUsers as getSmartLockUsersFromAPI,
  getSmartLockGroups as getSmartLockGroupsFromAPI,
  addSmartLockUser as addSmartLockUserFromAPI,
  deleteSmartLockUser as deleteSmartLockUserFromAPI,
  addSmartLockGroup as addSmartLockGroupFromAPI,
  deleteSmartLockGroup as deleteSmartLockGroupFromAPI
} from "../services/api";
import {
  GET_SMART_LOCKS_PENDING,
  GET_SMART_LOCKS_SUCCEEDED,
  GET_SMART_LOCKS_FAILED,
  GET_SMART_LOCK_PENDING,
  GET_SMART_LOCK_SUCCEEDED,
  GET_SMART_LOCK_FAILED,
  ADD_SMART_LOCK_PENDING,
  ADD_SMART_LOCK_SUCCEEDED,
  ADD_SMART_LOCK_FAILED,
  GET_SMART_LOCK_GROUPS_FAILED,
  GET_SMART_LOCK_GROUPS_SUCCEEDED,
  GET_SMART_LOCK_GROUPS_PENDING,
  GET_SMART_LOCK_USERS_FAILED,
  GET_SMART_LOCK_USERS_SUCCEEDED,
  GET_SMART_LOCK_USERS_PENDING,
  ADD_SMART_LOCK_GROUP_FAILED,
  ADD_SMART_LOCK_GROUP_PENDING,
  ADD_SMART_LOCK_GROUP_SUCCEEDED,
  ADD_SMART_LOCK_USER_FAILED,
  ADD_SMART_LOCK_USER_PENDING,
  ADD_SMART_LOCK_USER_SUCCEEDED,
  UPDATE_SMART_LOCK_PENDING,
  UPDATE_SMART_LOCK_SUCCEEDED,
  UPDATE_SMART_LOCK_FAILED,
  DELETE_SMART_LOCK_PENDING,
  DELETE_SMART_LOCK_SUCCEEDED,
  DELETE_SMART_LOCK_FAILED,
  DELETE_SMART_LOCK_GROUP_FAILED,
  DELETE_SMART_LOCK_GROUP_PENDING,
  DELETE_SMART_LOCK_GROUP_SUCCEEDED,
  DELETE_SMART_LOCK_USER_FAILED,
  DELETE_SMART_LOCK_USER_PENDING,
  DELETE_SMART_LOCK_USER_SUCCEEDED
} from "./actionTypes";

const getSmartLocks = dispatch => {
  dispatch({
    type: GET_SMART_LOCKS_PENDING
  });
  getSmartLocksFromAPI()
    .then(response =>
      dispatch({
        type: GET_SMART_LOCKS_SUCCEEDED,
        payload: { smartLocks: response }
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
        payload: { newSmartLock: response }
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
        payload: { smartLock: response }
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
        payload: { smartLockUsers: response }
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
        payload: { newSmartLockUser: response }
      })
    )
    .catch(error =>
      dispatch({
        type: ADD_SMART_LOCK_USER_FAILED,
        payload: { error }
      })
    );
};

const deleteSmartLockUser = (dispatch, smartLockId) => {
  dispatch({
    type: DELETE_SMART_LOCK_USER_PENDING
  });
  deleteSmartLockUserFromAPI(smartLockId)
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
        payload: { smartLockGroups: response }
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
        payload: { newSmartLockGroup: response }
      })
    )
    .catch(error =>
      dispatch({
        type: ADD_SMART_LOCK_GROUP_FAILED,
        payload: { error }
      })
    );
};

const deleteSmartLockGroup = (dispatch, smartLockId) => {
  dispatch({
    type: DELETE_SMART_LOCK_GROUP_PENDING,
    resourceType: SMART_LOCK_GROUP_RESOURCE_TYPE
  });
  deleteSmartLockGroupFromAPI(smartLockId)
    .then(() =>
      dispatch({
        type: DELETE_SMART_LOCK_GROUP_SUCCEEDED,
        resourceType: SMART_LOCK_GROUP_RESOURCE_TYPE
      })
    )
    .catch(error =>
      dispatch({
        type: DELETE_SMART_LOCK_GROUP_FAILED,
        resourceType: SMART_LOCK_GROUP_RESOURCE_TYPE,
        payload: { error }
      })
    );
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
  deleteSmartLockGroup
};
