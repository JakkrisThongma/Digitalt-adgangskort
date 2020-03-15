import React from "react";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const AccessGroupSelector = props => {
  const { accessGroups, handleListOnChange } = props;
  return (
    <Autocomplete
      multiple
      id="access-groups"
      filterSelectedOptions
      options={accessGroups}
      getOptionLabel={option => option.label}
      onChange={(event, val) => handleListOnChange(event, val)}
      getOptionSelected={(option, values) => option.key === values.key}
      renderInput={params => (
        <TextField
          {...params}
          label="Access groups"
          fullWidth
          variant="outlined"
        />
      )}
    />
  );
};

AccessGroupSelector.propTypes = {
  accessGroups: PropTypes.array.isRequired,
  handleListOnChange: PropTypes.func.isRequired
};

export default AccessGroupSelector;
