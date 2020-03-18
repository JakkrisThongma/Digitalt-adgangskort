import React from "react";
import {
  Paper,
  Avatar,
  Button,
  TextField,
  Typography,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LockOutlined } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "90%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(5, 0, 5)
  }
}));
const Login = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => e.preventDefault()}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
export default Login;
