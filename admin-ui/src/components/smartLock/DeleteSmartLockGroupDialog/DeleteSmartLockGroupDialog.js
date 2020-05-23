// https://material-ui.com/components/dialogs/#AlertDialogSlide.js

import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import { useDidMountEffect } from "@/extensions";
import { groupContext, smartLockContext, uiContext } from "@/store";
import { deleteSmartLockGroup } from "@/actions/smartLockActions";
import { closeDeleteDialog } from "@/actions/uiActions";
import { DeleteDialog, SlideTransition } from "@/components/common";

const DeleteSmartLockGroupDialog = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { selectedSmartLockId, deleteFailed, deleteSucceed } = smartLockState;

  const [uiState, uiDispatch] = useContext(uiContext);
  const { deleteDialogOpen } = uiState;

  const [groupState] = useContext(groupContext);
  const { selectedGroupId } = groupState;

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
    uiDispatch(closeDeleteDialog);
  };

  const handleDeleteClick = () => {
    smartLockDispatch(dispatch =>
      deleteSmartLockGroup(dispatch, selectedSmartLockId, selectedGroupId)
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
      title="Delete group"
      open={deleteDialogOpen}
      TransitionComponent={SlideTransition}
      keepMounted
      onClose={handleCancelClick}
      actions={actions}>
      Are you sure you want to delete this group from smart lock?
    </DeleteDialog>
  );
};

export default DeleteSmartLockGroupDialog;
