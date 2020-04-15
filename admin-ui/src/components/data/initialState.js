const initialState = {
  error: null,
  loading: false,
  users: [],
  groups: [],
  smartLocks: [],
  currentUser: {
    userGroups: [],
    userSmartLocks: []
  },

  currentGroup: {
    groupUsers: [],
    groupSmartLocks: []
  },
  currentSmartLock: {
    smartLockUsers: [],
    smartLockGroups: []
  }
};

export default initialState;
