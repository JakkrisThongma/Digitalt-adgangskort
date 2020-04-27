const groupInitialState = {
  groups: [],
  group: null,
  newGroup: null,
  selectedGroupId: null,
  groupUsers: [],
  groupSmartLocks: [],
  loading: false,
  didInvalidate: false,
  error: null,
  addFailed: false,
  addSucceed: false,
  updateFailed: false,
  updateSucceed: false,
  deleteFailed: false,
  deleteSucceed: false,
  addDialogOpen: false,
  editDialogOpen: false,
  deleteDialogOpen: false,
  viewDialogOpen: false
};

export default groupInitialState;
