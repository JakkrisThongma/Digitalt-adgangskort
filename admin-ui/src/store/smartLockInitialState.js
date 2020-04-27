const smartLockInitialState = {
  smartLocks: [],
  smartLock: null,
  newSmartLock: null,
  smartLockId: null,
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
  deleteSucceed: false,
  addUserFailed: false,
  addUserSucceed: false,
  addGroupFailed: false,
  deleteGroupSucceed: false
};

export default smartLockInitialState;
