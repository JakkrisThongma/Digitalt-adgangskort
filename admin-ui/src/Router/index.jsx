import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { RouteWithLayout, MainLayout } from "@/components/layout";

import {
  Login,
  Dashboard,
  UsersList,
  SmartLockList,
  GroupList,
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
        component={SmartLockList}
        exact
        layout={MainLayout}
        path="/smart-locks"
      />
      <RouteWithLayout
        component={GroupList}
        exact
        layout={MainLayout}
        path="/groups"
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
