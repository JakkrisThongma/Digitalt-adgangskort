import React from "react";
import ReactDOM from "react-dom";
import { runWithAdal } from "react-adal";
import App from "./App";
import "./web.config";

import { authContext } from "./auth/adalConfig";

const DO_NOT_LOGIN = false;
runWithAdal(
  authContext,
  () => {
    ReactDOM.render(<App />, document.getElementById("root"));
  },
  DO_NOT_LOGIN
);
