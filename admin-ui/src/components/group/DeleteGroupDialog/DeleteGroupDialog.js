// https://material-ui.com/components/dialogs/#AlertDialogSlide.js

import React, { useContext } from "react";
import { useSnackbar } from "notistack";
import { deleteGroup } from "@/actions/groupActions";
import { groupContext, uiContext } from "@/store/Store";
import useDidMountEffect from "@/extensions/useDidMountEffect";
import { closeDeleteDialog } from "@/actions/uiActions";
import DeleteDialog from "@/components/common/DeleteDialog";
import SlideTransition from "@/components/common/SlideTransition";

const DeleteGroupDialog = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [groupState, groupDispatch] = useContext(groupContext);
  const { selectedGroupId, deleteFailed, deleteSucceed } = groupState;

  const [uiState, uiDispatch] = useContext(uiContext);
  const { deleteDialogOpen } = uiState;

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
    groupDispatch(dispatch => deleteGroup(dispatch, selectedGroupId));

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
      Are you sure you want to delete this group?
    </DeleteDialog>
  );
};

export default DeleteGroupDialog;
