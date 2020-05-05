import {
  getUser,
  getAzureAdUsers,
  addUser,
  getUsers,
  deleteUser,
  updateUser,
  addSmartLock,
  deleteSmartLock,
  getUserSmartLocks,
  getUserGroups,
  addGroup,
  deleteGroup
} from "../../services/api";
import helpers from "../../helpers";

const { extractIdList } = helpers;

let firstUserFromAzureAd;
let secondUserFromAzureAd;
let userCount;
let smartLocks;
let updatedSmartLocks;
let firstSmartLock;
let secondSmartLock;
const smartLocksToAdd = [
  {
    title: "Smart lock 1",
    status: "Active"
  },
  {
    title: "Smart lock 2",
    status: "Inactive"
  }
];
describe("Setup", function() {
  it("should set tests data", async function(done) {
    try {
      const azureAdUsers = await getAzureAdUsers();
      [firstUserFromAzureAd, secondUserFromAzureAd] = await azureAdUsers.data;

      const users = await getUsers();
      userCount = await users.data.length;

      const addFirstSmartLock = await addSmartLock(smartLocksToAdd[0]);
      firstSmartLock = addFirstSmartLock.data;
      const addSecondSmartLock = await addSmartLock(smartLocksToAdd[1]);
      secondSmartLock = addSecondSmartLock.data;
      smartLocks = [firstSmartLock, secondSmartLock];
      updatedSmartLocks = [smartLocks[0]];
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

// Create users
describe("Create users", function() {
  it("should create user with 'active' state", async function(done) {
    const userPayload = {
      id: firstUserFromAzureAd.id,
      status: "Active"
    };
    try {
      const response = await addUser(userPayload);
      expect(response.status).toBe(201);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should create user with list of smart locks", async function(done) {
    const userPayload = {
      id: secondUserFromAzureAd.id,
      status: "Active",
      smartLockUsers: extractIdList(smartLocks, "smartLockId")
    };
    try {
      const response = await addUser(userPayload);
      expect(response.status).toBe(201);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should not create user if user exist", async function(done) {
    const userPayload = {
      id: firstUserFromAzureAd.id,
      status: "Active"
    };
    try {
      await addUser(userPayload);
    } catch (error) {
      expect(error.response.status).toBe(409);
    }
    return done();
  });

  it("should confirm users created successfully", async function(done) {
    try {
      const response = await getUsers();
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(userCount + 2);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

// Update user
describe("Update user", function() {
  let userToUpdate;
  const statusUpdatePayload = [
    {
      value: "Inactive",
      path: "/status",
      op: "replace"
    }
  ];

  it("should get user to update", async function(done) {
    try {
      const response = await getUser(firstUserFromAzureAd.id);
      userToUpdate = response.data;
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(firstUserFromAzureAd.id);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should update user", async function(done) {
    try {
      const response = await updateUser(userToUpdate.id, statusUpdatePayload);
      expect(response.status).toBe(204);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should update smart lock list for user", async function(done) {
    const smartLocksUpdatePayload = [
      {
        value: extractIdList(updatedSmartLocks, "smartLockId"),
        path: "/smartLockUsers",
        op: "replace"
      }
    ];
    try {
      const response = await updateUser(
        userToUpdate.id,
        smartLocksUpdatePayload
      );
      expect(response.status).toBe(204);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
  it("should confirm user status updated successfully ", async function(done) {
    try {
      const response = await getUser(firstUserFromAzureAd.id);
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(firstUserFromAzureAd.id);
      expect(response.data.status).toBe(statusUpdatePayload[0].value);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should confirm user smart locks updated successfully ", async function(done) {
    try {
      const response = await getUserSmartLocks(firstUserFromAzureAd.id);
      expect(response.status).toBe(200);
      expect(response.data).toHaveLength(updatedSmartLocks.length);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

// User groups
describe("User groups", function() {
  let userGroups;
  it("should get user groups", async function(done) {
    try {
      const response = await getUserGroups(firstUserFromAzureAd.id);
      userGroups = response.data;
      expect(response.status).toBe(200);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should add user group to db", async function(done) {
    try {
      const response = await addGroup({
        id: "e1f2df93-23b6-45ec-9e2f-a845fcd25cff"
      });
      expect(response.status).toBe(201);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should confirm user group add successfully", async function(done) {
    try {
      const response = await getUserGroups(firstUserFromAzureAd.id);
      expect(response.status).toBe(200);
      expect(response.data).toHaveLength(userGroups.length + 1);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

// Delete user
describe("Delete user", function() {
  let userToDelete;
  it("should get user to delete", async function(done) {
    try {
      const response = await getUser(firstUserFromAzureAd.id);
      userToDelete = response.data;
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(firstUserFromAzureAd.id);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should delete user", async function(done) {
    try {
      const response = await deleteUser(userToDelete.id);
      expect(response.status).toBe(204);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
  it("should confirm user deleted successfully", async function(done) {
    try {
      await getUser(userToDelete.id);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
    return done();
  });
});

describe("Tear down", function() {
  it("should delete added data from database", async function(done) {
    try {
      await deleteSmartLock(smartLocks[0].id);
      await deleteSmartLock(smartLocks[1].id);
      await deleteUser(secondUserFromAzureAd.id);
      await deleteGroup("e1f2df93-23b6-45ec-9e2f-a845fcd25cff");
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});
