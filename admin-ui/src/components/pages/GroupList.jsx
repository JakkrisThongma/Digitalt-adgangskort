import React, { useEffect, useContext } from "react";
import { AddBox, Edit, Delete } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
  getGroup,
  getGroups,
  getGroupSmartLocks,
  getGroupUsers,
  openAddGroupDialog,
  openDeleteGroupDialog,
  openEditGroupDialog,
  openViewGroupDialog,
  setSelectedGroupId
} from "../../actions/groupActions";
import {
  AddGroupDialog,
  EditGroupDialog,
  ViewGroupDialog,
  DeleteGroupDialog
} from "../group";
import { groupContext, smartLockContext } from "../../store";
import { getSmartLocks } from "../../actions/smartLockActions";
import EnhancedMaterialTable from "../common/EnhancedMaterialTable";

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

const columns = [
  { title: "Group Id", field: "id", editable: "never", sorting: false },
  {
    title: "Display Name",
    field: "displayName",
    editable: "never",
    defaultSort: "asc"
  },
  {
    title: "Status",
    field: "status"
  },
  {
    title: "Creation Date",
    field: "creationDate",
    editable: "never",
    type: "datetime"
  }
];

const GroupList = () => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(groupContext);
  const { groups, didInvalidate, loading } = groupState;
  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);

  const handleAddGroupClick = () => {
    groupDispatch(openAddGroupDialog);
    smartLockDispatch(getSmartLocks);
  };

  const handleViewGroupClick = groupId => {
    groupDispatch(dispatch => setSelectedGroupId(dispatch, groupId));
    groupDispatch(dispatch => getGroup(dispatch, groupId));
    groupDispatch(dispatch => getGroupSmartLocks(dispatch, groupId));
    groupDispatch(dispatch => getGroupUsers(dispatch, groupId));
    groupDispatch(openViewGroupDialog);
  };

  const handleEditGroupClick = groupId => {
    groupDispatch(dispatch => setSelectedGroupId(dispatch, groupId));
    groupDispatch(dispatch => getGroup(dispatch, groupId));
    groupDispatch(dispatch => getGroupSmartLocks(dispatch, groupId));
    smartLockDispatch(getSmartLocks);

    groupDispatch(openEditGroupDialog);
  };

  const handleDeleteGroupClick = groupId => {
    groupDispatch(dispatch => setSelectedGroupId(dispatch, groupId));
    groupDispatch(openDeleteGroupDialog);
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
    <div className={classes.root}>
      <h1>Groups</h1>
      <Paper className={classes.paper}>
        <EnhancedMaterialTable
          isLoading={loading}
          columns={columns}
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
        <ViewGroupDialog />
      </Paper>
    </div>
  );
};

export default GroupList;
