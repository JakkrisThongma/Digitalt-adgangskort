import React from "react";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Chip, TextField } from "@material-ui/core";

const AccessGroupSelector = props => {
  const { accessGroup } = props;
  return (
    <Autocomplete
      multiple
      id="access-groups"
      options={accessGroup}
      getOptionLabel={option => option.label}
      defaultValue={[accessGroup[1]]}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip label={option.label} {...getTagProps({ index })} />
        ))
      }
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

AccessGroupSelector.propTypes = { accessGroup: PropTypes.array.isRequired };

export default AccessGroupSelector;
