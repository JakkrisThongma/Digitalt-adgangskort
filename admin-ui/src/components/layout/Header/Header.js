import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import clsx from "clsx";
import { Link as RouterLink } from "react-router-dom";
import Sidebar from "../Sidebar";

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.background.paper
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main
  },
  navContainer: {
    display: "flex",
    flexDirection: "row"
  },
  navElement: {
    margin: 15
  },
  title: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.primary
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(value => !value);
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Sidebar open={open} toggleDrawer={toggleDrawer} />

        <IconButton
          edge="start"
          className={clsx(classes.sectionMobile, classes.menuButton)}
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer()}>
          <MenuIcon />
        </IconButton>
        <div className={clsx(classes.navContainer, classes.sectionDesktop)}>
          <Button
            className={classes.navElement}
            component={RouterLink}
            to="/dashboard">
            Digital Access Card
          </Button>
        </div>
        <div className={clsx(classes.navContainer, classes.sectionDesktop)}>
          <Button
            className={classes.navElement}
            component={RouterLink}
            to="/dashboard">
            Dashboard
          </Button>
          <Button
            className={classes.navElement}
            component={RouterLink}
            to="/users">
            Users
          </Button>
          <Button
            className={classes.navElement}
            component={RouterLink}
            to="/groups">
            Groups
          </Button>
          <Button
            className={classes.navElement}
            component={RouterLink}
            to="/smart-locks">
            Smart locks
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
