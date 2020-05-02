import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Edit as EditIcon } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import { array, object, string } from "yup";
import { Autocomplete, Select } from "material-ui-formik-components";
import { useSnackbar } from "notistack";
import { updateUser } from "@/actions/userActions";
import helpers from "@/helpers";

import {
  smartLockContext,
  statusOptions,
  uiContext,
  userContext
} from "@/store";
import useDidMountEffect from "@/extensions/useDidMountEffect";
import { closeEditDialog } from "@/actions/uiActions";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { isEqual } from "lodash";

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
    backgroundColor: fade("#ffffff", 0.0)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  button: { marginBottom: theme.spacing(2), minWidth: 80 },
  option: { backgroundColor: "black" }
}));

const initialValues = {
  status: "inactive",
  user: {},
  smartLocks: []
};

const validationSchema = object().shape({
  status: string(),
  user: object(),
  smartLocks: array()
});

const EditUserDialog = () => {
  const classes = useStyles();
  const [userState, userDispatch] = useContext(userContext);
  const {
    user,
    userError,
    userSmartLocks,
    loading: userLoading,
    updateFailed,
    updateSucceed
  } = userState;

  const [formData, setFormData] = useState(initialValues);
  const [oldFormData, setOldFormData] = useState(initialValues);
  const [userOptions, setUserOptions] = useState([]);

  const [smartLockState] = useContext(smartLockContext);
  const { smartLocks } = smartLockState;
  const { enqueueSnackbar } = useSnackbar();

  const [uiState, uiDispatch] = useContext(uiContext);
  const { editDialogOpen } = uiState;

  useDidMountEffect(() => {
    const newFormData = {
      ...formData,
      user: user || {},
      status: user ? user.status.toLowerCase() : "inactive",
      smartLocks: userSmartLocks || []
    };
    setFormData(newFormData);
    setOldFormData(newFormData);
    setUserOptions([user]);
  }, [user, userSmartLocks]);

  useDidMountEffect(() => {
    if (updateFailed) {
      enqueueSnackbar("Update user failed", {
        variant: "error"
      });
    }
  }, [updateFailed]);

  useDidMountEffect(() => {
    if (updateSucceed) {
      enqueueSnackbar("User updated successfully", {
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
    const smartLocksPayload = {
      value: values.smartLocks.map(sl => ({ smartLockId: sl.id })),
      path: "/smartLockUsers",
      op: "replace"
    };

    const statusPayload = {
      value: values.status,
      path: "/status",
      op: "replace"
    };
    if (oldFormData.status !== formData.status) payload.push(statusPayload);

    if (!isArrayEqual(oldFormData.smartLocks, formData.smartLocks))
      payload.push(smartLocksPayload);

    if (payload.length === 0) return;

    userDispatch(dispatch => updateUser(dispatch, values.user.id, payload));
    uiDispatch(closeEditDialog);
  };

  const onSmartLockListChange = val => {
    setFormData({
      ...formData,
      smartLocks: val
    });
  };

  const onUserListChange = val => {
    setFormData({
      ...formData,
      user: val
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
              <Typography variant="h6">Edit User</Typography>
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
                    name="user"
                    getOptionLabel={option =>
                      option.displayName ? option.displayName : ""
                    }
                    component={Autocomplete}
                    value={formData.user}
                    options={userOptions}
                    disabled
                    onChange={(e, v) => onUserListChange(v)}
                    getOptionSelected={(option, value) => {
                      if (!option || !value) return {};
                      return option.id === value.id;
                    }}
                    size="small"
                    textFieldProps={{
                      label: "Azure AD user",
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
            open={userLoading && editDialogOpen}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditUserDialog;
