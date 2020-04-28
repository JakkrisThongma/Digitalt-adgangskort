import React from "react";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import tableIcons from "./MaterialTableIcons";
import EnhancedMaterialTable from "./EnhancedMaterialTable";

const ViewMaterialTable = props => {
  return (
    <EnhancedMaterialTable
      {...props}
      components={{
        Container: props => <Paper {...props} elevation={0} />
      }}
    />
  );
};

export default ViewMaterialTable;
