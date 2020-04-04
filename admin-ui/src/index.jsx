import React from "react";
import ReactDOM from "react-dom";
import runWithAdal from "react-adal";
import App from "./App";
import "./web.config";
import { authContext, getToken } from "./auth/adalConfig";

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

// ReactDOM.render(<App />, document.getElementById("root"));
