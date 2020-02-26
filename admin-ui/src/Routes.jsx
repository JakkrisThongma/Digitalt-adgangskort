import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components/common";
import Main from "./layouts/Main";

import { Home, UserList, LockList, AccessLevelList, NotFound } from "./views";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <RouteWithLayout component={Home} exact layout={Main} path="/home" />
      <RouteWithLayout component={UserList} exact layout={Main} path="/users" />
      <RouteWithLayout component={LockList} exact layout={Main} path="/locks" />
      <RouteWithLayout
        component={AccessLevelList}
        exact
        layout={Main}
        path="/access-levels"
      />
      <RouteWithLayout
        component={NotFound}
        exact
        layout={Main}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
