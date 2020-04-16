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
import { makeStyles } from "@material-ui/core/styles";
import { PersonAdd as PersonAddIcon } from "@material-ui/icons";
import useFormValidation from "validation/useFormValidation";
import GroupSelector from "./GroupSelector";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    margin: theme.spacing(3, 0, 3)
  },

  chip: {
    margin: theme.spacing(0.5)
  },
  button: { marginBottom: theme.spacing(2), minWidth: 80 }
}));

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  accessGroups: []
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
    console.log(values.accessGroups);
    console.log(values.email);

    onAddUserCancelClick();
  }
  const accessGroups = [
    { key: 0, label: "Guest spaces" },
    { key: 1, label: "Employee spaces" },
    { key: 2, label: "Developer spaces" },
    { key: 3, label: "Full access" }
  ];
  return (
    <div>
      <Dialog open={isAddUserOpened} aria-labelledby="form-dialog-title">
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.firstName && true}
                    value={values.firstName}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    helperText={errors.firstName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.lastName && true}
                    value={values.lastName}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    helperText={errors.lastName}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.email && true}
                    value={values.email}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    helperText={errors.email}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.mobile && true}
                    value={values.mobile}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    helperText={errors.mobile}
                    variant="outlined"
                    required
                    fullWidth
                    name="mobile"
                    label="Mobile"
                    id="mobile"
                    autoComplete="mobile"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password && true}
                    value={values.password}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    helperText={errors.password}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.confirmPassword && true}
                    value={values.confirmPassword}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    helperText={errors.confirmPassword}
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="confirm password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirmPassword"
                  />
                </Grid>

                <Grid item xs={12}>
                  <GroupSelector
                    accessGroups={accessGroups}
                    handleListOnChange={handleListOnChange}
                  />
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
