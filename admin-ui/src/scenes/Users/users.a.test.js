import {
  getUser,
  getAzureAdUsers,
  addUser,
  getUsers,
  deleteUser,
  updateUser,
  addSmartLock,
  deleteSmartLock,
  getUserSmartLocks
} from "../../services/api";
import helpers from "../../helpers";

const { extractIdList } = helpers;

let firstUserFromAzureAd;
let secondUserFromAzureAd;
let userCount;
let smartLocks;
let updatedSmartLocks;
let firstSmartLock;
let secondeSmartLock;
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
    const azureAdUsers = await getAzureAdUsers();
    [firstUserFromAzureAd, secondUserFromAzureAd] = await azureAdUsers.data;

    const users = await getUsers();
    userCount = await users.data.length;

    const addFirstSmartLock = await addSmartLock(smartLocksToAdd[0]);
    firstSmartLock = addFirstSmartLock.data;
    const addSecondSmartLock = await addSmartLock(smartLocksToAdd[1]);
    secondeSmartLock = addSecondSmartLock.data;
    smartLocks = [firstSmartLock, secondeSmartLock];
    updatedSmartLocks = [smartLocks[0]];
    return done();
  });
});

// Create users
describe("Create users", function() {
  it("should create user with 'active' state", function(done) {
    const userPayload = {
      id: firstUserFromAzureAd.id,
      status: "Active"
    };
    addUser(userPayload).then(res => {
      expect(res.status).toBe(201);
      return done();
    });
  });

  it("should create user with list of smart locks", function(done) {
    const userPayload = {
      id: secondUserFromAzureAd.id,
      status: "Active",
      smartLockUsers: extractIdList(smartLocks, "smartLockId")
    };
    addUser(userPayload).then(res => {
      expect(res.status).toBe(201);
      return done();
    });
  });

  it("should not create user if user exist", function(done) {
    const userPayload = {
      id: firstUserFromAzureAd.id,
      status: "Active"
    };
    addUser(userPayload).catch(error => {
      expect(error.response.status).toBe(409);
      return done();
    });
  });

  it("should confirm users created successfully", function(done) {
    getUsers().then(res => {
      expect(res.status).toBe(200);
      expect(res.data.length).toBe(userCount + 2);
      return done();
    });
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

  it("should get user to update", function(done) {
    getUser(firstUserFromAzureAd.id).then(res => {
      userToUpdate = res.data;
      expect(res.status).toBe(200);
      expect(res.data.id).toBe(firstUserFromAzureAd.id);
      return done();
    });
  });

  it("should update user", function(done) {
    updateUser(userToUpdate.id, statusUpdatePayload).then(res => {
      expect(res.status).toBe(204);
      return done();
    });
  });

  it("should update smart lock list for user", function(done) {
    const smartLocksUpdatePayload = [
      {
        value: extractIdList(updatedSmartLocks, "smartLockId"),
        path: "/smartLockUsers",
        op: "replace"
      }
    ];
    updateUser(userToUpdate.id, smartLocksUpdatePayload).then(res => {
      expect(res.status).toBe(204);
      return done();
    });
  });
  it("should confirm user status updated successfully ", function(done) {
    getUser(firstUserFromAzureAd.id).then(res => {
      expect(res.status).toBe(200);
      expect(res.data.id).toBe(firstUserFromAzureAd.id);
      expect(res.data.status).toBe(statusUpdatePayload[0].value);
      return done();
    });
  });

  it("should confirm user smart locks updated successfully ", function(done) {
    getUserSmartLocks(firstUserFromAzureAd.id).then(res => {
      expect(res.status).toBe(200);
      expect(res.data).toHaveLength(updatedSmartLocks.length);
      return done();
    });
  });
});

// Delete user
describe("Delete user", function() {
  let userToDelete;
  it("Get user to delete", function(done) {
    getUser(firstUserFromAzureAd.id).then(res => {
      userToDelete = res.data;
      expect(res.status).toBe(200);
      expect(res.data.id).toBe(firstUserFromAzureAd.id);
      return done();
    });
  });

  it("should delete user", function(done) {
    deleteUser(userToDelete.id).then(res => {
      expect(res.status).toBe(204);
      return done();
    });
  });
  it("should confirm user deleted successfully", function(done) {
    getUser(userToDelete.id).catch(error => {
      expect(error.response.status).toBe(404);
      return done();
    });
  });
});

describe("Tear down", function() {
  it("should delete added data from database", async function(done) {
    try {
      await deleteSmartLock(smartLocks[0].id);
    } catch (e) {
      console.log("user deleteSmartLock1", e);
    }
    try {
      await deleteSmartLock(smartLocks[1].id);
    } catch (e) {
      console.log("user deleteSmartLock2", e);
    }
    try {
      await deleteUser(secondUserFromAzureAd.id);
    } catch (e) {
      console.log("deleteUser2", e);
    }
    await console.log("users smartLocks after", smartLocks);

    return done();
  });
});
