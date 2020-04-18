import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  AccountTree as AccessGroupIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  card: {
    color: theme.palette.secondary
  }
}));

const Group = props => {
  const {
    title,
    description,
    status,
    creationDate,
    lastModificationDate
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h4">
              {title}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              Description: {description}
            </Typography>
            <Typography variant="body2">status: {status}</Typography>
            <Typography variant="body2">Created on: {creationDate}</Typography>
            <Typography variant="body2">
              Last modified: {lastModificationDate}
            </Typography>
          </Grid>
          <Grid item>
            <AccessGroupIcon />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Tooltip title="Edit">
          <IconButton aria-label="edit" color="primary">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton aria-label="delete" color="primary">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

Group.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  status: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  lastModificationDate: PropTypes.string
};
Group.defaultProps = {
  description: "",
  lastModificationDate: ""
};

export default Group;
