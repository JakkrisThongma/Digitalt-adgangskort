// https://material-ui.com/components/dialogs/#AlertDialogSlide.js

import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import { useDidMountEffect } from "@/extensions";
import { smartLockContext, uiContext, userContext } from "@/store";
import { deleteSmartLockUser } from "@/actions/smartLockActions";
import { closeDeleteDialog } from "@/actions/uiActions";
import { DeleteDialog, SlideTransition } from "@/components/common";

const DeleteSmartLockUserDialog = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { selectedSmartLockId, deleteFailed, deleteSucceed } = smartLockState;

  const [uiState, uiDispatch] = useContext(uiContext);
  const { deleteDialogOpen } = uiState;

  const [userState] = useContext(userContext);
  const { selectedUserId } = userState;

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
    smartLockDispatch(dispatch =>
      deleteSmartLockUser(dispatch, selectedSmartLockId, selectedUserId)
    );
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
      Are you sure you want to delete this user from smart lock?
    </DeleteDialog>
  );
};

export default DeleteSmartLockUserDialog;
