import React from "react";
import useApiRequest from "../reducers/useApiRequest";
import userReducer from "../reducers/userReducer";
import groupReducer from "../reducers/groupReducer";
import smartLockReducer from "../reducers/smartLockReducer";
import azureAdReducer from "../reducers/azureAdReducer";
import userInitialState from "./userInitialState";
import groupInitialState from "./groupInitialState";
import smartLockInitialState from "./smartLockInitialState";
import azureAdInitialState from "./azureAdInitialState";

export const userContext = React.createContext({});
export const groupContext = React.createContext({});
export const smartLockContext = React.createContext({});
export const azureAdContext = React.createContext({});

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
