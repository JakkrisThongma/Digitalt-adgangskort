import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  Backdrop,
  CircularProgress,
  fade
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GroupAdd as GroupAddIcon } from "@material-ui/icons";
import { Formik, Form, Field } from "formik";
import { object, string, array } from "yup";
import { Autocomplete, Select } from "material-ui-formik-components";
import { addGroup } from "../../actions/groupActions";
import useApiRequest from "../../reducers/useApiRequest";
import azureAdReducer from "../../reducers/azureAdReducer";
import initialState from "../../data/initialState";
import { getAzureAdGroups } from "../../actions/azureAdActions";
import smartLockReducer from "../../reducers/smartLockReducer";
import { getSmartLocks } from "../../actions/smartLockActions";
import groupReducer from "../../reducers/groupReducer";

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
  groupId: "",
  smartLocks: []
};

const validationSchema = object().shape({
  status: string(),
  groupId: string()
    .required("Group is required")
    .nullable(),
  smartLocks: array()
});

const statusOptions = [
  { value: "inactive", label: "Inactive" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" }
];

const AddDialog = props => {
  const classes = useStyles();
  const { isAddDialogOpened, onAddDialogCancelClick } = props;
  const [state, dispatch] = useApiRequest(azureAdReducer, initialState);
  const { azureAdGroups, azureAdError } = state;
  const [groupState, groupDispatch] = useApiRequest(groupReducer, initialState);
  const { groupError, loading } = groupState;
  const [openGroup, setOpenGroup] = useState(false);
  const [groupOptions, setGroupOptions] = useState([]);
  const groupLoading = openGroup && groupOptions.length === 0;

  const [smartLockState, smartLockDispatch] = useApiRequest(
    smartLockReducer,
    initialState
  );
  const { smartLocks, smartLockError } = smartLockState;
  const [openSmartLock, setOpenSmartLock] = useState(false);
  const [smartLockOptions, setSmartLockOptions] = useState([]);
  const smartLockLoading = openSmartLock && smartLockOptions.length === 0;

  useEffect(() => {
    const optionList = azureAdGroups.map(u => {
      let label = "";

      if (u.displayName) label = `${u.displayName}`;
      return {
        label,
        value: u.id,
        addedToDb: u.addedToDb
      };
    });
    setGroupOptions(optionList);
  }, [azureAdGroups]);

  useEffect(() => {
    if (!groupLoading) {
      console.log("not loading");
      return undefined;
    }
    dispatch(getAzureAdGroups);
  }, [groupLoading]);

  useEffect(() => {
    if (!openGroup) {
      setGroupOptions([]);
    }
  }, [openGroup]);

  useEffect(() => {
    const optionList = smartLocks.map(u => {
      return {
        value: u.id,
        label: u.title
      };
    });
    console.log(optionList);
    setSmartLockOptions(optionList);
    console.log(smartLockOptions);
  }, [smartLocks]);

  useEffect(() => {
    smartLockDispatch(getSmartLocks);
  }, []);

  const handleOnAdd = values => {
    const payload = {
      id: values.groupId.value,
      status: values.status,
      smartLockGroups: values.smartLocks.map(v => ({ smartLockId: v.value }))
    };
    groupDispatch(dispatch => addGroup(dispatch, payload));
  };

  return (
    <div>
      <Dialog
        open={isAddDialogOpened}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth>
        <DialogTitle id="form-dialog-title">
          <Grid container spacing={2}>
            <Grid item>
              <GroupAddIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h6">Add New Group</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              validateOnChange
              onSubmit={values => handleOnAdd(values)}>
              {formik => (
                <Form noValidate autoComplete="off">
                  <Field
                    name="groupId"
                    component={Autocomplete}
                    options={groupOptions}
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
                    options={smartLockOptions}
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
                      onClick={onAddDialogCancelClick}
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
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>{" "}
        </DialogContent>
      </Dialog>
    </div>
  );
};

AddDialog.propTypes = {
  onAddDialogCancelClick: PropTypes.func.isRequired,
  isAddDialogOpened: PropTypes.bool.isRequired
};

export default AddDialog;
