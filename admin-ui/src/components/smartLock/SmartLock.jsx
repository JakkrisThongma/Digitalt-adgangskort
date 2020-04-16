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
  Lock as LockIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  card: {
    color: theme.palette.secondary
  }
}));

const SmartLock = props => {
  const {
    title,
    status,
    description,
    manufactureId,
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
            <Typography variant="body2">Description: {description}</Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              Status: {status}
            </Typography>
            <Typography variant="body2">
              Manufacture id {manufactureId}
            </Typography>
            <Typography variant="body2">Created on {creationDate}</Typography>
            <Typography variant="body2">
              Last modified {lastModificationDate}
            </Typography>
          </Grid>
          <Grid item>
            <LockIcon />
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

SmartLock.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  status: PropTypes.string,
  manufactureId: PropTypes.string,
  creationDate: PropTypes.string,
  lastModificationDate: PropTypes.string
};

SmartLock.defaultProps = {
  description: "",
  status: "",
  manufactureId: "",
  creationDate: "",
  lastModificationDate: ""
};
export default SmartLock;
