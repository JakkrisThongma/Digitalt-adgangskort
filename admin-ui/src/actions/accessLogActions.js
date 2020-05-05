import { getAccessLog as getAccessLogFromAPI } from "@/services/api";
import {
  GET_ACCESS_LOG_FAILED,
  GET_ACCESS_LOG_PENDING,
  GET_ACCESS_LOG_SUCCEEDED
} from "./actionTypes";

const getAccessLog = dispatch => {
  dispatch({
    type: GET_ACCESS_LOG_PENDING
  });
  getAccessLogFromAPI()
    .then(response =>
      dispatch({
        type: GET_ACCESS_LOG_SUCCEEDED,
        payload: { accessLog: response.data }
      })
    )
    .catch(error =>
      dispatch({
        type: GET_ACCESS_LOG_FAILED,
        payload: { error }
      })
    );
};

export default getAccessLog;
