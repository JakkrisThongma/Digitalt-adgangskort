import React from "react";
import MaterialTable from "material-table";
import tableIcons from "@/components/common/MaterialTableIcons";

const EnhancedMaterialTable = ({ title, ...rest }) => {
  return (
    <MaterialTable
      {...rest}
      title={title || ""}
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
        draggable: false,
        exportButton: true,
        sorting: true
      }}
      localization={{ body: { emptyDataSourceMessage: "No data to display" } }}
    />
  );
};

export default EnhancedMaterialTable;
