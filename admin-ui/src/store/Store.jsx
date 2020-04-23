import React from "react";
import useApiRequest from "../reducers/useApiRequest";
import userReducer from "../reducers/userReducer";
import groupReducer from "../reducers/groupReducer";
import smartLockReducer from "../reducers/smartLockReducer";
import azureAdReducer from "../reducers/azureAdReducer";

export const UserContext = React.createContext({});
export const GroupContext = React.createContext({});
export const SmartLockContext = React.createContext({});
export const AzureAdContext = React.createContext({});

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
  deleteDialogOpen: false
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
    <UserContext.Provider value={[userState, userDispatch]}>
      <GroupContext.Provider value={[groupState, groupDispatch]}>
        <SmartLockContext.Provider value={[smartLockState, smartLockDispatch]}>
          <AzureAdContext.Provider value={[azureAdState, azureAdDispatch]}>
            {children}
          </AzureAdContext.Provider>
        </SmartLockContext.Provider>
      </GroupContext.Provider>
    </UserContext.Provider>
  );
};

export default Store;
