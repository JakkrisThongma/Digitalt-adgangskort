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
  GET_GROUPS_PENDING,
  GET_GROUPS_SUCCEEDED,
  GET_GROUPS_FAILED,
  GET_GROUP_PENDING,
  GET_GROUP_SUCCEEDED,
  GET_GROUP_FAILED,
  ADD_GROUP_PENDING,
  ADD_GROUP_SUCCEEDED,
  ADD_GROUP_FAILED,
  UPDATE_GROUP_PENDING,
  UPDATE_GROUP_SUCCEEDED,
  UPDATE_GROUP_FAILED,
  DELETE_GROUP_PENDING,
  DELETE_GROUP_SUCCEEDED,
  DELETE_GROUP_FAILED,
  GET_GROUP_SMART_LOCKS_FAILED,
  GET_GROUP_SMART_LOCKS_SUCCEEDED,
  GET_GROUP_SMART_LOCKS_PENDING,
  GET_GROUP_USERS_FAILED,
  GET_GROUP_USERS_SUCCEEDED,
  GET_GROUP_USERS_PENDING,
  OPEN_ADD_GROUP_DIALOG,
  CLOSE_ADD_GROUP_DIALOG,
  OPEN_EDIT_GROUP_DIALOG,
  CLOSE_EDIT_GROUP_DIALOG,
  OPEN_DELETE_GROUP_DIALOG,
  CLOSE_DELETE_GROUP_DIALOG,
  SET_SELECTED_GROUP_ID
} from "./actionTypes";

const getGroups = dispatch => {
  dispatch({
    type: GET_GROUPS_PENDING
  });
  getGroupsFromAPI()
    .then(response =>
      dispatch({
        type: GET_GROUPS_SUCCEEDED,
        payload: { groups: response }
      })
    )
    .catch(error =>
      dispatch({
        resourceType: GET_GROUPS_FAILED,
        payload: { error }
      })
    );
};

const addGroup = (dispatch, data) => {
  dispatch({
    type: ADD_GROUP_PENDING
  });
  addGroupFromAPI(data)
    .then(response =>
      dispatch({
        type: ADD_GROUP_SUCCEEDED,
        payload: { newGroup: response }
      })
    )
    .catch(error =>
      dispatch({
        type: ADD_GROUP_FAILED,
        payload: { error }
      })
    );
};

const getGroup = (dispatch, groupId) => {
  dispatch({ type: GET_GROUP_PENDING });
  getGroupFromAPI(groupId)
    .then(response =>
      dispatch({
        type: GET_GROUP_SUCCEEDED,
        payload: { group: response }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_GROUP_FAILED,
        payload: { error }
      })
    );
};

const updateGroup = (dispatch, groupId, data) => {
  dispatch({
    type: UPDATE_GROUP_PENDING
  });
  updateGroupFromAPI(groupId, data)
    .then(() =>
      dispatch({
        type: UPDATE_GROUP_SUCCEEDED
      })
    )
    .catch(error =>
      dispatch({
        type: UPDATE_GROUP_FAILED,
        payload: { error }
      })
    );
};

const deleteGroup = (dispatch, groupId) => {
  dispatch({
    type: DELETE_GROUP_PENDING
  });
  deleteGroupFromAPI(groupId)
    .then(() =>
      dispatch({
        type: DELETE_GROUP_SUCCEEDED
      })
    )
    .catch(error =>
      dispatch({
        type: DELETE_GROUP_FAILED,
        payload: { error }
      })
    );
};
const getGroupUsers = (dispatch, groupId) => {
  dispatch({
    type: GET_GROUP_USERS_PENDING
  });
  getGroupUsersFromAPI(groupId)
    .then(response =>
      dispatch({
        type: GET_GROUP_USERS_SUCCEEDED,
        payload: { groupUsers: response }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_GROUP_USERS_FAILED,
        payload: { error }
      })
    );
};

const getGroupSmartLocks = (dispatch, groupId) => {
  dispatch({
    type: GET_GROUP_SMART_LOCKS_PENDING
  });
  getGroupSmartLocksFromAPI(groupId)
    .then(response =>
      dispatch({
        type: GET_GROUP_SMART_LOCKS_SUCCEEDED,
        payload: { groupSmartLocks: response }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_GROUP_SMART_LOCKS_FAILED,
        payload: { error }
      })
    );
};

const openAddGroupDialog = dispatch => {
  dispatch({
    type: OPEN_ADD_GROUP_DIALOG
  });
};
const closeAddGroupDialog = dispatch => {
  dispatch({
    type: CLOSE_ADD_GROUP_DIALOG
  });
};

const openEditGroupDialog = dispatch => {
  dispatch({
    type: OPEN_EDIT_GROUP_DIALOG
  });
};
const closeEditGroupDialog = dispatch => {
  dispatch({
    type: CLOSE_EDIT_GROUP_DIALOG
  });
};

const setSelectedGroupId = (dispatch, groupId) => {
  dispatch({
    type: SET_SELECTED_GROUP_ID,
    payload: { groupId }
  });
};
const openDeleteGroupDialog = dispatch => {
  dispatch({
    type: OPEN_DELETE_GROUP_DIALOG
  });
};
const closeDeleteGroupDialog = dispatch => {
  dispatch({
    type: CLOSE_DELETE_GROUP_DIALOG
  });
};

export {
  getGroups,
  addGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  setSelectedGroupId,
  getGroupUsers,
  getGroupSmartLocks,
  openAddGroupDialog,
  closeAddGroupDialog,
  openEditGroupDialog,
  closeEditGroupDialog,
  openDeleteGroupDialog,
  closeDeleteGroupDialog
};
