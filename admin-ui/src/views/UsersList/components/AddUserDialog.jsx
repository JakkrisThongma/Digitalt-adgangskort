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
import AccessGroupSelector from "./AccessGroupSelector";

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

const AddUserDialog = props => {
  const classes = useStyles();

  const { isAddUserOpened, onAddUserCancelClick } = props;

  const accessGroup = [
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
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
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
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm-password"
                    label="confirm password"
                    type="password"
                    id="confirm-password"
                    autoComplete="confirm-password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <AccessGroupSelector accessGroup={accessGroup} />
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
            onClick={onAddUserCancelClick}
            color="primary">
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
