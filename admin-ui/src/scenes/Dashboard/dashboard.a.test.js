import {
  addSmartLock,
  deleteSmartLock,
  addUser,
  deleteUser,
  getAccessLog,
  getAzureAdUsers,
  accessRequest
} from "../../services/api";

let firstUserFromAzureAd;
let firstUser;
let firstSmartLock;
const smartLockToAdd = {
  title: "Smart lock 1",
  status: "Active"
};

describe("Setup", function() {
  it("should set tests data", async function(done) {
    try {
      const azureAdUsers = await getAzureAdUsers();
      [firstUserFromAzureAd] = await azureAdUsers.data;

      const addUserResponse = await addUser({ id: firstUserFromAzureAd.id });
      firstUser = await addUserResponse.data;

      const addFirstSmartLock = await addSmartLock(smartLockToAdd);
      firstSmartLock = addFirstSmartLock.data;
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

// Access log
describe("Access log", function() {
  let accessLog;
  it("should get access log", async function(done) {
    try {
      const response = await getAccessLog();
      accessLog = response.data;
      expect(response.status).toBe(200);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should send access request to smart lock", async function(done) {
    const accessPayload = {
      userId: firstUser.id,
      smartLockId: firstSmartLock.id
    };
    try {
      const response = await accessRequest(accessPayload);
      expect(response.status).toBe(200);
    } catch (e) {
      console.log(e);
    }
    return done();
  });

  it("should get access log", async function(done) {
    try {
      const response = await getAccessLog();
      expect(response.status).toBe(200);
      expect(response.data).toHaveLength(accessLog.length + 1);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});

describe("Tear down", function() {
  it("should delete added data from database", async function(done) {
    try {
      await deleteSmartLock(firstSmartLock.id);
      await deleteUser(firstUser.id);
    } catch (e) {
      console.log(e);
    }
    return done();
  });
});
