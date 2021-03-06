import React, { useContext, useEffect } from "react";
import { Paper, Button, Tab, Tabs, Breadcrumbs } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AddBox, Delete } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import {
  getSmartLock,
  getSmartLockGroups,
  getSmartLockUsers,
  setSelectedSmartLockId
} from "@/actions/smartLockActions";

import {
  groupContext,
  smartLockContext,
  uiContext,
  userContext
} from "@/store";
import { ViewMaterialTable, TabPanel } from "@/components/common";
import { useDidMountEffect, useRequestError } from "@/extensions";
import { openAddDialog, openDeleteDialog } from "@/actions/uiActions";
import { getGroups, setSelectedGroupId } from "@/actions/groupActions";
import { getUsers, setSelectedUserId } from "@/actions/userActions";
import {
  AddSmartLockGroupDialog,
  AddSmartLockUserDialog,
  DeleteSmartLockGroupDialog,
  DeleteSmartLockUserDialog,
  SmartLockInfo
} from "@/components/smartLock";

const userColumns = [
  { title: "User ID", field: "id", editable: "never", sorting: false },
  {
    title: "Name",
    field: "displayName",
    defaultSort: "asc"
  },
  {
    title: "Creation Date",
    field: "creationDate",
    type: "datetime"
  }
];
const groupsColumns = [
  { title: "Group ID", field: "id", editable: "never", sorting: false },
  {
    title: "Display Name",
    field: "displayName",
    defaultSort: "asc"
  },
  {
    title: "Creation Date",
    field: "creationDate",
    type: "datetime"
  }
];
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  tabPanel: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    borderRadius: 5
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tab: {
    marginRight: theme.spacing(3)
  },
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "black",
    backgroundColor: fade("#ffffff", 0.4)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  button: { marginBottom: theme.spacing(2), minWidth: 80 },
  option: { backgroundColor: "black" }
}));

const SmartLock = ({ match }) => {
  const classes = useStyles();
  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const {
    smartLock,
    selectedSmartLockId,
    smartLockGroups,
    smartLockUsers,
    loading: smartLockLoading,
    didInvalidate
  } = smartLockState;

  const [groupState, groupDispatch] = useContext(groupContext);
  const { error: groupError } = groupState;
  const [userState, userDispatch] = useContext(userContext);
  const { error: userError } = userState;

  const [, uiDispatch] = useContext(uiContext);
  useRequestError(userError);
  useRequestError(groupError);


  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    const smartLockId = match.params.id;
    smartLockDispatch(dispatch => getSmartLock(dispatch, smartLockId));
    smartLockDispatch(dispatch => getSmartLockGroups(dispatch, smartLockId));
    smartLockDispatch(dispatch => getSmartLockUsers(dispatch, smartLockId));
    smartLockDispatch(dispatch =>
      setSelectedSmartLockId(dispatch, smartLockId)
    );
  }, [match.params.id]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleDeleteGroupClick = groupId => {
    groupDispatch(dispatch => setSelectedGroupId(dispatch, groupId));
    uiDispatch(openDeleteDialog);
  };

  const handleDeleteUserClick = userId => {
    userDispatch(dispatch => setSelectedUserId(dispatch, userId));
    uiDispatch(openDeleteDialog);
  };

  const handleAddGroupClick = event => {
    event.stopPropagation();
    groupDispatch(getGroups);
    uiDispatch(openAddDialog);
  };

  const handleAddUserClick = event => {
    event.stopPropagation();
    userDispatch(getUsers);
    uiDispatch(openAddDialog);
  };

  useDidMountEffect(() => {
    if (didInvalidate) {
      smartLockDispatch(dispatch =>
        getSmartLockGroups(dispatch, selectedSmartLockId)
      );

      smartLockDispatch(dispatch =>
        getSmartLockUsers(dispatch, selectedSmartLockId)
      );
    }
  }, [didInvalidate]);

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`
    };
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Breadcrumbs aria-label="breadcrumb">
          <Button component={RouterLink} to="/smart-locks">
            Smart Locks
          </Button>
        </Breadcrumbs>
        <Button component={RouterLink} to={`/smart-locks/${match.params.id}`}>
          {match.params.id}
        </Button>
      </Breadcrumbs>
      <Paper className={classes.paper}>
        <div className={classes.tabPanel}>
          <Tabs
            orientation="vertical"
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}>
            <Tab className={classes.tab} label="Info" {...a11yProps(0)} />
            <Tab className={classes.tab} label="Users" {...a11yProps(1)} />
            <Tab className={classes.tab} label="Groups" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <SmartLockInfo smartLock={smartLock} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <ViewMaterialTable
              isLoading={smartLockLoading}
              columns={userColumns}
              data={smartLockUsers}
              actions={[
                {
                  icon: () => <Delete color="primary" />,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleDeleteUserClick(rowData.id);
                  }
                },
                {
                  icon: () => <AddBox />,
                  tooltip: "Add",
                  isFreeAction: true,
                  onClick: event => handleAddUserClick(event)
                }
              ]}
              style={{ boxShadow: "0" }}
            />
            <DeleteSmartLockUserDialog />
            <AddSmartLockUserDialog />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <ViewMaterialTable
              isLoading={smartLockLoading}
              columns={groupsColumns}
              data={smartLockGroups}
              actions={[
                {
                  icon: () => <Delete color="primary" />,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleDeleteGroupClick(rowData.id);
                  }
                },
                {
                  icon: () => <AddBox />,
                  tooltip: "Add",
                  isFreeAction: true,
                  onClick: event => handleAddGroupClick(event)
                }
              ]}
              style={{ boxShadow: "0" }}
            />

            <AddSmartLockGroupDialog />
            <DeleteSmartLockGroupDialog />
          </TabPanel>
        </div>
      </Paper>
    </div>
  );
};

export default SmartLock;
