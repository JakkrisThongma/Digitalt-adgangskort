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
import { makeStyles, fade } from "@material-ui/core/styles";
import { GroupAdd as GroupAddIcon } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { object, string, array } from "yup";
import { Autocomplete, Select } from "material-ui-formik-components";
import { useSnackbar } from "notistack";
import { addGroup, closeAddGroupDialog } from "@/actions/groupActions";

import { getAzureAdGroups } from "@/actions/azureAdActions";
import { closeAddDialog } from "@/actions/uiActions";
import {
  azureAdContext,
  groupContext,
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
  status: "inactive",
  group: {},
  smartLocks: []
};

const validationSchema = object().shape({
  status: string(),
  group: object()
    .required("Group is required")
    .nullable(),
  smartLocks: array()
});

const AddGroupDialog = () => {
  const classes = useStyles();
  const [azureAdState, azureAdDispatch] = useContext(azureAdContext);

  const { azureAdGroups, azureAdError } = azureAdState;
  const [groupState, groupDispatch] = useContext(groupContext);
  const { groupError, loading, addFailed, addSucceed } = groupState;

  const [openGroup, setOpenGroup] = useState(false);
  const [groupOptions, setGroupOptions] = useState([]);
  const groupLoading = openGroup && groupOptions.length === 0;

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { smartLocks, smartLockError } = smartLockState;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [uiState, uiDispatch] = useContext(uiContext);
  const { addDialogOpen } = uiState;

  useEffect(() => {
    setGroupOptions(azureAdGroups);
  }, [azureAdGroups]);

  useEffect(() => {
    if (!groupLoading) {
      return undefined;
    }
    azureAdDispatch(getAzureAdGroups);
  }, [groupLoading]);

  useEffect(() => {
    if (!openGroup) {
      setGroupOptions([]);
    }
  }, [openGroup]);

  useDidMountEffect(() => {
    if (addFailed) {
      enqueueSnackbar("Add group failed", {
        variant: "error"
      });
    }
  }, [addFailed]);

  useDidMountEffect(() => {
    if (addSucceed) {
      enqueueSnackbar("Group added successfully", {
        variant: "success"
      });
    }
  }, [addSucceed]);

  const handleCancelClick = () => {
    uiDispatch(closeAddDialog);
  };

  const handleAddClick = values => {
    const payload = {
      id: values.group.id,
      status: values.status,
      smartLockGroups: values.smartLocks.map(smartLock => ({
        smartLockId: smartLock.id
      }))
    };
    groupDispatch(dispatch => addGroup(dispatch, payload));
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
              <GroupAddIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h6">Add Azure Ad Group</Typography>
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
                    name="group"
                    component={Autocomplete}
                    options={groupOptions}
                    getOptionLabel={option =>
                      option.displayName ? option.displayName : ""
                    }
                    open={openGroup}
                    onOpen={() => {
                      setOpenGroup(true);
                    }}
                    onClose={() => {
                      setOpenGroup(false);
                    }}
                    loading={groupLoading}
                    size="small"
                    textFieldProps={{
                      label: "Azure AD group",
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

export default AddGroupDialog;
