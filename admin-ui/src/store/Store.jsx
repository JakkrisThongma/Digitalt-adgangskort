import React from "react";
import useApiRequest from "../reducers/useApiRequest";
import userReducer from "../reducers/userReducer";
import groupReducer from "../reducers/groupReducer";
import smartLockReducer from "../reducers/smartLockReducer";
import azureAdReducer from "../reducers/azureAdReducer";

export const userContext = React.createContext({});
export const groupContext = React.createContext({});
export const smartLockContext = React.createContext({});
export const azureAdContext = React.createContext({});

const userInitialState = {
  users: [],
  user: null,
  newUser: null,
  userGroups: [],
  userSmartLocks: [],
  currentAuthenticatedUser: null,
  loading: false,
  didInvalidate: false,
  error: null
};

const groupInitialState = {
  groups: [],
  group: null,
  newGroup: null,
  selectedGroupId: null,
  groupUsers: [],
  groupSmartLocks: [],
  loading: false,
  didInvalidate: false,
  error: null,
  addDialogOpen: false,
  editDialogOpen: false,
  deleteDialogOpen: false,
  viewDialogOpen: false
};

const smartLockInitialState = {
  smartLocks: [],
  smartLock: null,
  newSmartLock: null,
  newSmartLockUser: null,
  newSmartLockGroup: null,
  smartLockUsers: [],
  smartLockGroups: [],
  loading: false,
  didInvalidate: false,
  error: null
};
const azureAdInitialState = {
  azureAdUsers: [],
  azureAdUser: null,
  azureAdUserPhoto: null,
  azureAdUserGroups: [],
  azureAdGroups: [],
  azureAdGroup: null,
  azureAdGroupMembers: [],
  loading: false,
  didInvalidate: false,
  error: null
};

const Store = ({ children }) => {
  const [userState, userDispatch] = useApiRequest(
    userReducer,
    userInitialState
  );
  const [groupState, groupDispatch] = useApiRequest(
    groupReducer,
    groupInitialState
  );
  const [smartLockState, smartLockDispatch] = useApiRequest(
    smartLockReducer,
    smartLockInitialState
  );
  const [azureAdState, azureAdDispatch] = useApiRequest(
    azureAdReducer,
    azureAdInitialState
  );

  return (
    <userContext.Provider value={[userState, userDispatch]}>
      <groupContext.Provider value={[groupState, groupDispatch]}>
        <smartLockContext.Provider value={[smartLockState, smartLockDispatch]}>
          <azureAdContext.Provider value={[azureAdState, azureAdDispatch]}>
            {children}
          </azureAdContext.Provider>
        </smartLockContext.Provider>
      </groupContext.Provider>
    </userContext.Provider>
  );
};

export default Store;
