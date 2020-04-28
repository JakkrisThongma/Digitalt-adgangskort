import React, { useEffect, useContext, useState } from "react";
import { AddBox, Edit, Delete } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import {
  getGroup,
  getGroups,
  getGroupSmartLocks,
  openDeleteGroupDialog,
  openEditGroupDialog,
  setSelectedGroupId
} from "../../actions/groupActions";
import {
  AddGroupDialog,
  EditGroupDialog,
  DeleteGroupDialog
} from "../group";
import {groupContext, smartLockContext, uiContext} from "../../store";
import { getSmartLocks } from "../../actions/smartLockActions";
import EnhancedMaterialTable from "../common/EnhancedMaterialTable";
import {openAddDialog, openDeleteDialog, openEditDialog} from "../../actions/uiActions";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
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

const GroupList = () => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(groupContext);
  const { groups, didInvalidate, loading, selectedGroupId } = groupState;
  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);

  const [uiState, uiDispatch] = useContext(uiContext);
  const [redirect, setRedirect] = useState(false);

  const handleAddGroupClick = () => {
    uiDispatch(openAddDialog);
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

  return (
    <>
      {!redirect ? (
        <div className={classes.root}>
          <h1>Groups</h1>
          <Paper className={classes.paper}>
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
          </Paper>
        </div>
      ) : (
        <Redirect push to={{ pathname: `/groups/${selectedGroupId}` }} />
      )}
    </>
  );
};

export default GroupList;
