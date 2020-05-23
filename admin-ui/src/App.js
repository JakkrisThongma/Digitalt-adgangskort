import React, { useContext, useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { SnackbarProvider } from "notistack";
import Routes from "./router";
import "@/styles/App.css";
import { Store, uiContext } from "./store";
import helpers from "@/helpers";

const { getTheme } = helpers;

const browserHistory = createBrowserHistory();

function App() {
  const [uiState, uiDispatch] = useContext(uiContext);
  const { fontScaleLevel } = uiState;
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={getTheme(fontScaleLevel)}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
