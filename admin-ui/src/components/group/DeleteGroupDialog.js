// https://material-ui.com/components/dialogs/#AlertDialogSlide.js

import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { useSnackbar } from "notistack";

import {
  closeDeleteGroupDialog,
  deleteGroup
} from "../../actions/groupActions";
import { groupContext } from "../../store/Store";
import useDidMountEffect from "../../helpers/useDidMountEffect";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteGroupDialog = props => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [groupState, groupDispatch] = useContext(groupContext);
  const {
    didInvalidate,
    loading,
    deleteDialogOpen,
    selectedGroupId,
    error: groupError,
    deleteFailed,
    deleteSucceed
  } = groupState;

  useDidMountEffect(() => {
    if (deleteFailed) {
      enqueueSnackbar("Delete group failed", {
        variant: "error"
      });
    }
  }, [deleteFailed]);

  useDidMountEffect(() => {
    if (deleteSucceed) {
      enqueueSnackbar("Group deleted successfully", {
        variant: "success"
      });
    }
  }, [deleteSucceed]);

  const handleCancelClick = () => {
    groupDispatch(closeDeleteGroupDialog);
  };

  const handleDeleteClick = () => {
    groupDispatch(dispatch => deleteGroup(dispatch, selectedGroupId));

    groupDispatch(closeDeleteGroupDialog);
  };

  return (
    <div>
      <Dialog
        open={deleteDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancelClick}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">Delete group </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this group?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteGroupDialog;
