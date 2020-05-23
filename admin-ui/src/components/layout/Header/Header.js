import React, { useContext, useState } from "react";
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
import { uiContext } from "@/store";
import { scaleFontDown, scaleFontUp } from "@/actions/uiActions";
import { authContext } from "@/services/auth";
import Sidebar from "../Sidebar";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 0
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
    flexDirection: "row",
    flexGrow: 1
  },
  navElement: {
    margin: 15
  },
  fontButton: {
    margin: theme.typography.fontSize === 36 ? 15 : 2,
    paddingRight: 5,
    paddingLeft: 5,
    minWidth: 5
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
  const [, uiDispatch] = useContext(uiContext);

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

  const handleScaleFontUp = () => {
    uiDispatch(scaleFontUp);
  };

  const handleScaleFontDown = () => {
    uiDispatch(scaleFontDown);
  };

  return (
    <div className={classes.root}>
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
          <div className={classes.sectionDesktop}>
            <Button
              className={classes.fontButton}
              onClick={handleScaleFontDown}>
              A
            </Button>
            <Button className={classes.fontButton} onClick={handleScaleFontUp}>
              A+
            </Button>
            <Button
              className={classes.navElement}
              onClick={() => authContext.logOut()}>
              Log out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
