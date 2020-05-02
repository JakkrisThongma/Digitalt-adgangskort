import React, { useContext, useEffect, useState } from "react";
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
import { Lock as SmartLockAddIcon } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { object, string, array } from "yup";
import { Autocomplete, Select, TextField } from "material-ui-formik-components";
import { useSnackbar } from "notistack";
import { addSmartLock } from "@/actions/smartLockActions";
import { closeAddDialog } from "@/actions/uiActions";
import {
  groupContext,
  userContext,
  smartLockContext,
  statusOptions,
  uiContext
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
  manufactureId: "",
  title: "",
  description: "",
  status: "inactive",
  users: [],
  groups: []
};

const validationSchema = object().shape({
  manufactureId: string()
    .required("Manufacture ID is required")
    .nullable(),
  title: string()
    .required("Title is required")
    .nullable(),
  description: string(),
  status: string(),
  users: array(),
  groups: array()
});

const AddSmartLockDialog = () => {
  const classes = useStyles();
  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const {
    error: smartLockError,
    loading,
    addFailed,
    addSucceed
  } = smartLockState;

  const [userState, userDispatch] = useContext(userContext);
  const { users } = userState;

  const [groupState, groupDispatch] = useContext(groupContext);
  const { groups } = groupState;

  const { enqueueSnackbar } = useSnackbar();

  const [uiState, uiDispatch] = useContext(uiContext);
  const { addDialogOpen } = uiState;

  useDidMountEffect(() => {
    if (addFailed) {
      enqueueSnackbar("Add smartLock failed", {
        variant: "error"
      });
    }
  }, [addFailed]);

  useDidMountEffect(() => {
    if (addSucceed) {
      enqueueSnackbar("SmartLock added successfully", {
        variant: "success"
      });
    }
  }, [addSucceed]);

  const handleCancelClick = () => {
    uiDispatch(closeAddDialog);
  };

  const handleAddClick = values => {
    const payload = {
      manufactureId: values.manufactureId,
      title: values.title,
      description: values.description,
      status: values.status,
      smartLockUsers: values.users.map(user => ({
        userId: user.id
      })),
      smartLockGroups: values.groups.map(group => ({
        groupId: group.id
      }))
    };
    smartLockDispatch(dispatch => addSmartLock(dispatch, payload));
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
              <SmartLockAddIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h6">Add Smart lock</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnChange
              onSubmit={values => handleAddClick(values)}>
              {formik => (
                <Form noValidate autoComplete="off">
                  <Field
                    required
                    name="manufactureId"
                    label="Manufacture Id"
                    component={TextField}
                    size="small"
                    variant="outlined"
                  />
                  <Field
                    required
                    name="title"
                    label="Title"
                    component={TextField}
                    size="small"
                    variant="outlined"
                  />

                  <Field
                    name="description"
                    label="Description"
                    component={TextField}
                    size="small"
                    variant="outlined"
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
                    name="groups"
                    getOptionLabel={option => option.displayName}
                    options={groups}
                    component={Autocomplete}
                    filterSelectedOptions
                    multiple
                    size="small"
                    textFieldProps={{
                      label: "Group(s)",
                      variant: "outlined"
                    }}
                  />
                  <Field
                    name="users"
                    getOptionLabel={option => option.displayName}
                    options={users}
                    component={Autocomplete}
                    filterSelectedOptions
                    multiple
                    size="small"
                    textFieldProps={{
                      label: "User(s)",
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

export default AddSmartLockDialog;
