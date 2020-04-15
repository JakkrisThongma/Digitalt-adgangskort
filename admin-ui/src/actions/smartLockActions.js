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
  SMART_LOCKS_RESOURCE_TYPE,
  SMART_LOCK_RESOURCE_TYPE,
  SMART_LOCK_USERS_RESOURCE_TYPE,
  SMART_LOCK_USER_RESOURCE_TYPE,
  SMART_LOCK_GROUPS_RESOURCE_TYPE,
  SMART_LOCK_GROUP_RESOURCE_TYPE
} from "../types/resourceTypes";

const getSmartLocks = dispatch => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: SMART_LOCKS_RESOURCE_TYPE
  });
  getSmartLocksFromAPI()
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: SMART_LOCKS_RESOURCE_TYPE,
        payload: { smartLocks: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: SMART_LOCKS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const addSmartLock = (dispatch, data) => {
  dispatch({
    type: CREATE_RESOURCES_PENDING,
    resourceType: SMART_LOCK_RESOURCE_TYPE
  });
  addSmartLockFromAPI(data)
    .then(response =>
      dispatch({
        type: CREATE_RESOURCES_SUCCEEDED,
        resourceType: SMART_LOCK_RESOURCE_TYPE,
        payload: { newSmartLock: response }
      })
    )
    .catch(error =>
      dispatch({
        type: CREATE_RESOURCES_FAILED,
        resourceType: SMART_LOCK_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getSmartLock = (dispatch, smartLockId) => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: SMART_LOCK_RESOURCE_TYPE
  });
  getSmartLockFromAPI(smartLockId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: SMART_LOCK_RESOURCE_TYPE,
        payload: { smartLock: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: SMART_LOCK_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const updateSmartLock = (dispatch, smartLockId, data) => {
  dispatch({
    type: UPDATE_RESOURCES_PENDING,
    resourceType: SMART_LOCK_RESOURCE_TYPE
  });
  updateSmartLockFromAPI(smartLockId, data)
    .then(() =>
      dispatch({
        type: UPDATE_RESOURCES_SUCCEEDED,
        resourceType: SMART_LOCK_RESOURCE_TYPE
      })
    )
    .catch(error =>
      dispatch({
        type: UPDATE_RESOURCES_FAILED,
        resourceType: SMART_LOCK_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const deleteSmartLock = (dispatch, smartLockId) => {
  dispatch({
    type: DELETE_RESOURCES_PENDING,
    resourceType: SMART_LOCK_RESOURCE_TYPE
  });
  deleteSmartLockFromAPI(smartLockId)
    .then(() =>
      dispatch({
        type: DELETE_RESOURCES_SUCCEEDED,
        resourceType: SMART_LOCK_RESOURCE_TYPE
      })
    )
    .catch(error =>
      dispatch({
        type: DELETE_RESOURCES_FAILED,
        resourceType: SMART_LOCK_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getSmartLockUsers = (dispatch, smartLockId) => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: SMART_LOCK_USERS_RESOURCE_TYPE
  });
  getSmartLockUsersFromAPI(smartLockId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: SMART_LOCK_USERS_RESOURCE_TYPE,
        payload: { smartLockUsers: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: SMART_LOCK_USERS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const addSmartLockUser = (dispatch, smartLockId, data) => {
  dispatch({
    type: CREATE_RESOURCES_PENDING,
    resourceType: SMART_LOCK_USER_RESOURCE_TYPE
  });
  addSmartLockUserFromAPI(smartLockId, data)
    .then(response =>
      dispatch({
        type: CREATE_RESOURCES_SUCCEEDED,
        resourceType: SMART_LOCK_USER_RESOURCE_TYPE,
        payload: { newSmartLockUser: response }
      })
    )
    .catch(error =>
      dispatch({
        type: CREATE_RESOURCES_FAILED,
        resourceType: SMART_LOCK_USER_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const deleteSmartLockUser = (dispatch, smartLockId) => {
  dispatch({
    type: DELETE_RESOURCES_PENDING,
    resourceType: SMART_LOCK_USER_RESOURCE_TYPE
  });
  deleteSmartLockUserFromAPI(smartLockId)
    .then(() =>
      dispatch({
        type: DELETE_RESOURCES_SUCCEEDED,
        resourceType: SMART_LOCK_USER_RESOURCE_TYPE
      })
    )
    .catch(error =>
      dispatch({
        type: DELETE_RESOURCES_FAILED,
        resourceType: SMART_LOCK_USER_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const getSmartLockGroups = (dispatch, smartLockId) => {
  dispatch({
    type: READ_RESOURCES_PENDING,
    resourceType: SMART_LOCK_GROUPS_RESOURCE_TYPE
  });
  getSmartLockGroupsFromAPI(smartLockId)
    .then(response =>
      dispatch({
        type: READ_RESOURCES_SUCCEEDED,
        resourceType: SMART_LOCK_GROUPS_RESOURCE_TYPE,
        payload: { smartLockGroups: response }
      })
    )
    .catch(error =>
      dispatch({
        type: READ_RESOURCES_FAILED,
        resourceType: SMART_LOCK_GROUPS_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const addSmartLockGroup = (dispatch, smartLockId, data) => {
  dispatch({
    type: CREATE_RESOURCES_PENDING,
    resourceType: SMART_LOCK_GROUP_RESOURCE_TYPE
  });
  addSmartLockGroupFromAPI(smartLockId, data)
    .then(response =>
      dispatch({
        type: CREATE_RESOURCES_SUCCEEDED,
        resourceType: SMART_LOCK_GROUP_RESOURCE_TYPE,
        payload: { newSmartLockGroup: response }
      })
    )
    .catch(error =>
      dispatch({
        type: CREATE_RESOURCES_FAILED,
        resourceType: SMART_LOCK_GROUP_RESOURCE_TYPE,
        payload: { error }
      })
    );
};

const deleteSmartLockGroup = (dispatch, smartLockId) => {
  dispatch({
    type: DELETE_RESOURCES_PENDING,
    resourceType: SMART_LOCK_GROUP_RESOURCE_TYPE
  });
  deleteSmartLockGroupFromAPI(smartLockId)
    .then(() =>
      dispatch({
        type: DELETE_RESOURCES_SUCCEEDED,
        resourceType: SMART_LOCK_GROUP_RESOURCE_TYPE
      })
    )
    .catch(error =>
      dispatch({
        type: DELETE_RESOURCES_FAILED,
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
