import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  CircularProgress,
  Backdrop
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Edit as EditIcon } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import { array, object, string } from "yup";
import { Autocomplete, Select } from "material-ui-formik-components";
import { useSnackbar } from "notistack";
import { updateGroup } from "@/actions/groupActions";

import {
  groupContext,
  smartLockContext,
  statusOptions,
  uiContext
} from "@/store";
import { useDidMountEffect } from "@/extensions";
import { closeEditDialog } from "@/actions/uiActions";
import { isEqual } from "lodash";
import helpers from "@/helpers";

const { isArrayEqual } = helpers;

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
  status: "inactive",
  group: {},
  smartLocks: []
};

const validationSchema = object().shape({
  status: string(),
  group: object(),
  smartLocks: array()
});

const EditGroupDialog = () => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(groupContext);
  const {
    group,
    groupSmartLocks,
    loading: groupLoading,
    updateFailed,
    updateSucceed
  } = groupState;

  const [formData, setFormData] = useState(initialValues);
  const [oldFormData, setOldFormData] = useState(initialValues);

  const [groupOptions, setGroupOptions] = useState([]);

  const [smartLockState] = useContext(smartLockContext);
  const { smartLocks } = smartLockState;
  const { enqueueSnackbar } = useSnackbar();

  const [uiState, uiDispatch] = useContext(uiContext);
  const { editDialogOpen } = uiState;

  useDidMountEffect(() => {
    const newFormData = {
      ...formData,
      group: group || {},
      status: group ? group.status.toLowerCase() : "inactive",
      smartLocks: groupSmartLocks || []
    };
    setFormData(newFormData);
    setOldFormData(newFormData);
    setGroupOptions([group]);
  }, [group, groupSmartLocks]);

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
    uiDispatch(closeEditDialog);
  };

  const handleEditClick = values => {
    if (isEqual(oldFormData, formData)) return;

    const payload = [];
    const statusPayload = {
      value: values.status,
      path: "/status",
      op: "replace"
    };
    const smartLocksPayload = {
      value: values.smartLocks.map(sl => ({ smartLockId: sl.id })),
      path: "/smartLockGroups",
      op: "replace"
    };

    if (oldFormData.status !== formData.status) payload.push(statusPayload);

    if (!isArrayEqual(oldFormData.smartLocks, formData.smartLocks))
      payload.push(smartLocksPayload);

    if (payload.length === 0) return;

    groupDispatch(dispatch => updateGroup(dispatch, values.group.id, payload));
    uiDispatch(closeEditDialog);
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
              <EditIcon fontSize="large" />
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
                    name="status"
                    label="Status"
                    component={Select}
                    options={statusOptions}
                    value={formData.status}
                    onChange={e => onStatusListChange(e)}
                    size="small"
                    variant="outlined"
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
          <Backdrop
            className={classes.backdrop}
            open={groupLoading && editDialogOpen}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditGroupDialog;
