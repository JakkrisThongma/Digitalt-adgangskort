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

const Lock = props => {
  const { title, active, date } = props;

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
              Status: {active ? "Active" : "Not active"}
            </Typography>
            <Typography variant="body2">{date}</Typography>
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

Lock.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  date: PropTypes.string.isRequired
};

Lock.defaultProps = {
  active: false
};
export default Lock;
