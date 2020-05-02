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
import { makeStyles } from "@material-ui/core/styles";
import { PersonAdd as UserAddIcon } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import { object } from "yup";
import { Autocomplete } from "material-ui-formik-components";
import { useSnackbar } from "notistack";
import { closeAddDialog } from "@/actions/uiActions";
import { smartLockContext, uiContext, userContext } from "@/store";
import useDidMountEffect from "@/extensions/useDidMountEffect";
import { addSmartLockUser } from "@/actions/smartLockActions";
import helpers from "@/helpers";

const { filterOptions } = helpers;
const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto"
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  button: { marginBottom: theme.spacing(2), minWidth: 80 },
  option: { backgroundColor: "black" }
}));

const initialValues = {
  smartLock: {},
  user: {}
};

const validationSchema = object().shape({
  smartLock: object(),
  user: object()
    .required("User is required")
    .nullable()
});

const AddSmartLockUserDialog = () => {
  const classes = useStyles();

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const {
    smartLock,
    smartLockError,
    smartLockUsers,
    addFailed,
    addSucceed
  } = smartLockState;

  const [userOptions, setUserOptions] = useState([]);
  const [smartLockOptions, setSmartLockOptions] = useState([]);

  const [userState, userDispatch] = useContext(userContext);
  const { users, error: userError } = userState;
  const { enqueueSnackbar } = useSnackbar();

  const [uiState, uiDispatch] = useContext(uiContext);
  const { addDialogOpen } = uiState;

  useDidMountEffect(() => {
    setSmartLockOptions([smartLock]);
  }, [smartLock]);

  useDidMountEffect(() => {
    const filterdOptions = filterOptions(users, smartLockUsers);
    setUserOptions(filterdOptions);
  }, [users]);

  useDidMountEffect(() => {
    const msg = smartLockError.message;
    if (addFailed) {
      enqueueSnackbar(`Error: ${msg}`, {
        variant: "error"
      });
    }
  }, [addFailed]);

  useDidMountEffect(() => {
    if (addSucceed) {
      enqueueSnackbar("User added successfully", {
        variant: "success"
      });
      uiDispatch(closeAddDialog);
    }
  }, [addSucceed]);

  const handleCancelClick = () => {
    uiDispatch(closeAddDialog);
  };

  const handleAddClick = values => {
    const payload = {
      userId: values.user.id
    };
    smartLockDispatch(dispatch =>
      addSmartLockUser(dispatch, smartLock.id, payload)
    );
    const filterdOptions = filterOptions(users, smartLockUsers);
    setUserOptions(filterdOptions);
  };

  return (
    <div>
      <Dialog
        open={addDialogOpen}
        onClose={handleCancelClick}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth>
        <DialogTitle id="form-dialog-title">
          <Grid container spacing={2}>
            <Grid item>
              <UserAddIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h6">Add User</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnChange
              validateOnBlur
              enableReinitialize
              onSubmit={values => handleAddClick(values)}>
              {formik => (
                <Form noValidate autoComplete="off">
                  <Field
                    name="smartLock"
                    component={Autocomplete}
                    options={smartLockOptions}
                    getOptionLabel={option =>
                      option.title ? option.title : ""
                    }
                    value={smartLock || {}}
                    size="small"
                    disabled
                    textFieldProps={{
                      label: "Smart lock",
                      required: true,
                      variant: "outlined"
                    }}
                  />
                  <Field
                    name="user"
                    getOptionLabel={option => option.displayName}
                    options={userOptions}
                    component={Autocomplete}
                    size="small"
                    textFieldProps={{
                      label: "User",
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
                      disabled={!formik.dirty}
                      type="submit">
                      Add
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSmartLockUserDialog;
