import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  TextField,
  Button
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { PersonAdd as PersonAddIcon } from "@material-ui/icons";
import useFormValidation from "validation/useFormValidation";
import SmartLocksSelector from "./SmartLocksSelector";
import AzureAdUserSelector from "./AzureAdUserSelector";

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

  chip: {
    margin: theme.spacing(0.5)
  },
  button: { marginBottom: theme.spacing(2), minWidth: 80 }
}));

const statusOptions = ["Inactive", "Active", "Suspended"];
const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  smartLocks: []
};

const AddUserDialog = props => {
  const classes = useStyles();
  const { isAddUserOpened, onAddUserCancelClick } = props;

  const {
    handleOnBlur,
    handleOnChange,
    handleOnSubmit,
    handleListOnChange,
    values,
    hasError,
    errors
  } = useFormValidation(INITIAL_STATE, login);

  function login() {
    console.log("No errors, submited!");
    console.log(values.smartLocks);
    console.log(values.email);

    onAddUserCancelClick();
  }

  return (
    <div>
      <Dialog
        open={isAddUserOpened}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth>
        <DialogTitle id="form-dialog-title">
          <Grid container spacing={2}>
            <Grid item>
              <PersonAddIcon fontSize="large" />
            </Grid>
            <Grid item>
              <Typography variant="h6">Add New User</Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <div>
            <form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AzureAdUserSelector />
                </Grid>

                <Grid item xs={12}>
                  <Autocomplete
                    id="user-status"
                    options={statusOptions}
                    defaultValue={statusOptions[0]}
                    getOptionLabel={option => option}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Status"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SmartLocksSelector handleListOnChange={handleListOnChange} />
                </Grid>
              </Grid>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            variant="contained"
            onClick={onAddUserCancelClick}
            color="primary">
            Cancel
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={hasError}
            onClick={handleOnSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddUserDialog.propTypes = {
  onAddUserCancelClick: PropTypes.func.isRequired,
  isAddUserOpened: PropTypes.bool.isRequired
};

export default AddUserDialog;
