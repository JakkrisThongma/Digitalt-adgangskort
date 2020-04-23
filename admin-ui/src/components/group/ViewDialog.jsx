import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
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
import { makeStyles } from "@material-ui/core/styles";
import { GroupAdd as GroupAddIcon } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { object, string, array } from "yup";
import { Autocomplete, Select } from "material-ui-formik-components";
import { closeEditGroupDialog, updateGroup } from "../../actions/groupActions";

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

const ViewDialog = props => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(groupContext);
  const {
    group,
    groupError,
    groupSmartLocks,
    loading: groupLoading,
    editDialogOpen
  } = groupState;

  const [formData, setFormData] = useState(initialValues);
  const [groupOptions, setGroupOptions] = useState([]);

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { smartLocks, smartLockError } = smartLockState;
  const [smartLockOptions, setSmartLockOptions] = useState([]);

  useEffect(() => {
    setFormData({
      ...formData,
      group: group || {},
      status: group ? group.status.toLowerCase() : "inactive"
    });
    setGroupOptions([group]);
  }, [group]);

  useEffect(() => {
    setSmartLockOptions(smartLocks);
  }, [smartLocks]);

  useEffect(() => {}, [formData]);

  useEffect(() => {
    setFormData({
      ...formData,
      smartLocks: groupSmartLocks
    });
  }, [groupSmartLocks]);

  const handleCancelClick = () => {
    groupDispatch(closeEditGroupDialog);
  };




  return (
    <div>
      <Dialog
        open={editDialogOpen}
        onClose={handleCancelClick}
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
          <div>
            <DialogActions>
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleCancelClick}
                color="primary">
                Close
              </Button>
            </DialogActions>
          </div>
          <Backdrop className={classes.backdrop} open={groupLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </DialogContent>
      </Dialog>
    </div>
  );
};

ViewDialog.propTypes = {};

export default ViewDialog;
