const smartLockInitialState = {
  smartLocks: [],
  smartLock: null,
  newSmartLock: null,
  selectedSmartLockId: null,
  newSmartLockUser: null,
  newSmartLockGroup: null,
  smartLockUsers: [],
  smartLockGroups: [],
  loading: false,
  didInvalidate: false,
  error: null,
  addFailed: false,
  addSucceed: false,
  updateFailed: false,
  updateSucceed: false,
  deleteFailed: false,
  deleteSucceed: false
};

export default smartLockInitialState;
