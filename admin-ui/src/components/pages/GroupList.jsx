import React, {
  useEffect,
  useState,
  forwardRef,
  useCallback,
  useContext
} from "react";
import { Grid, Button, Tooltip, Toolbar } from "@material-ui/core";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import Delete from "@material-ui/icons/Delete";
import GroupAdd from "@material-ui/icons/GroupAdd";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Typography from "@material-ui/core/Typography";
import {
  Add,
  Group,
  Lock,
  PersonAdd,
  PersonAdd as PersonAddIcon
} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import {
  closeAddGroupDialog,
  closeDeleteGroupDialog,
  deleteGroup, getGroup,
  getGroups, getGroupSmartLocks, openAddGroupDialog,
  openDeleteGroupDialog, openEditGroupDialog, setSelectedGroupId
} from "../../actions/groupActions";
import groupReducer from "../../reducers/groupReducer";
import initialState from "../../store/initialState";
import useApiRequest from "../../reducers/useApiRequest";
import AddDialog from "../group/AddDialog";
import DeleteDialog from "../group/DeleteDialog";
import Store from "../../store";
import {GroupContext, SmartLockContext} from "../../store/Store";
import EditDialog from "../group/EditDialog";
import {getSmartLocks} from "../../actions/smartLockActions";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
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
  detailPanel: {
    maxHeight: 200,
    overflow: "auto"
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

const columns = [
  { title: "Group Id", field: "id", editable: "never", sorting: false },
  {
    title: "Display Name",
    field: "displayName",
    editable: "never",
    defaultSort: "asc"
  },
  {
    title: "Status",
    field: "status"
  },
  {
    title: "Creation Date",
    field: "creationDate",
    editable: "never",
    type: "datetime"
  }
];

const GroupList = () => {
  const classes = useStyles();
  const [groupState, groupDispatch] = useContext(GroupContext);
  const { groups, didInvalidate, loading, addDialogOpen, editDialogOpen ,deleteDialogOpen } = groupState;
  const [smartLockState, smartLockDispatch] = useContext(SmartLockContext);


  const handleAddGroupClick = () => {
    groupDispatch(openAddGroupDialog);
  };

  const handleEditGroupClick = groupId => {
    groupDispatch(dispatch => setSelectedGroupId(dispatch, groupId));
    groupDispatch(dispatch => getGroup(dispatch, groupId));
    groupDispatch(dispatch => getGroupSmartLocks(dispatch, groupId));
    smartLockDispatch(getSmartLocks);

    groupDispatch(openEditGroupDialog);
  };

  const handleDeleteGroupClick = groupId => {
    groupDispatch(dispatch => setSelectedGroupId(dispatch, groupId));
    groupDispatch(openDeleteGroupDialog);

  };


  useEffect(() => {
    groupDispatch(getGroups);
  }, []);

  useEffect(() => {
    if (didInvalidate) {
      groupDispatch(getGroups);
    }
  }, [didInvalidate]);

  return (
    <div className={classes.root}>
      <h1>Groups</h1>
      <Paper className={classes.paper}>
        <MaterialTable
          isLoading={loading}
          title=""
          columns={columns}
          data={groups}
          icons={tableIcons}
          actions={[
            {
              icon: AddBox,
              tooltip: "Add",
              onClick: () => handleAddGroupClick(),
              isFreeAction: true
            },
            {
              icon: Edit,
              tooltip: "Edit",
              onClick: (event, rowData) => handleEditGroupClick(rowData.id)
            },
            {
              icon: Delete,
              tooltip: "Delete",
              onClick: (event, rowData) => {
                handleDeleteGroupClick(rowData.id);
              }
            }
          ]}
          // onRowClick={(event, rowData, togglePanel) => { console.log(rowData); handleAddDialogClick()}}
          options={{
            actionsColumnIndex: -1,
            draggable: false
          }}
        />
        <AddDialog />
        <EditDialog />
        <DeleteDialog />

      </Paper>
    </div>
  );
};

export default GroupList;
