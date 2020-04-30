import React from "react";
import PropTypes from "prop-types";
import useApiRequest from "@/extensions/useApiRequest";
import userReducer from "../reducers/userReducer";
import groupReducer from "../reducers/groupReducer";
import smartLockReducer from "../reducers/smartLockReducer";
import azureAdReducer from "../reducers/azureAdReducer";
import userInitialState from "./userInitialState";
import groupInitialState from "./groupInitialState";
import smartLockInitialState from "./smartLockInitialState";
import azureAdInitialState from "./azureAdInitialState";
import uiReducer from "../reducers/uiReducer";
import uiInitialState from "./uiInitialState";

export const userContext = React.createContext({});
export const groupContext = React.createContext({});
export const smartLockContext = React.createContext({});
export const azureAdContext = React.createContext({});
export const uiContext = React.createContext({});

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

  const [uiState, uiDispatch] = useApiRequest(uiReducer, uiInitialState);

  return (
    <userContext.Provider value={[userState, userDispatch]}>
      <groupContext.Provider value={[groupState, groupDispatch]}>
        <smartLockContext.Provider value={[smartLockState, smartLockDispatch]}>
          <azureAdContext.Provider value={[azureAdState, azureAdDispatch]}>
            <uiContext.Provider value={[uiState, uiDispatch]}>
              {children}
            </uiContext.Provider>
          </azureAdContext.Provider>
        </smartLockContext.Provider>
      </groupContext.Provider>
    </userContext.Provider>
  );
};

Store.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

Store.defaultProps = {
  children: {}
};
export default Store;
