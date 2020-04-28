import React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions as MuiDialogActions
} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import PropTypes from "prop-types";
import DialogActions from "../DialogActions";

const DeleteDialog = ({ title, actions, children, ...rest }) => {
  return (
    <MuiDialog
      {...rest}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title} </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <MuiDialogActions>
        <DialogActions actions={actions} />
      </MuiDialogActions>
    </MuiDialog>
  );
};

DeleteDialog.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      type: PropTypes.string,
      onClick: PropTypes.func
    }).isRequired
  ),
  rest: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

DeleteDialog.defaultProps = {
  title: "",
  actions: [],
  rest: {},
  children: {}
};

export default DeleteDialog;
