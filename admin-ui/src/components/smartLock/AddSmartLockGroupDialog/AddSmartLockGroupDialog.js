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
import { GroupAdd as GroupAddIcon } from "@material-ui/icons";
import { Field, Form, Formik } from "formik";
import { object } from "yup";
import { Autocomplete } from "material-ui-formik-components";
import { useSnackbar } from "notistack";
import { closeAddDialog } from "@/actions/uiActions";
import { groupContext, smartLockContext, uiContext } from "@/store";
import useDidMountEffect from "@/extensions/useDidMountEffect";
import { addSmartLockGroup } from "@/actions/smartLockActions";
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
  group: {}
};

const validationSchema = object().shape({
  smartLock: object(),
  group: object()
    .required("Group is required")
    .nullable()
});

const AddSmartLockGroupDialog = () => {
  const classes = useStyles();

  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const {
    smartLock,
    smartLockError,
    smartLockGroups,
    addFailed,
    addSucceed
  } = smartLockState;

  const [groupOptions, setGroupOptions] = useState([]);
  const [smartLockOptions, setSmartLockOptions] = useState([]);

  const [groupState, groupDispatch] = useContext(groupContext);
  const { groups, error: groupError } = groupState;
  const { enqueueSnackbar } = useSnackbar();

  const [uiState, uiDispatch] = useContext(uiContext);
  const { addDialogOpen } = uiState;

  useDidMountEffect(() => {
    setSmartLockOptions([smartLock]);
  }, [smartLock]);

  useDidMountEffect(() => {
    const filterdOptions = filterOptions(groups, smartLockGroups);
    setGroupOptions(filterdOptions);
  }, [groups]);

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
      enqueueSnackbar("Group added successfully", {
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
      groupId: values.group.id
    };
    smartLockDispatch(dispatch =>
      addSmartLockGroup(dispatch, smartLock.id, payload)
    );
    const filterdOptions = filterOptions(groups, smartLockGroups);
    setGroupOptions(filterdOptions);
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
              <Typography variant="h6">Add Group</Typography>
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
                    name="group"
                    getOptionLabel={option => option.displayName}
                    options={groupOptions}
                    component={Autocomplete}
                    size="small"
                    textFieldProps={{
                      label: "Group",
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

export default AddSmartLockGroupDialog;
