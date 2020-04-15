import { getUsers } from "../services/api";
import { GET_USERS, RESPONSE_COMPLETE, ERROR } from "../actionTypes";

const fetchUsers = dispatch => {
  dispatch({ type: GET_USERS });
  getUsers()
    .then(response =>
      dispatch({
        type: RESPONSE_COMPLETE,
        payload: { users: response }
      })
    )
    .catch(error => dispatch({ type: ERROR, payload: { error } }));
};

export default fetchUsers;
