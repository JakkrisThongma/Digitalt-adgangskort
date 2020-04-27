import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import { GroupAdd as GroupAddIcon } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { object, string, array } from "yup";
import { Autocomplete, Select } from "material-ui-formik-components";
import { closeEditGroupDialog, updateGroup } from "../../actions/groupActions";

import { groupContext, smartLockContext, statusOptions } from "../../store";
import useDidMountEffect from "../../helpers/useDidMountEffect";
import { useSnackbar } from "notistack";


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

const initialValues = {
  group: {},
  smartLocks: []
};

const validationSchema = object().shape({
  group: object(),
  smartLocks: array()
});



const AddGroupSmartLockDialog = () => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(groupContext);
  const {
    group,
    groupError,
    groupSmartLocks,
    loading: groupLoading,
    editDialogOpen,
    updateFailed,
    updateSucceed
  } = groupState;

  const [formData, setFormData] = useState(initialValues);
  const [groupOptions, setGroupOptions] = useState([]);

  const [smartLockState] = useContext(smartLockContext);
  const { smartLocks } = smartLockState;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setFormData({
      ...formData,
      group: group || {},
      status: group ? group.status.toLowerCase() : "inactive"
    });
    setGroupOptions([group]);
  }, [group]);

  useEffect(() => {
    setFormData({
      ...formData,
      smartLocks: groupSmartLocks
    });
  }, [groupSmartLocks]);

  useDidMountEffect(() => {
    if (updateFailed) {
      enqueueSnackbar("Update group failed", {
        variant: "error"
      });
    }
  }, [updateFailed]);

  useDidMountEffect(() => {
    if (updateSucceed) {
      enqueueSnackbar("Group updated successfully", {
        variant: "success"
      });
    }
  }, [updateSucceed]);

  const handleCancelClick = () => {
    groupDispatch(closeEditGroupDialog);
  };

  const handleEditClick = values => {
    const payload = [
      {
        value: values.smartLocks.map(sl => ({ smartLockId: sl.id })),
        path: "/SmartLockGroups",
        op: "replace"
      },
      {
        value: values.status,
        path: "/status",
        op: "replace"
      }
    ];

    groupDispatch(dispatch => updateGroup(dispatch, values.group.id, payload));
    if (groupError) {
      console.log(groupError);
    }
    groupDispatch(closeEditGroupDialog);
  };

  const onSmartLockListChange = val => {
    setFormData({
      ...formData,
      smartLocks: val
    });
  };

  const onGroupListChange = val => {
    setFormData({
      ...formData,
      group: val
    });
  };

  const onStatusListChange = event => {
    setFormData({
      ...formData,
      status: event.target.value
    });
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
              <Typography variant="h6">Edit Group</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div>
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              enableReinitialize
              validateOnChange
              onSubmit={values => handleEditClick(values)}>
              {formik => (
                <Form noValidate autoComplete="off">
                  <Field
                    name="group"
                    getOptionLabel={option =>
                      option.displayName ? option.displayName : ""
                    }
                    component={Autocomplete}
                    value={formData.group}
                    options={groupOptions}
                    disabled
                    onChange={(e, v) => onGroupListChange(v)}
                    getOptionSelected={(option, value) => {
                      if (!option || !value) return {};
                      return option.id === value.id;
                    }}
                    size="small"
                    textFieldProps={{
                      label: "Azure AD group",
                      required: true,
                      variant: "outlined"
                    }}
                  />
                  <Field
                    name="smartLocks"
                    getOptionLabel={option => option.title}
                    options={smartLocks}
                    onChange={(e, v) => onSmartLockListChange(v)}
                    value={formData.smartLocks}
                    filterSelectedOptions
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    multiple
                    component={Autocomplete}
                    size="small"
                    textFieldProps={{
                      label: "Smart lock(s)",
                      variant: "outlined"
                    }}
                  />
                  <DialogActions>
                    <Button
                      className={classes.button}
                      variant="contained"
                      onClick={handleCancelClick}
                      color="primary">
                      Cancel
                    </Button>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      type="submit">
                      Edit
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </div>
          <Backdrop className={classes.backdrop} open={groupLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddGroupSmartLockDialog;
