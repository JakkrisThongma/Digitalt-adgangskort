import { GET_USERS, RESPONSE_COMPLETE, ERROR } from "../actionTypes/index";

const userReducer = (state, action) => {
  if (action.type === GET_USERS) {
    return {
      users: [],
      loading: true,
      error: null
    };
  }

  if (action.type === RESPONSE_COMPLETE) {
    return {
      users: action.payload.users,
      loading: false,
      error: null
    };
  }

  if (action.type === ERROR) {
    return {
      users: [],
      loading: false,
      error: action.payload.error
    };
  }

  return state;
};

export default userReducer;
