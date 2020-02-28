import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Paper
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.background.paper
  },
  text: {
    padding: theme.spacing(2),
    color: theme.palette.secondary.main
  },
  avatar: {
    color: theme.primary,
    backgroundColor: theme.palette.secondary.main
  }
}));

function generate(element) {
  return [0, 1, 2, 4].map(value =>
    React.cloneElement(element, {
      key: value
    })
  );
}

const LastActivity = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.content}>
      <Typography variant="body1" className={classes.text}>
        Last activity
      </Typography>
      <List>
        {generate(
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>ON</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Ole Nordmann unlocked Lock 1"
              secondary="4 min ago"
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default LastActivity;
