import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import theme from "./theme";
import Routes from "./Routes";

import "./App.css";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
