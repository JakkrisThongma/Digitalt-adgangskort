import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  TotalCount,
  StatisticTable,
  LastActivity
} from "@/components/dashboard";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  paper: {
    marginBottom: theme.spacing(3),
  }
}));
const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Breadcrumbs aria-label="breadcrumb">
          <Breadcrumbs aria-label="breadcrumb">
            <Button component={RouterLink} to="/dashboard">
              Dashboard
            </Button>
          </Breadcrumbs>
        </Breadcrumbs>
      </div>
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
