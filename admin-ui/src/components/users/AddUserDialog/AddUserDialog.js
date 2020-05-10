import React, { useContext } from "react";
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
import { array, object, string } from "yup";
import { Autocomplete, Select } from "material-ui-formik-components";

import { useSnackbar } from "notistack";
import { closeAddDialog } from "@/actions/uiActions";
import { addUser } from "@/actions/userActions";

import {
  azureAdContext,
  smartLockContext,
  statusOptions,
  uiContext,
  userContext
} from "@/store";
import useDidMountEffect from "@/extensions/useDidMountEffect";

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
  status: "inactive",
  user: "",
  smartLocks: []
};

const validationSchema = object().shape({
  user: string()
    .required("User is required")
    .nullable(),
  status: string(),
  smartLocks: array()
});

const AddUserDialog = () => {
  const classes = useStyles();

  const [azureAdState] = useContext(azureAdContext);
  const { azureAdUsers } = azureAdState;

  const [userState, userDispatch] = useContext(userContext);
  const { addFailed, addSucceed } = userState;

  const [smartLockState] = useContext(smartLockContext);
  const { smartLocks } = smartLockState;

  const { enqueueSnackbar } = useSnackbar();

  const [uiState, uiDispatch] = useContext(uiContext);
  const { addDialogOpen } = uiState;

  useDidMountEffect(() => {
    if (addFailed) {
      enqueueSnackbar("Add user failed", {
        variant: "error"
      });
    }
  }, [addFailed]);

  useDidMountEffect(() => {
    if (addSucceed) {
      enqueueSnackbar("User added successfully", {
        variant: "success"
      });
    }
  }, [addSucceed]);

  const handleCancelClick = () => {
    uiDispatch(closeAddDialog);
  };

  const handleAddClick = values => {
    const payload = {
      id: values.user.id,
      status: values.status,
      smartLockUsers: values.smartLocks.map(smartLock => ({
        smartLockId: smartLock.id
      }))
    };
    console.log(payload);
    userDispatch(dispatch => addUser(dispatch, payload));
    uiDispatch(closeAddDialog);
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
              <Typography variant="h6">Add Azure Ad User</Typography>
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
              onSubmit={values => handleAddClick(values)}>
              {formik => (
                <Form noValidate autoComplete="off">
                  <Field
                    required
                    name="user"
                    component={Autocomplete}
                    options={azureAdUsers}
                    getOptionLabel={option =>
                      option.displayName ? option.displayName : ""
                    }
                    size="small"
                    textFieldProps={{
                      label: "Azure AD user",
                      required: true,
                      variant: "outlined"
                    }}
                    getOptionDisabled={option => option.addedToDb === true}
                  />
                  <Field
                    name="status"
                    label="Status"
                    component={Select}
                    options={statusOptions}
                    size="small"
                    variant="outlined"
                  />
                  <Field
                    name="smartLocks"
                    getOptionLabel={option => option.title}
                    options={smartLocks}
                    component={Autocomplete}
                    filterSelectedOptions
                    multiple
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

export default AddUserDialog;
