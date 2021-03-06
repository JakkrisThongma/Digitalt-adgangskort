import React, { useContext, useEffect } from "react";
import { Paper, Button, Tab, Tabs, Breadcrumbs } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AddBox, Delete } from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import {
  getGroup,
  getGroupSmartLocks,
  getGroupUsers,
  setSelectedGroupId
} from "@/actions/groupActions";
import {
  getSmartLocks,
  setSelectedSmartLockId
} from "@/actions/smartLockActions";
import { groupContext, smartLockContext, uiContext } from "@/store";
import { ViewMaterialTable, TabPanel } from "@/components/common";
import { useDidMountEffect, useRequestError } from "@/extensions";
import { openAddDialog, openDeleteDialog } from "@/actions/uiActions";
import {
  AddGroupSmartLockDialog,
  DeleteSmartLockDialog,
  GroupInfo
} from "@/components/group";

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

const Group = ({ match }) => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(groupContext);
  const {
    group,
    error: groupError,
    selectedGroupId,
    groupSmartLocks,
    groupUsers,
    loading: groupLoading
  } = groupState;

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { error: smartLockError, didInvalidate } = smartLockState;

  const [, uiDispatch] = useContext(uiContext);
  useRequestError(groupError);
  useRequestError(smartLockError);


  const [tabIndex, setTabIndex] = React.useState(0);

  useEffect(() => {
    const groupId = match.params.id;
    groupDispatch(dispatch => getGroup(dispatch, groupId));
    groupDispatch(dispatch => getGroupSmartLocks(dispatch, groupId));
    groupDispatch(dispatch => getGroupUsers(dispatch, groupId));
    groupDispatch(dispatch => setSelectedGroupId(dispatch, groupId));
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
      groupDispatch(dispatch => getGroupSmartLocks(dispatch, selectedGroupId));
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
          <Button component={RouterLink} to="/groups">
            Groups
          </Button>
        </Breadcrumbs>
        <Button component={RouterLink} to={`/groups/${match.params.id}`}>
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
            <Tab
              className={classes.tab}
              label="Smart Locks"
              {...a11yProps(2)}
            />
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <GroupInfo group={group} />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <ViewMaterialTable
              isLoading={groupLoading}
              columns={userColumns}
              data={groupUsers}
              actions={[
                {
                  icon: () => <Delete />,
                  tooltip:
                    "Delete user from a group should be done from Azure AD",
                  disabled: true,
                  onClick: () => null
                },
                {
                  icon: () => <AddBox />,
                  tooltip: "Add user to group should be done from Azure AD",
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
              isLoading={groupLoading}
              columns={smartLocksColumns}
              data={groupSmartLocks}
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
      <AddGroupSmartLockDialog />
    </div>
  );
};

export default Group;
