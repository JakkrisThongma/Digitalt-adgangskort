import React from "react";
import { Grid, Typography } from "@material-ui/core";

const NotFound = () => {
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
          <h1>The page was not found</h1>
        </Grid>
      </Grid>
    </>
  );
};

export default NotFound;
