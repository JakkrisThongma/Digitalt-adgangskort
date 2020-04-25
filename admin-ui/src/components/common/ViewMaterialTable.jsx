import React from "react";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import tableIcons from "./MaterialTableIcons";

const ViewMaterialTable = props => {
  return (
    <MaterialTable
      {...props}
      title=""
      icons={tableIcons}
      components={{
        Container: props => <Paper {...props} elevation={0}/>
      }}
      options={{
        actionsColumnIndex: -1,
        draggable: false,
        paging: false
      }}
    />
  );
};

export default ViewMaterialTable;
