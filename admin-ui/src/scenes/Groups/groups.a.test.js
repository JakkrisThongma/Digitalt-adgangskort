import {
  getGroup,
  getAzureAdGroups,
  addGroup,
  getGroups,
  deleteGroup,
  updateGroup,
  addSmartLock,
  deleteSmartLock,
  getGroupSmartLocks
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
    const azureAdGroups = await getAzureAdGroups();
    [firstGroupFromAzureAd, secondGroupFromAzureAd] = await azureAdGroups.data;

    const groups = await getGroups();
    groupCount = await groups.data.length;

    const addFirstSmartLock = await addSmartLock(smartLocksToAdd[0]);
    firstSmartLock = addFirstSmartLock.data;
    const addSecondSmartLock = await addSmartLock(smartLocksToAdd[1]);
    secondSmartLock = addSecondSmartLock.data;
    smartLocks = [firstSmartLock, secondSmartLock];
    updatedSmartLocks = [smartLocks[0]];
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
    const response = await addGroup(groupPayload);
    expect(response.status).toBe(201);
    return done();
  });

  it("should create group with list of smart locks", async function(done) {
    const groupPayload = {
      id: secondGroupFromAzureAd.id,
      status: "Active",
      smartLockGroups: extractIdList(smartLocks, "smartLockId")
    };
    const response = await addGroup(groupPayload);
    expect(response.status).toBe(201);
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
    const response = await getGroups();
    expect(response.status).toBe(200);
    expect(response.data.length).toBe(groupCount + 2);
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
    const response = await getGroup(firstGroupFromAzureAd.id);
    groupToUpdate = response.data;
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(firstGroupFromAzureAd.id);
    return done();
  });

  it("should update group", async function(done) {
    const response = await updateGroup(groupToUpdate.id, statusUpdatePayload);
    expect(response.status).toBe(204);
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
    const response = await updateGroup(
      groupToUpdate.id,
      smartLocksUpdatePayload
    );
    expect(response.status).toBe(204);
    return done();
  });
  it("should confirm group status updated successfully ", async function(done) {
    const response = await getGroup(firstGroupFromAzureAd.id);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(firstGroupFromAzureAd.id);
    expect(response.data.status).toBe(statusUpdatePayload[0].value);
    return done();
  });

  it("should confirm group smart locks updated successfully ", async function(done) {
    const response = await getGroupSmartLocks(firstGroupFromAzureAd.id);
    expect(response.status).toBe(200);
    expect(response.data).toHaveLength(updatedSmartLocks.length);
    return done();
  });
});

// Delete group
describe("Delete group", function() {
  let groupToDelete;
  it("Get group to delete", async function(done) {
    const response = await getGroup(firstGroupFromAzureAd.id);
    groupToDelete = response.data;
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(firstGroupFromAzureAd.id);
    return done();
  });

  it("should delete group", async function(done) {
    const response = await deleteGroup(groupToDelete.id);
    expect(response.status).toBe(204);
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
    } catch (e) {
      console.log("group deleteSmartLock1", e);
    }
    try {
      await deleteSmartLock(smartLocks[1].id);
    } catch (e) {
      console.log("group deleteSmartLock2", e);
    }
    try {
      await deleteGroup(secondGroupFromAzureAd.id);
    } catch (e) {
      console.log("deleteGroup2", e);
    }
    await console.log("groups smartLocks after", smartLocks);

    return done();
  });
});
