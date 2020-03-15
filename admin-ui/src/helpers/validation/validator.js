import validationRules from "./validationRules";

let errors = {};
const validate = (value, pattern) => pattern.test(value);

const validator = {
  validate: (validationType, value) => {
    if (value[validationType] === "") {
      errors = {
        ...errors,
        [validationType]: validationRules[validationType].missingErrorMessage
      };
    } else if (
      !validate(value[validationType], validationRules[validationType].pattern)
    ) {
      errors = {
        ...errors,
        [validationType]: validationRules[validationType].patternErrorMessage
      };
    } else {
      const { [validationType]: _, ...newErrors } = errors;
      delete errors[validationType];

      return newErrors;
    }
    return errors;
  }
};
export default validator;
