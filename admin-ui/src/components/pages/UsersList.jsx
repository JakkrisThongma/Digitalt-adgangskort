import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox
} from "@material-ui/core";

import {
  TableToolbar,
  TableHeader,
  AddUserDialog
} from "@/components/usersList";
import initialState from "../../data/initialState";

import { getUsers } from "../../actions/userActions";
import useApiRequest from "../../reducers/useApiRequest";
import userReducer from "../../reducers/userReducer";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  { id: "id", numeric: false, disablePadding: false, label: "ID" },
  {
    id: "firstName",
    numeric: false,
    disablePadding: false,
    label: "First name"
  },
  { id: "lastName", numeric: false, disablePadding: false, label: "Last name" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  { id: "created", numeric: false, disablePadding: false, label: "Created" },
  {
    id: "lastModified",
    numeric: false,
    disablePadding: false,
    label: "lastModified"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(3)
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

const UsersList = () => {
  const [state, dispatch] = useApiRequest(userReducer, initialState);
  const { users, didInvalidate } = state;
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("givenName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [openAddUser, setOpenAddUser] = React.useState(false);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleAddUserClick = () => {
    setOpenAddUser(true);
  };
  const handleAddUserCancelClick = () => {
    setOpenAddUser(false);
  };

  useEffect(() => {
    dispatch(getUsers);
  }, []);

  useEffect(() => {
    setRows(users);
    console.log(state);
  }, [state]);

  useEffect(() => {
    if (didInvalidate) {
      dispatch(getUsers);
    }
  }, [didInvalidate]);

  return (
    <div className={classes.root}>
      <h1>Users</h1>

      <Paper className={classes.paper}>
        <TableToolbar
          numSelected={selected.length}
          onAddUserClick={handleAddUserClick}
          onAddUserCancelClick={handleAddUserCancelClick}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table">
            <TableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.givenName}</TableCell>
                      <TableCell align="center">{row.sureName}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">{row.creationDate}</TableCell>
                      <TableCell align="center">
                        {row.modificationDate}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <AddUserDialog
          isAddUserOpened={openAddUser}
          onAddUserCancelClick={handleAddUserCancelClick}
        />
      </Paper>
    </div>
  );
};

export default UsersList;
