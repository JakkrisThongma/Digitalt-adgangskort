import { useState, useEffect } from "react";
import validator from "./validator";

const UseFormValidation = (initialState = {}, callback) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [hasError, setHasError] = useState(true);

  useEffect(() => {
    const isNotEmpty = Object.values(values).every(x => x !== "");
    const noErrors = Object.keys(errors).length === 0;

    if (isNotEmpty && noErrors) {
      setHasError(false);
    } else {
      setHasError(true);
    }
  }, [errors]);

  const handleOnChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleListOnChange = (event, val) => {
    event.persist();
    setValues({
      ...values,
      accessGroups: val
    });
  };

  const handleOnBlur = event => {
    const validationErrors = validator.validate(event.target.name, values);
    setErrors(validationErrors);
  };
  const handleOnSubmit = event => {
    event.preventDefault();
    callback();
    setValues(initialState);
    setHasError(true);
  };

  return {
    handleOnChange,
    handleOnBlur,
    handleOnSubmit,
    handleListOnChange,
    values,
    hasError,
    errors
  };
};

export default UseFormValidation;
