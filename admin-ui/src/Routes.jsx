import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout } from "./components/common";
import Main from "./layouts/Main";

import {
  Dashboard,
  UsersList,
  LockList,
  AccessLevelList,
  Login,
  NotFound
} from "./views";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <RouteWithLayout component={Login} exact layout={Main} path="/login" />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={Main}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UsersList}
        exact
        layout={Main}
        path="/users"
      />
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
