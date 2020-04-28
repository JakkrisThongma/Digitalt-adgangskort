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
import { object } from "yup";
import { Autocomplete } from "material-ui-formik-components";
import { useSnackbar } from "notistack";
import { addGroup } from "src/actions/groupActions";

import { closeAddDialog } from "src/actions/uiActions";
import {
  azureAdContext,
  groupContext,
  smartLockContext,
  uiContext
} from "src/store";
import useDidMountEffect from "src/helpers/useDidMountEffect";

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
  group: {},
  smartLocks: {}
};

const validationSchema = object().shape({
  group: object(),
  smartLocks: object()
});

const AddGroupSmartLockDialog = () => {
  const classes = useStyles();

  const [groupState, groupDispatch] = useContext(groupContext);
  const { group, groupError, loading, addFailed, addSucceed } = groupState;

  const [groupOptions, setGroupOptions] = useState([]);

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { smartLocks, smartLockError } = smartLockState;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [uiState, uiDispatch] = useContext(uiContext);
  const { addDialogOpen } = uiState;

  useEffect(() => {
    setGroupOptions([group]);
  }, [group]);



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
                    value={group ? group : {}}
                    size="small"
                    disabled
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

export default AddGroupSmartLockDialog;
