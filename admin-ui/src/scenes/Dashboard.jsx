import React, { useContext, useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TotalCount, LastActivity } from "@/components/dashboard";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import EnhancedMaterialTable from "@/components/EnhancedMaterialTable";
import { Refresh } from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import { getSmartLocks } from "@/actions/smartLockActions";
import getAccessLog from "@/actions/accessLogActions";
import {
  accessLogContext,
  groupContext,
  smartLockContext,
  userContext
} from "@/store";
import useDidMountEffect from "@/extensions/useDidMountEffect";
import { getUsers } from "@/actions/userActions";
import { getGroups } from "@/actions/groupActions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  paper: {
    marginBottom: theme.spacing(3)
  }
}));

const accessLogColumns = [
  {
    title: "Log ID",
    field: "id",
    sorting: false,
    hidden: true,
    searchable: true
  },
  {
    title: "Smart lock ID",
    field: "smartLockId",
    sorting: false,
    hidden: true,
    searchable: true
  },
  {
    title: "User ID",
    field: "userId",
    sorting: false,
    hidden: true,
    searchable: true
  },
  {
    title: "Group ID",
    field: "groupId",
    sorting: false,
    hidden: true,
    searchable: true
  },

  {
    title: "Smart lock",
    field: "smartLockTitle"
  },
  {
    title: "User name",
    field: "userName"
  },
  {
    title: "Access",
    field: "isValid"
  },
  {
    title: "Info",
    field: "info"
  },
  {
    title: "Time",
    field: "time",
    type: "datetime"
  }
];
const Dashboard = () => {
  const classes = useStyles();

  const [accessLogState, accessLogDispatch] = useContext(accessLogContext);
  const { accessLog, loading } = accessLogState;
  const [userState, userDispatch] = useContext(userContext);
  const { users } = userState;
  const [groupState, groupDispatch] = useContext(groupContext);
  const { groups } = groupState;
  const [smartLockState, smartLockDispatch] = useContext(smartLockContext);
  const { smartLocks } = smartLockState;
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    accessLogDispatch(getAccessLog);
    userDispatch(getUsers);
    groupDispatch(getGroups);
    smartLockDispatch(getSmartLocks);
  }, []);

  useDidMountEffect(() => {
    const data = accessLog.map(({ isValid, ...log }) => ({
      ...log,
      isValid: isValid ? "Valid" : "Invalid"
    }));
    setTableData(data);
  }, [accessLog]);

  const handleRefreshClick = (event) => {
    event.stopPropagation();
    accessLogDispatch(getAccessLog);
  };
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
          <TotalCount
            title="Total users"
            total={users.length}
            iconTitle="People"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TotalCount
            title="Total groups"
            total={groups.length}
            iconTitle="AccountTree"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TotalCount
            title="Total smart locks"
            total={smartLocks.length}
            iconTitle="Lock"
          />
        </Grid>
        <Grid item xs={12}>
          <EnhancedMaterialTable
            isLoading={loading}
            columns={accessLogColumns}
            data={tableData}
            actions={[
              {
                icon: () => <Refresh fontSize="large" />,
                tooltip: "Refresh",
                onClick: (event) => handleRefreshClick(event),
                isFreeAction: true
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
