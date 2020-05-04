import {
  getGroup,
  getAzureAdGroups,
  addGroup,
  getGroups,
  deleteGroup,
  updateGroup,
  getSmartLocks,
  addSmartLock,
  deleteSmartLock,
  getGroupSmartLocks
} from "../../services/api";
import helpers from "../../helpers";

const { extractIdList } = helpers;

describe("Groups", function() {
  let firstGroupFromAzureAd;
  let secondGroupFromAzureAd;
  let groupCount;
  let smartLocks;
  let updatedSmartLocks;
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

  beforeAll(async done => {
    const azureAdGroups = await getAzureAdGroups();
    [firstGroupFromAzureAd, secondGroupFromAzureAd] = await azureAdGroups.data;

    const groups = await getGroups();
    groupCount = await groups.data.length;
    await addSmartLock(smartLocksToAdd[0]);
    await addSmartLock(smartLocksToAdd[1]);
    const smartLocksResponse = await getSmartLocks();
    smartLocks = smartLocksResponse.data;
    updatedSmartLocks = [smartLocks[0]];
    return done();
  });

  afterAll(async done => {
    console.log("group smartLocks", smartLocks);

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
      console.log("group deleteGroup2", e);
    }
    return done();
  });

  // Create groups
  describe("Create groups", function() {
    it("should create group with 'active' state", function(done) {
      const groupPayload = {
        id: firstGroupFromAzureAd.id,
        status: "Active"
      };
      addGroup(groupPayload).then(res => {
        expect(res.status).toBe(201);
        return done();
      });
    });

    it("should create group with list of smart locks", function(done) {
      const groupPayload = {
        id: secondGroupFromAzureAd.id,
        status: "Active",
        smartLockGroups: extractIdList(smartLocks, "smartLockId")
      };
      addGroup(groupPayload).then(res => {
        expect(res.status).toBe(201);
        return done();
      });
    });

    it("should not create group if group exist", function(done) {
      const groupPayload = {
        id: firstGroupFromAzureAd.id,
        status: "Active"
      };
      addGroup(groupPayload).catch(error => {
        expect(error.response.status).toBe(409);
        return done();
      });
    });

    it("should confirm groups created successfully", function(done) {
      getGroups().then(res => {
        expect(res.status).toBe(200);
        expect(res.data.length).toBe(groupCount + 2);
        return done();
      });
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

    it("should get group to update", function(done) {
      getGroup(firstGroupFromAzureAd.id).then(res => {
        groupToUpdate = res.data;
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(firstGroupFromAzureAd.id);
        return done();
      });
    });

    it("should update group", function(done) {
      updateGroup(groupToUpdate.id, statusUpdatePayload).then(res => {
        expect(res.status).toBe(204);
        return done();
      });
    });

    it("should update smart lock list for group", function(done) {
      const smartLocksUpdatePayload = [
        {
          value: extractIdList(updatedSmartLocks, "smartLockId"),
          path: "/smartLockGroups",
          op: "replace"
        }
      ];
      updateGroup(groupToUpdate.id, smartLocksUpdatePayload).then(res => {
        expect(res.status).toBe(204);
        return done();
      });
    });
    it("should confirm group status updated successfully ", function(done) {
      getGroup(firstGroupFromAzureAd.id).then(res => {
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(firstGroupFromAzureAd.id);
        expect(res.data.status).toBe(statusUpdatePayload[0].value);
        return done();
      });
    });

    it("should confirm group smart locks updated successfully ", function(done) {
      getGroupSmartLocks(firstGroupFromAzureAd.id).then(res => {
        expect(res.status).toBe(200);
        expect(res.data).toHaveLength(updatedSmartLocks.length);
        return done();
      });
    });
  });

  // Delete group
  describe("Delete group", function() {
    let groupToDelete;
    it("Get group to delete", function(done) {
      getGroup(firstGroupFromAzureAd.id).then(res => {
        groupToDelete = res.data;
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(firstGroupFromAzureAd.id);
        return done();
      });
    });

    it("should delete group", function(done) {
      deleteGroup(groupToDelete.id).then(res => {
        expect(res.status).toBe(204);
        return done();
      });
    });
    it("should confirm group deleted successfully", function(done) {
      getGroup(groupToDelete.id).catch(error => {
        expect(error.response.status).toBe(404);
        return done();
      });
    });
  });
});
