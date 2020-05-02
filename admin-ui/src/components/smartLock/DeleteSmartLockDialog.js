// https://material-ui.com/components/dialogs/#AlertDialogSlide.js

import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import { deleteSmartLock } from "@/actions/smartLockActions";
import { smartLockContext, uiContext } from "@/store";
import useDidMountEffect from "@/extensions/useDidMountEffect";
import { closeDeleteDialog } from "@/actions/uiActions";
import DeleteDialog from "@/components/DeleteDialog";
import SlideTransition from "@/components/SlideTransition";

const DeleteSmartLockDialog = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { selectedSmartLockId, deleteFailed, deleteSucceed } = smartLockState;

  const [uiState, uiDispatch] = useContext(uiContext);
  const { deleteDialogOpen } = uiState;

  useDidMountEffect(() => {
    if (deleteFailed) {
      enqueueSnackbar("Delete smart lock failed", {
        variant: "error"
      });
    }
  }, [deleteFailed]);

  useDidMountEffect(() => {
    if (deleteSucceed) {
      enqueueSnackbar("Smart lock deleted successfully", {
        variant: "success"
      });
    }
  }, [deleteSucceed]);

  const handleCancelClick = () => {
    uiDispatch(closeDeleteDialog);
  };

  const handleDeleteClick = () => {
    smartLockDispatch(dispatch =>
      deleteSmartLock(dispatch, selectedSmartLockId)
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
      title="Delete smartLock"
      open={deleteDialogOpen}
      TransitionComponent={SlideTransition}
      keepMounted
      onClose={handleCancelClick}
      actions={actions}>
      Are you sure you want to delete this smart lock?
    </DeleteDialog>
  );
};

export default DeleteSmartLockDialog;
