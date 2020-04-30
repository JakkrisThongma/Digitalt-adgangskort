import React, { useContext, useEffect } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Button, Tab, Tabs } from "@material-ui/core";
import { Delete, AddBox } from "@material-ui/icons";

import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import {
  getSmartLock,
  getSmartLockUsers,
  setSelectedSmartLockId,
  getSmartLockGroups
} from "@/actions/smartLockActions";

import {
  groupContext,
  smartLockContext,
  uiContext,
  userContext
} from "@/store";
import ViewMaterialTable from "@/components/ViewMaterialTable";
import TabPanel from "@/components/TabPanel";
import useDidMountEffect from "@/extensions/useDidMountEffect";
import { openAddDialog, openDeleteDialog } from "@/actions/uiActions";

import SmartLockInfo from "@/components/smartLock/SmartLockInfo/SmartLockInfo";
import { getGroups, setSelectedGroupId } from "@/actions/groupActions";
import DeleteSmartLockGroupDialog from "@/components/smartLock/DeleteSmartLockGroupDialog";
import DeleteSmartLockUserDialog from "@/components/smartLock/DeleteSmartLockUserDialog";
import { getUsers, setSelectedUserId } from "@/actions/userActions";
import {
  AddSmartLockGroupDialog,
  AddSmartLockUserDialog
} from "@/components/smartLock";

const userColumns = [
  { title: "User Id", field: "id", editable: "never", sorting: false },
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
  { title: "Group Id", field: "id", editable: "never", sorting: false },
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
    width: "100%",
    padding: theme.spacing(3)
  },
  tabPanel: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
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
  const [userState, userDispatch] = useContext(userContext);

  const [uiState, uiDispatch] = useContext(uiContext);

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
          <Button component={RouterLink} to="/dashboard">
            Dashboard
          </Button>
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
            <Tab label="Info" {...a11yProps(0)} />
            <Tab label="Users" {...a11yProps(1)} />
            <Tab label="Groups" {...a11yProps(2)} />
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
                  icon: Delete,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleDeleteUserClick(rowData.id);
                  }
                },
                {
                  icon: () => <AddBox fontSize="large" />,
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
                  icon: Delete,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleDeleteGroupClick(rowData.id);
                  }
                },
                {
                  icon: () => <AddBox fontSize="large" />,
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
