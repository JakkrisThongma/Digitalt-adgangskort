const userInitialState = {
  users: [],
  user: null,
  newUser: null,
  selectedUserId: null,
  userGroups: [],
  userSmartLocks: [],
  currentAuthenticatedUser: null,
  loading: false,
  didInvalidate: false,
  error: null,
  addFailed: false,
  addSucceed: false,
  updateFailed: false,
  updateSucceed: false,
  deleteFailed: false
};

export default userInitialState;
