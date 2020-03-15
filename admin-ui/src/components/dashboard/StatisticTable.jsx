import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  title: {
    padding: theme.spacing(1),
    color: theme.palette.primary.main
  },
  table: {
    minWidth: 650
  }
}));

function createData(name, unlocksToday, unlocksMonth, unvalidAtempts, total) {
  return { name, unlocksToday, unlocksMonth, unvalidAtempts, total };
}

const rows = [
  createData("Lock 1", 159, 6.0, 24, 4.0),
  createData("Lock 2", 237, 9.0, 37, 4.3),
  createData("Lock 3", 262, 16.0, 24, 6.0),
  createData("Lock  4", 305, 3.7, 67, 4.3),
  createData("Lock 5", 356, 16.0, 49, 3.9)
];

const StatisticTable = () => {
  const classes = useStyles();

  return (
    <Paper>
      <Typography variant="body1" className={classes.title}>
        Statistic
      </Typography>
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Lock</TableCell>
              <TableCell align="center">Unlocks today</TableCell>
              <TableCell align="center">Unlocks last 30 days</TableCell>
              <TableCell align="center">Unvalid atempts</TableCell>
              <TableCell align="center">Total unlocks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.unlocksToday}</TableCell>
                <TableCell align="center">{row.unlocksMonth}</TableCell>
                <TableCell align="center">{row.unvalidAtempts}</TableCell>
                <TableCell align="center">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StatisticTable;
