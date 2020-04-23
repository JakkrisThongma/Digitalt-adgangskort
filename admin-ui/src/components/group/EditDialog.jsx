import React, { useContext, useEffect, useState } from "react";
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
import {
  addGroup,
  closeAddGroupDialog,
  closeEditGroupDialog,
  getGroup
} from "../../actions/groupActions";
import useApiRequest from "../../reducers/useApiRequest";
import azureAdReducer from "../../reducers/azureAdReducer";
import initialState from "../../store/initialState";
import { getAzureAdGroups } from "../../actions/azureAdActions";
import smartLockReducer from "../../reducers/smartLockReducer";
import { getSmartLocks } from "../../actions/smartLockActions";
import groupReducer from "../../reducers/groupReducer";
import {
  AzureAdContext,
  GroupContext,
  SmartLockContext
} from "../../store/Store";

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
  groupId: string(),
  smartLocks: array()
});

const statusOptions = [
  { value: "inactive", label: "Inactive" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" }
];

const EditDialog = props => {
  const classes = useStyles();

  const [azureAdState, azureAdDispatch] = useContext(AzureAdContext);
  const { azureAdGroups, azureAdError } = azureAdState;

  const [groupState, groupDispatch] = useContext(GroupContext);
  const {
    group,
    groupError,
    groupSmartLocks,
    loading: groupLoading,
    selectedGroupId,
    editDialogOpen
  } = groupState;

  const [openGroup, setOpenGroup] = useState(false);
  const [formData, setFormData] = useState({});
  const [groupOptions, setGroupOptions] = useState([]);
  // const groupLoading = openGroup && groupOptions.length === 0;

  const [smartLockState, smartLockDispatch] = useContext(SmartLockContext);
  const { smartLocks, smartLockError } = smartLockState;
  const [smartLockOptions, setSmartLockOptions] = useState([]);
  const [smartLockValues, setSmartLockValues] = useState(groupSmartLocks);

  useEffect(() => {
    setFormData({
      ...formData,
      groupId: group ? group.displayName : "",
      status: group ? group.status.toLowerCase() : "inactive"
    });
    setGroupOptions([group]);
  }, [group]);

  useEffect(() => {
    setSmartLockOptions(smartLocks);
  }, [smartLocks]);


  useEffect(() => {
    setSmartLockValues(groupSmartLocks);
  }, [groupSmartLocks]);

  const handleCancelClick = () => {
    groupDispatch(closeEditGroupDialog);
  };

  const handleAddClick = values => {
    const payload = {
      id: values.groupId.value,
      status: values.status,
      smartLockGroups: values.smartLocks.map(v => ({ smartLockId: v.value }))
    };
    groupDispatch(dispatch => addGroup(dispatch, payload));
    if (groupError) {
      console.log(groupError);
    }
    groupDispatch(closeEditGroupDialog);
  };

  const onListChange = val => {
    setSmartLockValues(val);

    console.log("val", val);
    console.log("smartLockValues", smartLockValues);
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
              <GroupAddIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h6">Edit Group</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div>
            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              validateOnChange
              onSubmit={values => handleAddClick(values)}>
              {formik => (
                <Form noValidate autoComplete="off">
                  <Field
                    name="groupId"
                    component={Autocomplete}
                    disabled
                    getOptionLabel={option => option.displayName}
                    options={groupOptions}
                    value={group ? groupOptions[0] : null}
                    size="small"
                    textFieldProps={{
                      label: "Azure AD group",
                      required: true,
                      variant: "outlined"
                    }}
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
                    options={smartLockOptions}
                    onChange={(e, v) => onListChange(v)}
                    value={smartLockValues}
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
                      disabled={!formik.dirty}
                      type="submit">
                      Edit
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </div>
          <Backdrop className={classes.backdrop} open={groupLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </DialogContent>
      </Dialog>
    </div>
  );
};

EditDialog.propTypes = {};

export default EditDialog;
