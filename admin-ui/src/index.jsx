import React from "react";
import ReactDOM from "react-dom";
import { runWithAdal } from "react-adal";
import App from "./App";

import { authContext } from "./auth/adalConfig";

const DO_NOT_LOGIN = false;
runWithAdal(
  authContext,
  () => {
    require("./App");
  },
  DO_NOT_LOGIN
);

ReactDOM.render(<App />, document.getElementById("root"));
