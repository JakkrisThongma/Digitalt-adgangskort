import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { AddBox, Delete, Edit } from "@material-ui/icons";
import { Breadcrumbs, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  azureAdContext,
  groupContext,
  smartLockContext,
  uiContext
} from "@/store";
import { getSmartLocks } from "@/actions/smartLockActions";
import EnhancedMaterialTable from "@/components/common/EnhancedMaterialTable";
import {
  openAddDialog,
  openDeleteDialog,
  openEditDialog
} from "@/actions/uiActions";
import useDidMountEffect from "@/extensions/useDidMountEffect";
import { useSnackbar } from "notistack";
import {
  AddGroupDialog,
  DeleteGroupDialog,
  EditGroupDialog
} from "@/components/group";
import {
  getGroup,
  getGroups,
  getGroupSmartLocks,
  setSelectedGroupId
} from "@/actions/groupActions";
import { getAzureAdGroups } from "@/actions/azureAdActions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  }
}));

const groupColumns = [
  { title: "Group Id", field: "id", sorting: false },
  {
    title: "Display Name",
    field: "displayName",
    defaultSort: "asc"
  },
  {
    title: "Status",
    field: "status"
  },
  {
    title: "Creation Date",
    field: "creationDate",
    type: "datetime"
  }
];

const Groups = () => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(groupContext);
  const {
    groups,
    didInvalidate,
    loading,
    selectedGroupId,
    error: groupError
  } = groupState;
  const [, smartLockDispatch] = useContext(smartLockContext);

  const [, azureAdDispatch] = useContext(azureAdContext);

  const [, uiDispatch] = useContext(uiContext);
  const [redirect, setRedirect] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddGroupClick = () => {
    uiDispatch(openAddDialog);
    azureAdDispatch(getAzureAdGroups);
    smartLockDispatch(getSmartLocks);
  };

  const handleViewGroupClick = groupId => {
    groupDispatch(dispatch => setSelectedGroupId(dispatch, groupId));
    setRedirect(true);
  };

  const handleEditGroupClick = groupId => {
    groupDispatch(dispatch => setSelectedGroupId(dispatch, groupId));
    groupDispatch(dispatch => getGroup(dispatch, groupId));
    groupDispatch(dispatch => getGroupSmartLocks(dispatch, groupId));
    smartLockDispatch(getSmartLocks);

    uiDispatch(openEditDialog);
  };

  const handleDeleteGroupClick = groupId => {
    groupDispatch(dispatch => setSelectedGroupId(dispatch, groupId));
    uiDispatch(openDeleteDialog);
  };

  useEffect(() => {
    groupDispatch(getGroups);
  }, []);

  useEffect(() => {
    if (didInvalidate) {
      groupDispatch(getGroups);
    }
  }, [didInvalidate]);

  useDidMountEffect(() => {
    if (groupError) {
      enqueueSnackbar(groupError.message, {
        variant: "error"
      });
    }
  }, [groupError]);

  return (
    <>
      {!redirect ? (
        <div className={classes.root}>
          <Breadcrumbs aria-label="breadcrumb">
            <Button component={RouterLink} to="/dashboard">
              Dashboard
            </Button>
            <Button component={RouterLink} to="/groups">
              Groups
            </Button>
          </Breadcrumbs>
          <div className={classes.paper}>
            <EnhancedMaterialTable
              isLoading={loading}
              columns={groupColumns}
              data={groups}
              actions={[
                {
                  icon: () => <AddBox fontSize="large" />,
                  tooltip: "Add",
                  onClick: () => handleAddGroupClick(),
                  isFreeAction: true
                },
                {
                  icon: Edit,
                  tooltip: "Edit",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleEditGroupClick(rowData.id);
                  }
                },
                {
                  icon: Delete,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleDeleteGroupClick(rowData.id);
                  }
                }
              ]}
              onRowClick={(event, rowData) => {
                handleViewGroupClick(rowData.id);
              }}
            />
            <AddGroupDialog />
            <EditGroupDialog />
            <DeleteGroupDialog />
          </div>
        </div>
      ) : (
        <Redirect push to={{ pathname: `/groups/${selectedGroupId}` }} />
      )}
    </>
  );
};

export default Groups;
