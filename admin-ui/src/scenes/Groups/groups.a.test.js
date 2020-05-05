import {
  getGroup,
  getAzureAdGroups,
  addGroup,
  getGroups,
  deleteGroup,
  updateGroup,
  addSmartLock,
  deleteSmartLock,
  getGroupSmartLocks,
  getGroupUsers,
  addUser,
  deleteUser
} from "../../services/api";
import helpers from "../../helpers";

const { extractIdList } = helpers;

let firstGroupFromAzureAd;
let secondGroupFromAzureAd;
let groupCount;
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
      const azureAdGroups = await getAzureAdGroups();
      [
        firstGroupFromAzureAd,
        secondGroupFromAzureAd
      ] = await azureAdGroups.data;

      const groups = await getGroups();
      groupCount = await groups.data.length;

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

// Create groups
describe("Create groups", function() {
  it("should create group with 'active' state", async function(done) {
    const groupPayload = {
      id: firstGroupFromAzureAd.id,
      status: "Active"
    };
    try {
      const response = await addGroup(groupPayload);
      expect(response.status).toBe(201);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should create group with list of smart locks", async function(done) {
    const groupPayload = {
      id: secondGroupFromAzureAd.id,
      status: "Active",
      smartLockGroups: extractIdList(smartLocks, "smartLockId")
    };
    try {
      const response = await addGroup(groupPayload);
      expect(response.status).toBe(201);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should not create group if group exist", async function(done) {
    const groupPayload = {
      id: firstGroupFromAzureAd.id,
      status: "Active"
    };
    try {
      await addGroup(groupPayload);
    } catch (error) {
      expect(error.response.status).toBe(409);
    }
    return done();
  });

  it("should confirm groups created successfully", async function(done) {
    try {
      const response = await getGroups();
      expect(response.status).toBe(200);
      expect(response.data.length).toBe(groupCount + 2);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

// Update group
describe("Update group", function() {
  let groupToUpdate;
  const statusUpdatePayload = [
    {
      value: "Inactive",
      path: "/status",
      op: "replace"
    }
  ];

  it("should get group to update", async function(done) {
    try {
      const response = await getGroup(firstGroupFromAzureAd.id);
      groupToUpdate = response.data;
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(firstGroupFromAzureAd.id);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should update group", async function(done) {
    try {
      const response = await updateGroup(groupToUpdate.id, statusUpdatePayload);
      expect(response.status).toBe(204);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should update smart lock list for group", async function(done) {
    const smartLocksUpdatePayload = [
      {
        value: extractIdList(updatedSmartLocks, "smartLockId"),
        path: "/smartLockGroups",
        op: "replace"
      }
    ];
    try {
      const response = await updateGroup(
        groupToUpdate.id,
        smartLocksUpdatePayload
      );
      expect(response.status).toBe(204);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
  it("should confirm group status updated successfully ", async function(done) {
    try {
      const response = await getGroup(firstGroupFromAzureAd.id);
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(firstGroupFromAzureAd.id);
      expect(response.data.status).toBe(statusUpdatePayload[0].value);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should confirm group smart locks updated successfully ", async function(done) {
    try {
      const response = await getGroupSmartLocks(firstGroupFromAzureAd.id);
      expect(response.status).toBe(200);
      expect(response.data).toHaveLength(updatedSmartLocks.length);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

// Group users
describe("Group users ", function() {
  let groupUsers;
  it("should get group users", async function(done) {
    try {
      const response = await getGroupUsers(secondGroupFromAzureAd.id);
      groupUsers = response.data;
      expect(response.status).toBe(200);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should add group user to db", async function(done) {
    try {
      const response = await addUser({
        id: "a397dfa5-2bd5-40c4-bf5e-12a05220bd94"
      });
      expect(response.status).toBe(201);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should confirm group user add successfully", async function(done) {
    try {
      const response = await getGroupUsers(secondGroupFromAzureAd.id);
      expect(response.status).toBe(200);
      expect(response.data).toHaveLength(groupUsers.length + 1);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

// Delete group
describe("Delete group", function() {
  let groupToDelete;
  it("should get group to delete", async function(done) {
    try {
      const response = await getGroup(firstGroupFromAzureAd.id);
      groupToDelete = response.data;
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(firstGroupFromAzureAd.id);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should delete group", async function(done) {
    try {
      const response = await deleteGroup(groupToDelete.id);
      expect(response.status).toBe(204);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
  it("should confirm group deleted successfully", async function(done) {
    try {
      await getGroup(groupToDelete.id);
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
      await deleteGroup(secondGroupFromAzureAd.id);
      await deleteUser("a397dfa5-2bd5-40c4-bf5e-12a05220bd94");
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});
