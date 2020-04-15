import { addSmartLock } from "../services/api";
import { ADD_SMART_LOCK, RESPONSE_COMPLETE, ERROR } from "../actionTypes";

const addLock = (dispatch, data) => {
  dispatch({ type: ADD_SMART_LOCK });
  addSmartLock(data)
    .then(response =>
      dispatch({
        type: RESPONSE_COMPLETE,
        payload: { smartLocks: response }
      })
    )
    .catch(error => dispatch({ type: ERROR, payload: { error } }));
};

export default addLock;
