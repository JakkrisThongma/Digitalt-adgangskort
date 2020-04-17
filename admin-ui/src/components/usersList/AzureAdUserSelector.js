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
  const { azureAdUsers, error } = state;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    const x = azureAdUsers.map(u => `${u.surname}, ${u.givenName}`);
    setOptions(x);
    console.log("options: ", options);
  }, [azureAdUsers]);

  React.useEffect(() => {
    if (!loading) {
      console.log("not loading");
      return undefined;
    }
    dispatch(getAzureAdUsers);
  }, [loading]);

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
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={option => option}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Azure Ad user"
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
}
