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
import { Autocomplete, Select, TextField } from "material-ui-formik-components";
import { useSnackbar } from "notistack";
import { updateSmartLock } from "@/actions/smartLockActions";
import { closeEditDialog } from "@/actions/uiActions";
import {
  groupContext,
  smartLockContext,
  statusOptions,
  uiContext,
  userContext
} from "@/store";
import { useDidMountEffect } from "@/extensions";
import { isEqual } from "lodash";
import helpers from "@/helpers";

const { isArrayEqual } = helpers;

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "black",
    backgroundColor: fade("#ffffff", 0.1)
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
    .required("SmartLock is required")
    .nullable(),
  title: string()
    .required("SmartLock is required")
    .nullable(),
  description: string(),
  status: string(),
  users: array(),
  groups: array()
});

const EditSmartLockDialog = () => {
  const classes = useStyles();
  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const {
    smartLock,
    smartLockUsers,
    smartLockGroups,
    selectedSmartLockId,
    error: smartLockError,
    loading: smartLockLoading,
    updateFailed,
    updateSucceed
  } = smartLockState;

  const [formData, setFormData] = useState(initialValues);
  const [oldFormData, setOldFormData] = useState(initialValues);
  const [userState, userDispatch] = useContext(userContext);
  const { users, loading: userLoading } = userState;

  const [groupState, groupDispatch] = useContext(groupContext);
  const { groups, loading: groupLoading } = groupState;
  const loading = smartLockLoading || groupLoading || userLoading;
  const { enqueueSnackbar } = useSnackbar();

  const [uiState, uiDispatch] = useContext(uiContext);
  const { editDialogOpen } = uiState;

  useDidMountEffect(() => {
    const newFormData = {
      ...formData,
      manufactureId: smartLock ? smartLock.manufactureId : "",
      title: smartLock ? smartLock.title : "",
      description: smartLock ? smartLock.description : "",
      status: smartLock ? smartLock.status.toLowerCase() : "inactive",
      users: smartLockUsers,
      groups: smartLockGroups
    };
    setFormData(newFormData);
    setOldFormData(newFormData);
  }, [smartLock, smartLockUsers, smartLockGroups]);

  useDidMountEffect(() => {
    if (updateFailed) {
      enqueueSnackbar("Update smart lock failed", {
        variant: "error"
      });
    }
  }, [updateFailed]);

  useDidMountEffect(() => {
    if (updateSucceed) {
      enqueueSnackbar("Smart lock updated successfully", {
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
    const manufactureIdPayload = {
      value: values.manufactureId,
      path: "/manufactureId",
      op: "replace"
    };

    const titlePayload = {
      value: values.title,
      path: "/title",
      op: "replace"
    };

    const descriptionPayload = {
      value: values.description,
      path: "/description",
      op: "replace"
    };

    const statusPayload = {
      value: values.status,
      path: "/status",
      op: "replace"
    };
    const groupsPayload = {
      value: values.groups.map(group => ({
        groupId: group.id
      })),
      path: "/smartLockGroups",
      op: "replace"
    };

    const usersPayload = {
      value: values.users.map(user => ({
        userId: user.id
      })),
      path: "/smartLockUsers",
      op: "replace"
    };
    if (oldFormData.manufactureId !== formData.manufactureId)
      payload.push(manufactureIdPayload);

    if (oldFormData.title !== formData.title) payload.push(titlePayload);
    if (oldFormData.description !== formData.description)
      payload.push(descriptionPayload);
    if (oldFormData.status !== formData.status) payload.push(statusPayload);

    if (!isArrayEqual(oldFormData.groups, formData.groups))
      payload.push(groupsPayload);

    if (!isArrayEqual(oldFormData.users, formData.users))
      payload.push(usersPayload);

    if (payload.length === 0) return;

    smartLockDispatch(dispatch =>
      updateSmartLock(dispatch, selectedSmartLockId, payload)
    );
    uiDispatch(closeEditDialog);
  };

  const onManufactureIdChange = event => {
    setFormData({
      ...formData,
      manufactureId: event.target.value
    });
  };

  const onTitleChange = event => {
    setFormData({
      ...formData,
      title: event.target.value
    });
  };

  const onDescriptionChange = event => {
    setFormData({
      ...formData,
      description: event.target.value
    });
  };

  const onStatusChange = event => {
    setFormData({
      ...formData,
      status: event.target.value
    });
  };

  const onUsersChange = val => {
    setFormData({
      ...formData,
      users: val
    });
  };

  const onGroupsChange = val => {
    setFormData({
      ...formData,
      groups: val
    });
  };

  return (
    <div>
      <Dialog
        open={editDialogOpen}
        onClose={handleCancelClick}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth>
        <DialogTitle id="form-dialog-title">
          <Grid container spacing={2}>
            <Grid item>
              <EditIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h6">Edit smart lock</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div>
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              validateOnChange
              enableReinitialize
              onSubmit={values => handleEditClick(values)}>
              {formik => (
                <Form noValidate autoComplete="off">
                  <Field
                    required
                    name="manufactureId"
                    label="Manufacture Id"
                    component={TextField}
                    value={formData.manufactureId}
                    onChange={e => onManufactureIdChange(e)}
                    size="small"
                    variant="outlined"
                  />
                  <Field
                    required
                    name="title"
                    label="Title"
                    component={TextField}
                    value={formData.title}
                    onChange={e => onTitleChange(e)}
                    size="small"
                    variant="outlined"
                  />

                  <Field
                    name="description"
                    label="Description"
                    component={TextField}
                    value={formData.description}
                    onChange={e => onDescriptionChange(e)}
                    size="small"
                    variant="outlined"
                  />

                  <Field
                    name="status"
                    label="Status"
                    component={Select}
                    options={statusOptions}
                    value={formData.status}
                    onChange={e => onStatusChange(e)}
                    size="small"
                    variant="outlined"
                  />
                  <Field
                    name="groups"
                    getOptionLabel={option => option.displayName}
                    options={groups}
                    component={Autocomplete}
                    value={formData.groups}
                    onChange={(e, v) => onGroupsChange(v)}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
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
                    value={formData.users}
                    onChange={(e, v) => onUsersChange(v)}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
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
            open={loading && editDialogOpen}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditSmartLockDialog;
