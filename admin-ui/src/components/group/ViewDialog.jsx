import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import {
  Grid,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Backdrop,
  CircularProgress,
  fade
} from "@material-ui/core";
import { GroupAdd as GroupAddIcon } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { object, string, array } from "yup";
import { Autocomplete, Select } from "material-ui-formik-components";
import {
  closeEditGroupDialog,
  closeViewGroupDialog,
  updateGroup
} from "../../actions/groupActions";

import { groupContext, smartLockContext } from "../../store/Store";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto"
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const ViewDialog = props => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(groupContext);
  const {
    group,
    groupError,
    groupSmartLocks,
    loading: groupLoading,
    viewDialogOpen
  } = groupState;

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { smartLocks, smartLockError } = smartLockState;

  const handleCloseClick = () => {
    groupDispatch(closeViewGroupDialog);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  }

  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <div>
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseClick}
        aria-labelledby="edit-dialog-title"
        maxWidth="sm"
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
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example">
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Typography>Item One </Typography>
              <Typography>Item One </Typography>
              <Typography>Item One </Typography>
              <Typography>Item One </Typography>
              <Typography>Item One </Typography>
              <Typography>Item One </Typography>

            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              Item Three
            </TabPanel>
          </SwipeableViews>
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
ViewDialog.propTypes = {};

export default ViewDialog;
