import {
  getSmartLock,
  addSmartLock,
  getSmartLocks,
  deleteSmartLock,
  updateSmartLock,
  addSmartLockUser,
  addUser,
  addSmartLockGroup,
  addGroup,
  deleteSmartLockUser,
  deleteUser,
  deleteSmartLockGroup,
  deleteGroup,
  getSmartLockUsers,
  getSmartLockGroups,
  getAzureAdUsers,
  getAzureAdGroups
} from "../../services/api";
import helpers from "../../helpers";

const { extractIdList } = helpers;
let firstUserFromAzureAd;
let secondUserFromAzureAd;
let firstGroupFromAzureAd;
let secondGroupFromAzureAd;
let smartLockCount;
let firstSmartLock;
let secondSmartLock;
let users;
let updatedUsers;
let firstUser;
let secondUser;
let groups;
let updatedGroups;
let firstGroup;
let secondGroup;
const context = {
  azureAd: {
    groups: {
      all: [],
      first: null,
      second: null
    },
    users: {
      all: [],
      first: null,
      second: null
    }
  },
  groups: {
    all: [],
    updated: [],
    first: null,
    second: null
  },
  users: {
    all: [],
    updated: [],
    first: null,
    second: null
  },
  smartLocks: {
    count: 0,
    first: null,
    second: null
  }
};

describe("Setup", function() {
  it("should set tests data", async function(done) {
    const azureAdUsers = await getAzureAdUsers();
    [firstUserFromAzureAd, secondUserFromAzureAd] = await azureAdUsers.data;

    const azureAdGroups = await getAzureAdGroups();
    [firstGroupFromAzureAd, secondGroupFromAzureAd] = await azureAdGroups.data;

    const smartLocks = await getSmartLocks();
    smartLockCount = await smartLocks.data.length;

    const addFirstUser = await addUser({ id: firstUserFromAzureAd.id });
    firstUser = await addFirstUser.data;
    try {
      const addSecondUser = await addUser({ id: secondUserFromAzureAd.id });
      secondUser = await addSecondUser.data;
      users = await extractIdList([firstUser, secondUser], "userId");
      updatedUsers = await [users[0]];

      const addFirstGroup = await addGroup({ id: firstGroupFromAzureAd.id });
      firstGroup = await addFirstGroup.data;
      const addSecondGroup = await addGroup({ id: secondGroupFromAzureAd.id });
      secondGroup = await addSecondGroup.data;
      groups = await extractIdList([firstGroup, secondGroup], "groupId");
      updatedGroups = await [groups[0]];
      return done();
    } catch (e) {
      console.log(e);
      return done();
    }
  });
});

// Create smartLocks
describe("Create smart locks", function() {
  const firstSmartLockPayload = {
    title: "smart lock title",
    description: "smart lock description",
    manufactureId: "smart lock manufactureId",
    status: "Active"
  };

  it("should create smart lock", async done => {
    const response = await addSmartLock(firstSmartLockPayload);
    firstSmartLock = response.data;
    expect(response.status).toBe(201);
    expect(firstSmartLock.title).toBe(firstSmartLockPayload.title);
    expect(firstSmartLock.description).toBe(firstSmartLockPayload.description);
    expect(firstSmartLock.manufactureId).toBe(
      firstSmartLockPayload.manufactureId
    );
    expect(firstSmartLock.status).toBe(firstSmartLockPayload.status);
    return done();
  });

  it("should create smart lock with list of groups and users", async function(done) {
    const secondSmartLockPayload = {
      title: "smart lock title",
      description: "smart lock description",
      manufactureId: "smart lock manufactureId",
      status: "Active",
      smartLockUsers: users,
      smartLockGroups: groups
    };
    const response = await addSmartLock(secondSmartLockPayload);
    secondSmartLock = response.data;
    expect(response.status).toBe(201);
    expect(secondSmartLock.title).toBe(secondSmartLockPayload.title);
    expect(secondSmartLock.description).toBe(
      secondSmartLockPayload.description
    );
    expect(secondSmartLock.manufactureId).toBe(
      secondSmartLockPayload.manufactureId
    );
    expect(secondSmartLock.status).toBe(secondSmartLockPayload.status);
    return done();
  });

  it("should confirm smart lock groups and users created successfully", async function(done) {
    const groupsResponse = await getSmartLockGroups(secondSmartLock.id);
    expect(groupsResponse.status).toBe(200);
    expect(groupsResponse.data).toHaveLength(groups.length);

    const usersResponse = await getSmartLockUsers(secondSmartLock.id);
    expect(usersResponse.status).toBe(200);
    expect(groupsResponse.data).toHaveLength(users.length);

    return done();
  });

  it("should get list of smart locks to confirm the created smart locks persisted in the list", async function(done) {
    const response = await getSmartLocks();
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(smartLockCount + 2);
    return done();
  });
});

// Update smartLock
describe("Update smartLock", function() {
  let smartLockToUpdate;
  const statusUpdatePayload = [
    {
      value: "Inactive",
      path: "/status",
      op: "replace"
    }
  ];

  it("should get smartLock to update", async function(done) {
    const response = await getSmartLock(firstSmartLock.id);
    smartLockToUpdate = response.data;
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(firstSmartLock.id);
    return done();
  });

  it("should update smartLock", async function(done) {
    const response = await updateSmartLock(
      smartLockToUpdate.id,
      statusUpdatePayload
    );
    expect(response.status).toBe(204);
    return done();
  });

  it("should update smart lock list for smartLock", async function(done) {
    const smartLocksUpdatePayload = [
      {
        value: updatedUsers,
        path: "/smartLockUsers",
        op: "replace"
      },
      {
        value: updatedGroups,
        path: "/smartLockGroups",
        op: "replace"
      }
    ];
    const response = await updateSmartLock(
      smartLockToUpdate.id,
      smartLocksUpdatePayload
    );
    expect(response.status).toBe(204);
    return done();
  });
  it("should confirm smartLock status updated successfully ", async function(done) {
    const response = await getSmartLock(firstSmartLock.id);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(firstSmartLock.id);
    expect(response.data.status).toBe(statusUpdatePayload[0].value);
    return done();
  });

  it("should confirm smartLock smart locks updated successfully ", async function(done) {
    const usersResponse = await getSmartLockUsers(firstSmartLock.id);
    expect(usersResponse.status).toBe(200);
    expect(usersResponse.data).toHaveLength(updatedUsers.length);

    const groupsResponse = await getSmartLockUsers(firstSmartLock.id);
    expect(groupsResponse.status).toBe(200);
    expect(groupsResponse.data).toHaveLength(updatedGroups.length);
    return done();
  });
});

// Delete smartLock
describe("Delete smartLock", function() {
  let smartLockToDelete;
  it("Get smartLock to delete", async function(done) {
    const response = await getSmartLock(firstSmartLock.id);
    smartLockToDelete = response.data;
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(firstSmartLock.id);
    return done();
  });

  it("should delete smartLock", async function(done) {
    const response = await deleteSmartLock(firstSmartLock.id);
    expect(response.status).toBe(204);
    return done();
  });
  it("should confirm smartLock deleted successfully", async function(done) {
    try {
      await getSmartLock(firstSmartLock.id);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
    return done();
  });
});

describe("Tear down", function() {
  it("should delete added data from database", async function(done) {
    try {
      await deleteGroup(firstGroup.id);
      await deleteGroup(secondGroup.id);
      await deleteUser(firstUser.id);
      await deleteUser(secondUser.id);
      await deleteSmartLock(secondSmartLock.id);
    } catch (e) {
      console.log(e);
    }

    return done();
  });
});
