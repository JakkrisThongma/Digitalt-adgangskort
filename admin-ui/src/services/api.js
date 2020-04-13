import http from "./http";

// Users endpoints
export function getUsers() {
  return http({
    method: "GET",
    url: "users"
  }).then(res => Promise.resolve(res.data));
}

export function addUser(data) {
  return http({
    method: "POST",
    url: "users",
    data
  });
}

export function getUser(userId) {
  return http({
    method: "GET",
    url: `users/${userId}`
  }).then(res => Promise.resolve(res.data));
}

export function getCurrentUser() {
  return http({
    method: "GET",
    url: "users/current"
  }).then(res => Promise.resolve(res.data));
}

export function updateUser(userId, data) {
  return http({
    method: "PATCH",
    url: `users/${userId}`,
    data
  });
}
export function deleteUser(userId) {
  return http({
    method: "DELETE",
    url: `users/${userId}`
  });
}

export function getUserGroups(userId) {
  return http({
    method: "GET",
    url: `users/${userId}/groups`
  }).then(res => Promise.resolve(res.data));
}

export function getUserSmartLocks(userId) {
  return http({
    method: "GET",
    url: `users/${userId}/smart-locks`
  }).then(res => Promise.resolve(res.data));
}

// Groups endpoints
export function getGroups() {
  return http({
    method: "GET",
    url: "groups"
  }).then(res => Promise.resolve(res.data));
}

export function addGroup(data) {
  return http({
    method: "POST",
    url: "groups",
    data
  });
}

export function getGroup(groupId) {
  return http({
    method: "GET",
    url: `groups/${groupId}`
  }).then(res => Promise.resolve(res.data));
}

export function updateGroup(groupId, data) {
  return http({
    method: "PATCH",
    url: `groups/${groupId}`,
    data
  });
}
export function deleteGroup(groupId) {
  return http({
    method: "DELETE",
    url: `groups/${groupId}`
  });
}

export function getGroupUsers(id) {
  return http({
    method: "GET",
    url: `groups/${id}/users`
  }).then(res => Promise.resolve(res.data));
}

export function getGroupSmartLocks(groupId) {
  return http({
    method: "GET",
    url: `groups/${groupId}/smart-locks`
  }).then(res => Promise.resolve(res.data));
}

// Smart locks endpoints
export function getSmartLocks() {
  return http({
    method: "GET",
    url: "smart-locks"
  }).then(res => Promise.resolve(res.data));
}

export function addSmartLock(data) {
  return http({
    method: "POST",
    url: "smart-locks",
    data
  });
}

export function getSmartLock(smartLockId) {
  return http({
    method: "GET",
    url: `smart-locks/${smartLockId}`
  }).then(res => Promise.resolve(res.data));
}

export function updateSmartLock(smartLockId, data) {
  return http({
    method: "PATCH",
    url: `smart-locks/${smartLockId}`,
    data
  });
}
export function deleteSmartLock(smartLockId) {
  return http({
    method: "DELETE",
    url: `smart-locks/${smartLockId}`
  });
}

export function getSmartLockUsers(smartLockId) {
  return http({
    method: "GET",
    url: `smart-locks/${smartLockId}/users`
  }).then(res => Promise.resolve(res.data));
}

export function addSmartLockUser(smartLockId, data) {
  return http({
    method: "POST",
    url: `smart-locks/${smartLockId}/users`,
    data
  });
}

export function getSmartLockUser(smartLockId, userId) {
  return http({
    method: "GET",
    url: `smart-locks/${smartLockId}/users/${userId}`
  }).then(res => Promise.resolve(res.data));
}

export function deleteSmartLockUser(smartLockId, userId) {
  return http({
    method: "DELETE",
    url: `smart-locks/${smartLockId}/users/${userId}`
  });
}

export function getSmartLockGroups(smartLockId) {
  return http({
    method: "GET",
    url: `smart-locks/${smartLockId}/groups`
  }).then(res => Promise.resolve(res.data));
}

export function addSmartLockGroup(smartLockId, data) {
  return http({
    method: "POST",
    url: `smart-locks/${smartLockId}/groups`,
    data
  });
}

export function getSmartLockGroup(smartLockId, groupId) {
  return http({
    method: "GET",
    url: `smart-locks/${smartLockId}/groups/${groupId}`
  }).then(res => Promise.resolve(res.data));
}

export function deleteSmartLockGroup(smartLockId, groupId) {
  return http({
    method: "DELETE",
    url: `smart-locks/${smartLockId}/groups/${groupId}`
  });
}

export function getAccess(data) {
  return http({
    method: "POST",
    url: "smart-locks/get-access",
    data
  });
}

// Azure AD endpoints
export function getUsersFromAzureAd() {
  return http({
    method: "GET",
    url: "azure-ad/users"
  }).then(res => Promise.resolve(res.data));
}
export function getUserFromAzureAd(userId) {
  return http({
    method: "GET",
    url: `azure-ad/users/${userId}`
  }).then(res => Promise.resolve(res.data));
}

export function getUserPhotoFromAzureAd(userId) {
  return http({
    method: "GET",
    url: `azure-ad/users/${userId}/photo`
  }).then(res => Promise.resolve(res.data));
}

export function getUserGroupFromAzureAd(userId) {
  return http({
    method: "GET",
    url: `azure-ad/users/${userId}/groups`
  }).then(res => Promise.resolve(res.data));
}

export function getGroupsFromAzureAd() {
  return http({
    method: "GET",
    url: "azure-ad/groups"
  }).then(res => Promise.resolve(res.data));
}

export function getGroupFromAzureAd(groupId) {
  return http({
    method: "GET",
    url: `azure-ad/groups/${groupId}`
  }).then(res => Promise.resolve(res.data));
}

export function getGroupMembersFromAzureAd(groupId) {
  return http({
    method: "GET",
    url: `azure-ad/groups/${groupId}/members`
  }).then(res => Promise.resolve(res.data));
}

// Operational endpoints
export function checkApiHealth() {
  return http({
    method: "GET",
    url: "health"
  }).then(res => Promise.resolve(res.data));
}
