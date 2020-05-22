import React, { useContext, useEffect } from "react";
import { Paper, Button, Tab, Tabs, Breadcrumbs } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AddBox, Delete } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import {
  getUser,
  getUserGroups,
  getUserSmartLocks,
  setSelectedUserId
} from "@/actions/userActions";
import {
  getSmartLocks,
  setSelectedSmartLockId
} from "@/actions/smartLockActions";
import { smartLockContext, uiContext, userContext } from "@/store";
import { ViewMaterialTable, TabPanel } from "@/components/common";
import { useDidMountEffect, useRequestError } from "@/extensions";
import { openAddDialog, openDeleteDialog } from "@/actions/uiActions";
import {
  AddUserSmartLockDialog,
  UserInfo,
  DeleteSmartLockDialog
} from "@/components/users";

const groupColumns = [
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
const smartLocksColumns = [
  { title: "Smart Lock ID", field: "id", editable: "never", sorting: false },
  {
    title: "Title",
    field: "title",
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

const User = ({ match }) => {
  const classes = useStyles();
  const [userState, userDispatch] = useContext(userContext);
  const {
    user,
    error: userError,
    selectedUserId,
    userSmartLocks,
    userGroups,
    loading: userLoading
  } = userState;

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { error: smartLockError, didInvalidate } = smartLockState;

  const [, uiDispatch] = useContext(uiContext);
  useRequestError(userError);
  useRequestError(smartLockError);

  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    const userId = match.params.id;
    userDispatch(dispatch => getUser(dispatch, userId));
    userDispatch(dispatch => getUserSmartLocks(dispatch, userId));
    userDispatch(dispatch => getUserGroups(dispatch, userId));
    userDispatch(dispatch => setSelectedUserId(dispatch, userId));
  }, [match.params.id]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleDeleteSmartLockClick = smartLockId => {
    smartLockDispatch(dispatch =>
      setSelectedSmartLockId(dispatch, smartLockId)
    );
    uiDispatch(openDeleteDialog);
  };

  const handleAddSmartLockClick = event => {
    event.stopPropagation();
    smartLockDispatch(getSmartLocks);
    uiDispatch(openAddDialog);
  };

  useDidMountEffect(() => {
    if (didInvalidate) {
      userDispatch(dispatch => getUserSmartLocks(dispatch, selectedUserId));
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
        <Button component={RouterLink} to="/users">
          Users
        </Button>
        <Button component={RouterLink} to={`/users/${match.params.id}`}>
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
            <Tab className={classes.tab} label="Groups" {...a11yProps(1)} />
            <Tab
              className={classes.tab}
              label="Smart Locks"
              {...a11yProps(2)}
            />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <UserInfo user={user} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <ViewMaterialTable
              isLoading={userLoading}
              columns={groupColumns}
              data={userGroups}
              actions={[
                {
                  icon: () => <Delete />,
                  tooltip:
                    "Delete group membership should be done from Azure AD",
                  disabled: true,
                  onClick: () => null
                },
                {
                  icon: () => <AddBox />,
                  tooltip: "Add group membership should be done from Azure AD",
                  isFreeAction: true,
                  disabled: true,
                  onClick: () => null
                }
              ]}
              style={{ boxShadow: "0" }}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <ViewMaterialTable
              isLoading={userLoading}
              columns={smartLocksColumns}
              data={userSmartLocks}
              actions={[
                {
                  icon: () => <Delete color="primary" />,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleDeleteSmartLockClick(rowData.id);
                  }
                },
                {
                  icon: () => <AddBox />,
                  tooltip: "Add",
                  isFreeAction: true,
                  onClick: event => handleAddSmartLockClick(event)
                }
              ]}
              style={{ boxShadow: "0" }}
            />
          </TabPanel>
        </div>
      </Paper>
      <DeleteSmartLockDialog />
      <AddUserSmartLockDialog />
    </div>
  );
};

export default User;
