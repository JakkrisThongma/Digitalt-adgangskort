import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./web.config";
import { SnackbarProvider } from "notistack";

/*
const headers = { Authorization: `Bearer ${getToken()}` };
console.log(headers);
const DO_NOT_LOGIN = false;
runWithAdal(
  authContext,
  () => {
    ReactDOM.render(<App />, document.getElementById("root"));
  },
  DO_NOT_LOGIN
);
*/

ReactDOM.render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right"
    }}>
    <App />
  </SnackbarProvider>,
  document.getElementById("root")
);
