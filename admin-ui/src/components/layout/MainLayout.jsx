import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Footer from "./Footer";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    backgroundColor: theme.palette.background.default
  },
  content: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default
  },
  footer: {
    position: "fixed",
    width: "100%",
    bottom: 0
  },
  phantom: {
    display: "block",
    height: "60px",
    width: "100%"
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>{children}</main>
      <div className={classes.phantom}>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Main;