import React, { useContext, useEffect } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Tab,
  Tabs,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button
} from "@material-ui/core";
import { GroupAdd as GroupAddIcon, Delete, AddBox } from "@material-ui/icons";

import { groupContext, smartLockContext } from "../../store/Store";
import {
  closeViewGroupDialog,
  getGroups,
  getGroupSmartLocks,
  setSelectedGroupId
} from "../../actions/groupActions";
import ViewMaterialTable from "../common/ViewMaterialTable";
import TabPanel from "../common/TabPanel";
import {
  deleteSmartLockGroup,
  setSelectedSmartLockId
} from "../../actions/smartLockActions";
import useDidMountEffect from "../../helpers/useDidMountEffect";

const usercolumns = [
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

const dateFormater = date => {
  if (Date.parse(date))
    return new Date(date).toLocaleString("no-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  return "";
};
const ViewGroupDialog = () => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(groupContext);
  const {
    group,
    groupError,
    selectedGroupId,
    groupSmartLocks,
    groupUsers,
    loading: groupLoading,
    viewDialogOpen
  } = groupState;

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { smartLocks, smartLockError, didInvalidate } = smartLockState;

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleCloseClick = () => {
    groupDispatch(closeViewGroupDialog);
  };
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleDeleteSmartLockClick = smartLockId => {
    smartLockDispatch(dispatch =>
      deleteSmartLockGroup(dispatch, smartLockId, selectedGroupId)
    );
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
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseClick}
        scroll="paper"
        aria-labelledby="edit-dialog-title"
        maxWidth="md"
        fullWidth>
        <DialogTitle id="edit-dialog-title">
          <Grid container spacing={2}>
            <Grid item>
              <GroupAddIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h6">View Group</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
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
              <Box mr={2} mb={2} display="inline-block">
                <Typography display="inline" color="textSecondary">
                  ID:
                </Typography>
              </Box>
              <Box mb={2} display="inline-block">
                <Typography display="inline">
                  {group ? group.id : ""}
                </Typography>
              </Box>
              <br />

              <Box mr={2} mb={2} display="inline-block">
                <Typography display="inline" color="textSecondary">
                  Display name:
                </Typography>
              </Box>
              <Box mb={2} display="inline-block">
                <Typography display="inline">
                  {group ? group.displayName : ""}
                </Typography>
              </Box>
              <br />

              <Box mr={2} mb={2} display="inline-block">
                <Typography display="inline" color="textSecondary">
                  Status:
                </Typography>
              </Box>
              <Box mb={2} display="inline-block">
                <Typography display="inline">
                  {group ? group.status : ""}
                </Typography>
              </Box>
              <br />

              <Box mr={2} mb={2} display="inline-block">
                <Typography display="inline" color="textSecondary">
                  Created:
                </Typography>
              </Box>
              <Box mb={5} display="inline">
                <Typography display="inline">
                  {group ? dateFormater(group.creationDate) : ""}
                </Typography>
              </Box>
              <br />
              <Box mr={2} mb={5} display="inline">
                <Typography display="inline" color="textSecondary">
                  Last modified:
                </Typography>
              </Box>
              <Box mb={5} display="inline">
                <Typography display="inline">
                  {group ? dateFormater(group.lastModificationDate) : ""}
                </Typography>
              </Box>
              <br />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <ViewMaterialTable
                isLoading={groupLoading}
                columns={usercolumns}
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
                      console.log(rowData.id);
                      handleDeleteSmartLockClick(rowData.id);
                    }
                  },
                  {
                    icon: () => <AddBox fontSize="large" />,
                    tooltip: "Add",
                    isFreeAction: true,
                    onClick: event => event.stopPropagation()
                  }
                ]}
                style={{ boxShadow: "0" }}
              />
            </TabPanel>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleCloseClick}
            color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewGroupDialog;
