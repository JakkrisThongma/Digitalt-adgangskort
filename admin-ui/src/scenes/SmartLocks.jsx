import React, { useEffect, useContext, useState } from "react";
import { Link as RouterLink, Redirect } from "react-router-dom";
import { AddBox, Edit, Delete } from "@material-ui/icons";
import { Breadcrumbs, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  smartLockContext,
  groupContext,
  uiContext,
  userContext
} from "@/store";
import EnhancedMaterialTable from "@/components/EnhancedMaterialTable";
import {
  openAddDialog,
  openDeleteDialog,
  openEditDialog
} from "@/actions/uiActions";
import useDidMountEffect from "@/extensions/useDidMountEffect";
import { useSnackbar } from "notistack";

import {
  getSmartLock,
  getSmartLocks,
  getSmartLockGroups,
  getSmartLockUsers,
  setSelectedSmartLockId,
} from "@/actions/smartLockActions";
import { getGroups } from "@/actions/groupActions";
import {
  DeleteSmartLockDialog,
  EditSmartLockDialog,
  AddSmartLockDialog
} from "@/components/smartLock";
import { getUsers } from "@/actions/userActions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3)
  }
}));

const smartLockColumns = [
  { title: "SmartLock Id", field: "id", sorting: false },
  {
    title: "Title",
    field: "title",
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

const SmartLocks = () => {
  const classes = useStyles();
  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const {
    smartLocks,
    didInvalidate,
    loading,
    selectedSmartLockId,
    error: smartLockError
  } = smartLockState;
  const [userState, userDispatch] = useContext(userContext);
  const [groupState, groupDispatch] = useContext(groupContext);

  const [uiState, uiDispatch] = useContext(uiContext);
  const [redirect, setRedirect] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddSmartLockClick = () => {
    uiDispatch(openAddDialog);
    userDispatch(getUsers);
    groupDispatch(getGroups);
  };

  const handleViewSmartLockClick = smartLockId => {
    smartLockDispatch(dispatch =>
      setSelectedSmartLockId(dispatch, smartLockId)
    );
    setRedirect(true);
  };

  const handleEditSmartLockClick = smartLockId => {
    smartLockDispatch(dispatch =>
      setSelectedSmartLockId(dispatch, smartLockId)
    );
    smartLockDispatch(dispatch => getSmartLock(dispatch, smartLockId));
    smartLockDispatch(dispatch => getSmartLockUsers(dispatch, smartLockId));
    smartLockDispatch(dispatch => getSmartLockGroups(dispatch, smartLockId));
    userDispatch(getUsers);
    groupDispatch(getGroups);
    uiDispatch(openEditDialog);
  };

  const handleDeleteSmartLockClick = smartLockId => {
    smartLockDispatch(dispatch =>
      setSelectedSmartLockId(dispatch, smartLockId)
    );
    uiDispatch(openDeleteDialog);
  };

  useEffect(() => {
    smartLockDispatch(getSmartLocks);
  }, []);

  useEffect(() => {
    if (didInvalidate) {
      smartLockDispatch(getSmartLocks);
    }
  }, [didInvalidate]);

  useDidMountEffect(() => {
    if (smartLockError) {
      enqueueSnackbar(smartLockError.message, {
        variant: "error"
      });
    }
  }, [smartLockError]);

  return (
    <>
      {!redirect ? (
        <div className={classes.root}>
          <Breadcrumbs aria-label="breadcrumb">
            <Button component={RouterLink} to="/dashboard">
              Dashboard
            </Button>
            <Button component={RouterLink} to="/smart-locks">
              Smart Locks
            </Button>
          </Breadcrumbs>
          <div className={classes.paper}>
            <EnhancedMaterialTable
              isLoading={loading}
              columns={smartLockColumns}
              data={smartLocks}
              actions={[
                {
                  icon: () => <AddBox fontSize="large" />,
                  tooltip: "Add",
                  onClick: () => handleAddSmartLockClick(),
                  isFreeAction: true
                },
                {
                  icon: Edit,
                  tooltip: "Edit",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleEditSmartLockClick(rowData.id);
                  }
                },
                {
                  icon: Delete,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleDeleteSmartLockClick(rowData.id);
                  }
                }
              ]}
              onRowClick={(event, rowData) => {
                handleViewSmartLockClick(rowData.id);
              }}
            />

            <AddSmartLockDialog />
            <EditSmartLockDialog />
            <DeleteSmartLockDialog />
          </div>
        </div>
      ) : (
        <Redirect
          push
          to={{ pathname: `/smart-locks/${selectedSmartLockId}` }}
        />
      )}
    </>
  );
};

export default SmartLocks;
