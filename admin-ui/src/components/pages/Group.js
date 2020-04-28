import React, { useContext, useEffect } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Tab, Tabs, Typography } from "@material-ui/core";
import { Delete, AddBox } from "@material-ui/icons";

import Paper from "@material-ui/core/Paper";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import {
  getGroupSmartLocks,
  getGroup,
  getGroupUsers,
  setSelectedGroupId
} from "src/actions/groupActions";
import {
  getSmartLocks,
  setSelectedSmartLockId
} from "src/actions/smartLockActions";
import { groupContext, smartLockContext, uiContext } from "../../store/Store";
import ViewMaterialTable from "../common/ViewMaterialTable";
import TabPanel from "../common/TabPanel";
import useDidMountEffect from "../../helpers/useDidMountEffect";
import { openAddDialog, openDeleteDialog } from "../../actions/uiActions";

import GroupInfo from "../group/GroupInfo/GroupInfo";
import DeleteSmartLockDialog from "../group/DeleteSmartLockDialog";
import AddGroupSmartLockDialog from "../group/AddGroupSmartLockDialog";

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
const smartLocksColumns = [
  { title: "Smart Lock Id", field: "id", editable: "never", sorting: false },
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

const Group = ({ match }) => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(groupContext);
  const {
    group,
    groupError,
    selectedGroupId,
    groupSmartLocks,
    groupUsers,
    loading: groupLoading
  } = groupState;

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { smartLocks, smartLockError, didInvalidate } = smartLockState;

  const [uiState, uiDispatch] = useContext(uiContext);

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
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/Groups">Groups</RouterLink>
        <Typography color="textPrimary">{match.params.id}</Typography>
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
            <Tab label="Smart Locks" {...a11yProps(2)} />
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
                  icon: Delete,
                  tooltip:
                    "Delete user from a group should be done from Azure AD",
                  disabled: true,
                  onClick: () => null
                },
                {
                  icon: () => <AddBox fontSize="large" />,
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
                  icon: Delete,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    event.stopPropagation();
                    handleDeleteSmartLockClick(rowData.id);
                  }
                },
                {
                  icon: () => <AddBox fontSize="large" />,
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
