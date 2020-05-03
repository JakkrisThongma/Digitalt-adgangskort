import {
  GET_ACCESS_LOG_FAILED,
  GET_ACCESS_LOG_PENDING,
  GET_ACCESS_LOG_SUCCEEDED
} from "@/actions/actionTypes";

const accessLogReducer = (state, action) => {
  if (process.env.NODE_ENV !== "development")
    console.log("Access log Ad action dispatched: ", action.type);

  // Get access log
  if (action.type === GET_ACCESS_LOG_PENDING) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }

  if (action.type === GET_ACCESS_LOG_SUCCEEDED) {
    return {
      ...state,
      accessLog: action.payload.accessLog,
      loading: false,
      error: null
    };
  }

  if (action.type === GET_ACCESS_LOG_FAILED) {
    return {
      ...state,
      loading: false,
      error: action.payload.error
    };
  }

  return state;
};

export default accessLogReducer;
