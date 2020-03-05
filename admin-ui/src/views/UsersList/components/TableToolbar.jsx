import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { Toolbar, Button, Typography, Tooltip } from "@material-ui/core";
import {
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@material-ui/icons";

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingcenter: theme.spacing(1),
    justifyContent: "flex-end"
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main
  },
  button: {
    marginLeft: theme.spacing(1)
  },
  title: {
    flex: "1 1 100%"
  }
}));

const TableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar className={classes.root}>
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : null}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <Button
            aria-label="delete"
            variant="contained"
            color="primary"
            className={classes.button}>
            <DeleteIcon />
          </Button>
        </Tooltip>
      ) : null}
      {numSelected === 1 ? (
        <Tooltip title="Edit">
          <Button
            aria-label="edit"
            variant="contained"
            color="primary"
            className={classes.button}>
            <EditIcon />
          </Button>
        </Tooltip>
      ) : null}
      <Tooltip title="Add">
        <Button
          aria-label="add"
          variant="contained"
          color="primary"
          className={classes.button}>
          <PersonAddIcon />
        </Button>
      </Tooltip>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

export default TableToolbar;
