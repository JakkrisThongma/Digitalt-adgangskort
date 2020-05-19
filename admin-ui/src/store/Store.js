import React from "react";
import PropTypes from "prop-types";
import useThunkReducer from "@/extensions/useThunkReducer";
import {
  accessLogReducer,
  userReducer,
  groupReducer,
  smartLockReducer,
  azureAdReducer,
  uiReducer
} from "@/reducers";

import accessLogInitialState from "./accessLogInitialState";
import userInitialState from "./userInitialState";
import groupInitialState from "./groupInitialState";
import smartLockInitialState from "./smartLockInitialState";
import azureAdInitialState from "./azureAdInitialState";
import uiInitialState from "./uiInitialState";

export const userContext = React.createContext({});
export const groupContext = React.createContext({});
export const smartLockContext = React.createContext({});
export const azureAdContext = React.createContext({});
export const accessLogContext = React.createContext({});
export const uiContext = React.createContext({});

const Store = ({ children }) => {
  const [userState, userDispatch] = useThunkReducer(
    userReducer,
    userInitialState
  );
  const [groupState, groupDispatch] = useThunkReducer(
    groupReducer,
    groupInitialState
  );
  const [smartLockState, smartLockDispatch] = useThunkReducer(
    smartLockReducer,
    smartLockInitialState
  );
  const [azureAdState, azureAdDispatch] = useThunkReducer(
    azureAdReducer,
    azureAdInitialState
  );
  const [accessLogState, accessLogDispatch] = useThunkReducer(
    accessLogReducer,
    accessLogInitialState
  );
  const [uiState, uiDispatch] = useThunkReducer(uiReducer, uiInitialState);

  return (
    <userContext.Provider value={[userState, userDispatch]}>
      <groupContext.Provider value={[groupState, groupDispatch]}>
        <smartLockContext.Provider value={[smartLockState, smartLockDispatch]}>
          <azureAdContext.Provider value={[azureAdState, azureAdDispatch]}>
            <accessLogContext.Provider
              value={[accessLogState, accessLogDispatch]}>
              <uiContext.Provider value={[uiState, uiDispatch]}>
                {children}
              </uiContext.Provider>
            </accessLogContext.Provider>
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
