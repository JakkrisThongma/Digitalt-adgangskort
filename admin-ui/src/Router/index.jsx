import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout, MainLayout } from "@/components/layout";

import {
  Login,
  Dashboard,
  UsersList,
  LockList,
  AccessLevelList,
  NotFound
} from "@/components/pages";

const Router = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <RouteWithLayout
        component={Login}
        exact
        layout={MainLayout}
        path="/login"
      />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UsersList}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={LockList}
        exact
        layout={MainLayout}
        path="/locks"
      />
      <RouteWithLayout
        component={AccessLevelList}
        exact
        layout={MainLayout}
        path="/access-levels"
      />
      <RouteWithLayout
        component={NotFound}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Router;
