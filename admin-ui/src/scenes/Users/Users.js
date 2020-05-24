import React, { useContext, useEffect, useState } from "react";
import { AddBox, Delete, Edit } from "@material-ui/icons";
import { Paper, Button, Breadcrumbs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, Redirect } from "react-router-dom";
import {
  azureAdContext,
  smartLockContext,
  uiContext,
  userContext
} from "@/store";
import { getSmartLocks } from "@/actions/smartLockActions";
import { EnhancedMaterialTable } from "@/components/common";
import {
  openAddDialog,
  openDeleteDialog,
  openEditDialog
} from "@/actions/uiActions";
import {
  AddUserDialog,
  DeleteUserDialog,
  EditUserDialog
} from "@/components/users";
import {
  getUser,
  getUsers,
  getUserSmartLocks,
  setSelectedUserId
} from "@/actions/userActions";
import { getAzureAdUsers } from "@/actions/azureAdActions";
import { useRequestError } from "@/extensions";

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

const userColumns = [
  { title: "User ID", field: "id", sorting: false },
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

const Users = () => {
  const classes = useStyles();
  const [userState, userDispatch] = useContext(userContext);
  const {
    users,
    didInvalidate,
    loading,
    selectedUserId,
    error: userError
  } = userState;
  const [, smartLockDispatch] = useContext(smartLockContext);
  const [, azureAdDispatch] = useContext(azureAdContext);

  const [, uiDispatch] = useContext(uiContext);
  const [redirect, setRedirect] = useState(false);
  useRequestError(userError);

  const handleAddUserClick = () => {
    uiDispatch(openAddDialog);
    azureAdDispatch(getAzureAdUsers);
    smartLockDispatch(getSmartLocks);
  };

  const handleViewUserClick = userId => {
    userDispatch(dispatch => setSelectedUserId(dispatch, userId));
    setRedirect(true);
  };

  const handleEditUserClick = userId => {
    userDispatch(dispatch => setSelectedUserId(dispatch, userId));
    userDispatch(dispatch => getUser(dispatch, userId));
    userDispatch(dispatch => getUserSmartLocks(dispatch, userId));
    smartLockDispatch(getSmartLocks);

    uiDispatch(openEditDialog);
  };

  const handleDeleteUserClick = userId => {
    userDispatch(dispatch => setSelectedUserId(dispatch, userId));
    uiDispatch(openDeleteDialog);
  };

  useEffect(() => {
    userDispatch(getUsers);
  }, []);

  useEffect(() => {
    if (didInvalidate) {
      userDispatch(getUsers);
    }
  }, [didInvalidate]);

  return (
    <>
      {!redirect ? (
        <div className={classes.root}>
          <Breadcrumbs aria-label="breadcrumb">
            <Button component={RouterLink} to="/users">
              Users
            </Button>
          </Breadcrumbs>
          <Paper className={classes.paper}>
            <EnhancedMaterialTable
              isLoading={loading}
              columns={userColumns}
              data={users}
              actions={[
                {
                  icon: () => <AddBox />,
                  tooltip: "Add",
                  onClick: () => handleAddUserClick(),
                  isFreeAction: true
                },
                {
                  icon: () => <Edit color="primary" />,
                  tooltip: "Edit",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleEditUserClick(rowData.id);
                  }
                },
                {
                  icon: () => <Delete color="primary" />,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleDeleteUserClick(rowData.id);
                  }
                }
              ]}
              onRowClick={(event, rowData) => {
                handleViewUserClick(rowData.id);
              }}
            />
            <AddUserDialog />
            <EditUserDialog />
            <DeleteUserDialog />
          </Paper>
        </div>
      ) : (
        <Redirect push to={{ pathname: `/users/${selectedUserId}` }} />
      )}
    </>
  );
};

export default Users;
