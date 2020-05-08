import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Group, Dashboard, Lock, Person, ExitToApp } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { authContext } from "@/services/auth";
import { uiContext } from "@/store";
import { scaleFontDown, scaleFontUp } from "@/actions/uiActions";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  icon: {
    color: "#222222"
  }
});

const Sidebar = props => {
  const classes = useStyles();
  const [, uiDispatch] = useContext(uiContext);
  const { open, toggleDrawer } = props;
  const listItems = [
    { text: "Dashboard", link: "/dashboard", icon: Dashboard },
    { text: "Users", link: "/users", icon: Person },
    { text: "Groups", link: "/groups", icon: Group },
    { text: "Smart locks", link: "/smart-locks", icon: Lock }
  ];

  const handleScaleFontUp = () => {
    uiDispatch(scaleFontUp);
  };

  const handleScaleFontDown = () => {
    uiDispatch(scaleFontDown);
  };
  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}>
      <List>
        {listItems.map(item => {
          const ItemIcon = item.icon;
          return (
            <ListItem
              button
              key={item.text}
              component={RouterLink}
              to={item.link}>
              <ListItemIcon>
                <ItemIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}

        <ListItem button onClick={handleScaleFontDown}>
          <ListItemIcon>
            <Typography
              variant="h5"
              className={classes.icon}
              style={{ marginLeft: 5 }}>
              A
            </Typography>
          </ListItemIcon>
          <ListItemText>Decrease font size</ListItemText>
        </ListItem>
        <ListItem button onClick={handleScaleFontUp}>
          <ListItemIcon>
            <Typography
              variant="h5"
              className={classes.icon}
              style={{ marginLeft: 5 }}>
              A+
            </Typography>
          </ListItemIcon>
          <ListItemText>Increase font size</ListItemText>
        </ListItem>
        <ListItem
          button
          className={classes.navElement}
          onClick={() => authContext.logOut()}>
          <ListItemIcon>
            <ExitToApp className={classes.icon} />
          </ListItemIcon>
          <ListItemText>Log out</ListItemText>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer()}>
        {sideList()}
      </Drawer>
    </div>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired
};

export default Sidebar;
