import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Header";
import Footer from "../Footer";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.default
  },
  content: {
    padding: theme.spacing(7),
    backgroundColor: theme.palette.background.default
  }
}));

const MainLayout = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>{children}</main>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default MainLayout;
