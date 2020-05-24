import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={compProps => (
        <Layout>
          <Component {...compProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.func.isRequired,
  layout: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

export default RouteWithLayout;
