const nameRegx = /^[a-zA-ZæøåÆØÅ]+(([',. -][a-zæøåA-ZÆØÅ ])?[a-zæøåA-ZÆØÅ]*)*$/i;
const emailRegx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const mobileRegx = /^[\d]{8}$/;
const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;

const validationRules = {
  firstName: {
    missingErrorMessage: "First name is requried",
    pattern: nameRegx,
    patternErrorMessage: "First name can contain only letters"
  },
  lastName: {
    missingErrorMessage: "Last name is requried",
    pattern: nameRegx,
    patternErrorMessage: "Last name can contain only letters"
  },
  email: {
    missingErrorMessage: "Email  is requried",
    pattern: emailRegx,
    patternErrorMessage: "Invalid email address"
  },
  mobile: {
    missingErrorMessage: "Mobile  is requried",
    pattern: mobileRegx,
    patternErrorMessage: "Mobile number should be 8 digits"
  },
  password: {
    missingErrorMessage: "password is requried",
    pattern: passwordRegx,
    patternErrorMessage:
      "Password must be 8 characters, have at least one letter and one number"
  },
  confirmPassword: {
    missingErrorMessage: "Confirm password is requried",
    pattern: passwordRegx,
    patternErrorMessage: "Your passwords don't match"
  }
};

export default validationRules;
