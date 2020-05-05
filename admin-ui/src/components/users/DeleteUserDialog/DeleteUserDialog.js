// https://material-ui.com/components/dialogs/#AlertDialogSlide.js

import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import { deleteUser } from "@/actions/userActions";
import { uiContext, userContext } from "@/store/Store";
import useDidMountEffect from "@/extensions/useDidMountEffect";
import { closeDeleteDialog } from "@/actions/uiActions";
import DeleteDialog from "@/components/common/DeleteDialog";
import SlideTransition from "@/components/common/SlideTransition";

const DeleteUserDialog = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [userState, userDispatch] = useContext(userContext);
  const { selectedUserId, deleteFailed, deleteSucceed } = userState;

  const [uiState, uiDispatch] = useContext(uiContext);
  const { deleteDialogOpen } = uiState;

  useDidMountEffect(() => {
    if (deleteFailed) {
      enqueueSnackbar("Delete user failed", {
        variant: "error"
      });
    }
  }, [deleteFailed]);

  useDidMountEffect(() => {
    if (deleteSucceed) {
      enqueueSnackbar("User deleted successfully", {
        variant: "success"
      });
    }
  }, [deleteSucceed]);

  const handleCancelClick = () => {
    uiDispatch(closeDeleteDialog);
  };

  const handleDeleteClick = () => {
    userDispatch(dispatch => deleteUser(dispatch, selectedUserId));

    uiDispatch(closeDeleteDialog);
  };

  const actions = [
    {
      title: "Cancel",
      type: "button",
      onClick: handleCancelClick
    },
    {
      title: "Delete",
      type: "button",
      onClick: handleDeleteClick
    }
  ];

  return (
    <DeleteDialog
      title="Delete user"
      open={deleteDialogOpen}
      TransitionComponent={SlideTransition}
      keepMounted
      onClose={handleCancelClick}
      actions={actions}>
      Are you sure you want to delete this user?
    </DeleteDialog>
  );
};

export default DeleteUserDialog;
