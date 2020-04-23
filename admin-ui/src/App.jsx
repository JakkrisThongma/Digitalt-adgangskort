import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { theme } from "./styles";
import Routes from "./Router";
import "@/styles/App.css";
import Store from "./store";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <>
      <CssBaseline />

      <ThemeProvider theme={theme}>
        <Store>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </Store>
      </ThemeProvider>
    </>
  );
}

export default App;
