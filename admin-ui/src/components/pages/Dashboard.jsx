import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  TotalCount,
  StatisticTable,
  LastActivity
} from "src/components/dashboard";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));
const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Dashboard</h1>
      <Grid container spacing={4} justify="space-between">
        <Grid item md={4} xs={12}>
          <TotalCount title="Active users" total={199} iconTitle="People" />
        </Grid>
        <Grid item md={4} xs={12}>
          <TotalCount title="Active locks" total={10} iconTitle="Lock" />
        </Grid>
        <Grid item md={4} xs={12}>
          <TotalCount
            title="Active access group"
            total={3}
            iconTitle="AccountTree"
          />
        </Grid>
        <Grid item lg={8} md={12} xs={12}>
          <StatisticTable />
        </Grid>
        <Grid item lg={4} md={12} xs={12}>
          <LastActivity />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
