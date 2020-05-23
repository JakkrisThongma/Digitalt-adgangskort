import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { MainLayout, RouteWithLayout } from "@/components/layout";
import {
  Dashboard,
  Group,
  Groups,
  NotFound,
  NotAuthorized,
  SmartLock,
  SmartLocks,
  User,
  Users
} from "@/scenes";

const Router = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={Users}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={User}
        exact
        layout={MainLayout}
        path="/users/:id"
      />
      <RouteWithLayout
        component={SmartLocks}
        exact
        layout={MainLayout}
        path="/smart-locks"
      />
      <RouteWithLayout
        component={SmartLock}
        exact
        layout={MainLayout}
        path="/smart-locks/:id"
      />
      <RouteWithLayout
        component={Groups}
        exact
        layout={MainLayout}
        path="/groups"
      />
      <RouteWithLayout
        component={Group}
        exact
        layout={MainLayout}
        path="/groups/:id"
      />
      <RouteWithLayout
        component={NotFound}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={NotAuthorized}
        exact
        layout={MainLayout}
        path="/not-authorized"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Router;
