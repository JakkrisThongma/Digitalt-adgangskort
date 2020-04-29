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
import { PersonAdd as UserAddIcon } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { object, string, array } from "yup";
import { Autocomplete, Select } from "material-ui-formik-components";
import { useSnackbar } from "notistack";
import { updateUser } from "@/actions/userActions";

import {
  userContext,
  smartLockContext,
  statusOptions,
  uiContext
} from "@/store";
import useDidMountEffect from "@/helpers/useDidMountEffect";
import { closeEditDialog } from "@/actions/uiActions";

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
  const [userOptions, setUserOptions] = useState([]);

  const [smartLockState] = useContext(smartLockContext);
  const { smartLocks } = smartLockState;
  const { enqueueSnackbar } = useSnackbar();

  const [uiState, uiDispatch] = useContext(uiContext);
  const { editDialogOpen } = uiState;

  useEffect(() => {
    setFormData({
      ...formData,
      user: user || {},
      status: user ? user.status.toLowerCase() : "inactive"
    });
    setUserOptions([user]);
  }, [user]);

  useEffect(() => {
    setFormData({
      ...formData,
      smartLocks: userSmartLocks
    });
  }, [userSmartLocks]);

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
    const payload = [
      {
        value: values.smartLocks.map(sl => ({ smartLockId: sl.id })),
        path: "/SmartLockUsers",
        op: "replace"
      },
      {
        value: values.status,
        path: "/status",
        op: "replace"
      }
    ];

    userDispatch(dispatch => updateUser(dispatch, values.user.id, payload));
    if (userError) {
      console.log(userError);
    }
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
              <UserAddIcon fontSize="large" />
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
          <Backdrop className={classes.backdrop} open={userLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditUserDialog;
