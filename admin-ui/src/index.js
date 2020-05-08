import React from "react";
import ReactDOM from "react-dom";
import "./web.config";
import { authContext } from "@/services/auth";
import { runWithAdal } from "react-adal";
import AppWrapper from "./AppWrapper";

// Activate Azure Ad authentication
const DO_NOT_LOGIN = false;
runWithAdal(
  authContext,
  () => {
    ReactDOM.render(<AppWrapper />, document.getElementById("root"));
  },
  DO_NOT_LOGIN
);

// ReactDOM.render(<App />, document.getElementById("root"));
