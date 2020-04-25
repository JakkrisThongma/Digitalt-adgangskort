import React, { useContext } from "react";
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
import { closeViewGroupDialog } from "../../actions/groupActions";
import ViewMaterialTable from "../common/ViewMaterialTable";
import TabPanel from "../common/TabPanel";

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

const ViewGroupDialog = () => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(groupContext);
  const {
    group,
    groupError,
    groupSmartLocks,
    groupUsers,
    loading: groupLoading,
    viewDialogOpen
  } = groupState;

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { smartLocks, smartLockError } = smartLockState;

  const [value, setValue] = React.useState(0);

  const handleCloseClick = () => {
    groupDispatch(closeViewGroupDialog);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}>
              <Tab label="Info" {...a11yProps(0)} />
              <Tab label="Users" {...a11yProps(1)} />
              <Tab label="Smart Locks" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Box mr={2} mb={2} display="inline-block">
                <Typography display="inline" color="textSecondary">
                  Id:
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
                  status:
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
                  {group ? new Date(group.creationDate).toUTCString() : ""}
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
                  {group
                    ? new Date(group.lastModificationDate).toUTCString()
                    : ""}
                </Typography>
              </Box>
              <br />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ViewMaterialTable
                isLoading={groupLoading}
                columns={usercolumns}
                data={groupUsers}
                actions={[
                  {
                    icon: Delete,
                    tooltip:
                      "Delete user from a group should be done from Azure AD",
                    disabled: true
                  },
                  {
                    icon: () => <AddBox fontSize="large" />,
                    tooltip: "Add user to group should be done from Azure AD",
                    isFreeAction: true,
                    disabled: true
                  }
                ]}
                style={{ boxShadow: "0" }}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
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
                      // handleDeleteSmartLockClick(rowData.id);
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
