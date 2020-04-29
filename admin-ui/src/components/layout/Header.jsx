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
import { Link as RouterLink } from "react-router-dom";
import Sidebar from "./Sidebar";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
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
    <div className={classes.grow}>
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
          <Typography className={classes.title} variant="h6" noWrap>
            Digital Access Card
          </Typography>
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
    </div>
  );
};

export default Header;
