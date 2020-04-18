import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import useApiRequest from "../../reducers/useApiRequest";
import initialState from "../../data/initialState";
import smartLockReducer from "../../reducers/smartLockReducer";
import { getSmartLocks } from "../../actions/smartLockActions";

const SmartLocksSelector = props => {
  const { handleListOnChange } = props;
  const [state, dispatch] = useApiRequest(smartLockReducer, initialState);
  const { smartLocks, error } = state;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    const optionList = smartLocks.map(u => {
      return {
        id: u.id,
        value: u.title
      };
    });
    setOptions(optionList);
  }, [smartLocks]);

  React.useEffect(() => {
    if (!loading) {
      return undefined;
    }
    dispatch(getSmartLocks);
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);
  return (
    <Autocomplete
      multiple
      id="smart-locks"
      filterSelectedOptions
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onChange={(event, value) => console.log(value)}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.value === value.value}
      getOptionLabel={option => option.value}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Smart lock(s)"
          variant="outlined"
          fullWidth
          error={error && true}
          helperText={error && "Something went wrong. Try again later"}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
};

SmartLocksSelector.propTypes = {
  handleListOnChange: PropTypes.func.isRequired
};

export default SmartLocksSelector;
