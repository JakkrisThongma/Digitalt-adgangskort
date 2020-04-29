import React, { useContext, useState } from "react";
import {
  Grid,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PersonAdd as UserAddIcon } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { object } from "yup";
import { Autocomplete } from "material-ui-formik-components";
import { useSnackbar } from "notistack";
import { closeAddDialog } from "@/actions/uiActions";
import { userContext, smartLockContext, uiContext } from "@/store";
import useDidMountEffect from "@/helpers/useDidMountEffect";
import { addSmartLockUser } from "@/actions/smartLockActions";

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
  user: {},
  smartLock: {}
};

const validationSchema = object().shape({
  user: object(),
  smartLock: object()
    .required("Smart lock is required")
    .nullable()
});

const filterOptions = (arr1, arr2) => {
  return arr1.filter(el1 => {
    return (
      arr2.filter(el2 => {
        return el2.id === el1.id;
      }).length === 0
    );
  });
};
const AddUserSmartLockDialog = () => {
  const classes = useStyles();

  const [userState, userDispatch] = useContext(userContext);
  const { user, userError, userSmartLocks } = userState;

  const [userOptions, setUserOptions] = useState([]);
  const [smartLockOptions, setsmartLockOptions] = useState([]);

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const {
    smartLocks,
    error: smartLockError,
    addFailed,
    addSucceed
  } = smartLockState;
  const { enqueueSnackbar } = useSnackbar();

  const [uiState, uiDispatch] = useContext(uiContext);
  const { addDialogOpen } = uiState;

  useDidMountEffect(() => {
    setUserOptions([user]);
  }, [user]);

  useDidMountEffect(() => {
    const filterdOptions = filterOptions(smartLocks, userSmartLocks);
    setsmartLockOptions(filterdOptions);
  }, [smartLocks]);

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
      enqueueSnackbar("Smart lock added successfully", {
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
      userId: user.id
    };
    smartLockDispatch(dispatch =>
      addSmartLockUser(dispatch, values.smartLock.id, payload)
    );
    const filterdOptions = filterOptions(smartLocks, userSmartLocks);
    setsmartLockOptions(filterdOptions);
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
              enableReinitialize
              onSubmit={values => handleAddClick(values)}>
              {formik => (
                <Form noValidate autoComplete="off">
                  <Field
                    name="user"
                    component={Autocomplete}
                    options={userOptions}
                    getOptionLabel={option =>
                      option.displayName ? option.displayName : ""
                    }
                    value={user || {}}
                    size="small"
                    disabled
                    textFieldProps={{
                      label: "Azure AD user",
                      required: true,
                      variant: "outlined"
                    }}
                  />
                  <Field
                    name="smartLock"
                    getOptionLabel={option => option.title}
                    options={smartLockOptions}
                    component={Autocomplete}
                    size="small"
                    textFieldProps={{
                      label: "Smart lock",
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

export default AddUserSmartLockDialog;
