import React from "react";
import MaterialTable from "material-table";
import tableIcons from "@/components/MaterialTableIcons";

const EnhancedMaterialTable = props => {
  return (
    <MaterialTable
      {...props}
      title=""
      icons={tableIcons}
      options={{
        actionsColumnIndex: -1,
        draggable: false
      }}
    />
  );
};

export default EnhancedMaterialTable;
