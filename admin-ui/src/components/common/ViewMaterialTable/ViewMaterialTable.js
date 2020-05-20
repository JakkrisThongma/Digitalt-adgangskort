import React from "react";
import { Paper } from "@material-ui/core";
import EnhancedMaterialTable from "@/components/common/EnhancedMaterialTable";

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
