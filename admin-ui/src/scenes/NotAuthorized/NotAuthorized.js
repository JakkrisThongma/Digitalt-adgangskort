import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import { authContext } from "@/services/auth";
import { userContext } from "@/store";
import { getCurrentUserAccessLevel } from "@/actions/userActions";

const NotAuthorized = () => {
  const history = useHistory();
  const [userState, userDispatch] = useContext(userContext);
  const { currentUserAccessLevel } = userState;

  useEffect(() => {
    userDispatch(getCurrentUserAccessLevel);
    if (currentUserAccessLevel === "admin") history.push("/dashboard");
  }, [currentUserAccessLevel]);
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "70vh" }}>
        <Grid item xs={12}>
          <h1>Your are not authorized</h1>
        </Grid>

        <Grid item xs={12}>
          <Typography>Only admin users can view this page</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => authContext.logOut()}>
            Try another account
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NotAuthorized;
