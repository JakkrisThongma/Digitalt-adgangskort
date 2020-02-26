import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import clsx from "clsx";
import Sidebar from "./Sidebar";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  navContainer: {
    display: "flex",
    flexDirection: "row"
  },
  navElement: {
    margin: 15
  },
  title: {
    marginRight: theme.spacing(2)
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
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Sidebar open={open} toggleDrawer={toggleDrawer} />

          <IconButton
            edge="start"
            className={classes.sectionMobile}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer()}>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Digital adgangskort
          </Typography>
          <div className={clsx(classes.navContainer, classes.sectionDesktop)}>
            <Button className={classes.navElement} href="/home">
              Home
            </Button>
            <Button className={classes.navElement} href="/users">
              Users
            </Button>
            <Button className={classes.navElement} href="/locks">
              Locks
            </Button>
            <Button className={classes.navElement} href="/access-levels">
              Access levels
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
