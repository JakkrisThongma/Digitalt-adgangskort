import { useCallback, useReducer } from "react";

const useApiRequest = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    action => {
      if (typeof action === "function") {
        action(dispatch);
      } else {
        dispatch(action);
      }
    },
    [dispatch]
  );
  return [state, enhancedDispatch];
};

export default useApiRequest;
