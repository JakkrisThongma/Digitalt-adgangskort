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
  getAzureAdGroups,
  getSmartLockUser
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

describe("Setup", function() {
  it("should set tests data", async function(done) {
    try {
      const azureAdUsers = await getAzureAdUsers();
      [firstUserFromAzureAd, secondUserFromAzureAd] = await azureAdUsers.data;

      const azureAdGroups = await getAzureAdGroups();
      [
        firstGroupFromAzureAd,
        secondGroupFromAzureAd
      ] = await azureAdGroups.data;

      const smartLocks = await getSmartLocks();
      smartLockCount = await smartLocks.data.length;

      const addFirstUser = await addUser({ id: firstUserFromAzureAd.id });
      firstUser = await addFirstUser.data;
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
    } catch (e) {
      console.log(e);
    }
    return done();
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
    try {
      const response = await addSmartLock(firstSmartLockPayload);
      firstSmartLock = response.data;
      expect(response.status).toBe(201);
      expect(firstSmartLock.title).toBe(firstSmartLockPayload.title);
      expect(firstSmartLock.description).toBe(
        firstSmartLockPayload.description
      );
      expect(firstSmartLock.manufactureId).toBe(
        firstSmartLockPayload.manufactureId
      );
      expect(firstSmartLock.status).toBe(firstSmartLockPayload.status);
    } catch (e) {
      console.log(e);
    }
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
    try {
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
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should confirm smart lock groups and users created successfully", async function(done) {
    try {
      const groupsResponse = await getSmartLockGroups(secondSmartLock.id);
      expect(groupsResponse.status).toBe(200);
      expect(groupsResponse.data).toHaveLength(groups.length);

      const usersResponse = await getSmartLockUsers(secondSmartLock.id);
      expect(usersResponse.status).toBe(200);
      expect(groupsResponse.data).toHaveLength(users.length);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should get list of smart locks to confirm the created smart locks persisted in the list", async function(done) {
    try {
      const response = await getSmartLocks();
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(smartLockCount + 2);
    } catch (e) {
      console.log(e);
    }
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
    try {
      const response = await getSmartLock(secondSmartLock.id);
      smartLockToUpdate = response.data;
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(secondSmartLock.id);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should update smartLock", async function(done) {
    try {
      const response = await updateSmartLock(
        smartLockToUpdate.id,
        statusUpdatePayload
      );
      expect(response.status).toBe(204);
    } catch (e) {
      console.log(e);
    }
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
    try {
      const response = await updateSmartLock(
        smartLockToUpdate.id,
        smartLocksUpdatePayload
      );
      expect(response.status).toBe(204);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
  it("should confirm smartLock status updated successfully ", async function(done) {
    try {
      const response = await getSmartLock(secondSmartLock.id);
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(secondSmartLock.id);
      expect(response.data.status).toBe(statusUpdatePayload[0].value);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should confirm smartLock smart locks updated successfully ", async function(done) {
    try {
      const usersResponse = await getSmartLockUsers(secondSmartLock.id);
      expect(usersResponse.status).toBe(200);
      expect(usersResponse.data).toHaveLength(updatedUsers.length);

      const groupsResponse = await getSmartLockGroups(secondSmartLock.id);
      expect(groupsResponse.status).toBe(200);
      expect(groupsResponse.data).toHaveLength(updatedGroups.length);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

// Add smartLock user
describe("Add smartLock user", function() {
  let smartLockUsers = [];

  it("should get  smart lock users", async function(done) {
    try {
      const usersResponse = await getSmartLockUsers(firstSmartLock.id);
      smartLockUsers = usersResponse.data;

      expect(usersResponse.status).toBe(200);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should add smart lock user", async function(done) {
    try {
      const response = await addSmartLockUser(firstSmartLock.id, {
        userId: firstUser.id
      });
      expect(response.status).toBe(201);
      expect(response.data.userId).toBe(firstUser.id);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should get smart lock users to confirm user added successfully", async function(done) {
    try {
      const usersResponse = await getSmartLockUsers(firstSmartLock.id);
      expect(usersResponse.status).toBe(200);
      expect(usersResponse.data).toHaveLength(smartLockUsers.length + 1);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

// Remove smartLock user
describe("Add smartLock user", function() {
  it("should remove smartLock user", async function(done) {
    try {
      const response = await deleteSmartLockUser(
        firstSmartLock.id,
        firstUser.id
      );
      expect(response.status).toBe(204);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should confirm smart lock user deleted successfully", async function(done) {
    try {
      await getSmartLockUser(firstSmartLock.id, firstUser.id);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
    return done();
  });
});

// Add smartLock user
describe("Add smartLock group", function() {
  let smartLockGroups = [];

  it("should get  smart lock groups", async function(done) {
    try {
      const groupsResponse = await getSmartLockGroups(firstSmartLock.id);
      smartLockGroups = groupsResponse.data;

      expect(groupsResponse.status).toBe(200);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should add smart lock group", async function(done) {
    try {
      const response = await addSmartLockGroup(firstSmartLock.id, {
        groupId: firstGroup.id
      });
      expect(response.status).toBe(201);
      expect(response.data.groupId).toBe(firstGroup.id);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should get smart lock groups to confirm group added successfully", async function(done) {
    try {
      const groupsResponse = await getSmartLockGroups(firstSmartLock.id);
      expect(groupsResponse.status).toBe(200);
      expect(groupsResponse.data).toHaveLength(smartLockGroups.length + 1);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

// Remove smartLock group
describe("Add smartLock group", function() {
  it("should remove smartLock group", async function(done) {
    try {
      const response = await deleteSmartLockGroup(
        firstSmartLock.id,
        firstGroup.id
      );
      expect(response.status).toBe(204);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should confirm smart lock user deleted successfully", async function(done) {
    try {
      await getSmartLockUser(firstSmartLock.id, firstUser.id);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
    return done();
  });
});

// Delete smartLock
describe("Delete smartLock", function() {
  let smartLockToDelete;
  it("should get smartLock to delete", async function(done) {
    try {
      const response = await getSmartLock(firstSmartLock.id);
      smartLockToDelete = response.data;
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(firstSmartLock.id);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should delete smartLock", async function(done) {
    try {
      const response = await deleteSmartLock(smartLockToDelete.id);
      expect(response.status).toBe(204);
    } catch (e) {
      console.log(e);
    }
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
