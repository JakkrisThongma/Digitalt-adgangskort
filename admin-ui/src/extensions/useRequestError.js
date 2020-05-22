import { useHistory } from "react-router-dom";
import { authContext } from "@/services/auth";
import { useSnackbar } from "notistack";
import useDidMountEffect from "./useDidMountEffect";

const useRequestError = error => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useDidMountEffect(() => {
    if (error) {
      if (error.response.status === 401) authContext.login();
      if (error.response.status === 403) {
        history.push("/not-authorized");
      } else
        enqueueSnackbar(error.message, {
          variant: "error"
        });
    }
  }, [error]);
};

export default useRequestError;
