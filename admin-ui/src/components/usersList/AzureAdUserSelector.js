// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import useApiRequest from "../../reducers/useApiRequest";
import initialState from "../../data/initialState";
import azureAdReducer from "../../reducers/azureAdReducer";
import { getAzureAdUsers } from "../../actions/azureAdActions";


export default function AzureAdUserSelector() {
  const [state, dispatch] = useApiRequest(azureAdReducer, initialState);
  const { azureAdUsers, loading } = state;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  // const loading = open && options.length === 0;

  useEffect(() => {
    dispatch(getAzureAdUsers);
  }, []);

  useEffect(() => {
    setOptions(azureAdUsers);
    console.log(state);
  }, [azureAdUsers]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="azure-ad-user"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Azure Ad user"
          variant="outlined"
          fullWidth
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
}
