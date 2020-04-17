import React from "react";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const SmartLocksSelector = props => {
  const { smartLocks, handleListOnChange } = props;
  return (
    <Autocomplete
      multiple
      id="smart-locks"
      filterSelectedOptions
      options={smartLocks}
      getOptionLabel={option => option.label}
      onChange={(event, val) => handleListOnChange(event, val)}
      getOptionSelected={(option, values) => option.key === values.key}
      renderInput={params => (
        <TextField
          {...params}
          label="Smart locks"
          fullWidth
          variant="outlined"
        />
      )}
    />
  );
};

SmartLocksSelector.propTypes = {
  smartLocks: PropTypes.array.isRequired,
  handleListOnChange: PropTypes.func.isRequired
};

export default SmartLocksSelector;
