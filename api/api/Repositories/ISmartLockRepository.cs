using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;

namespace api.Repositories
{
    public interface ISmartLockRepository
    {
        public Task<IEnumerable<SmartLock>> GetSmartLocks();
        public Task<IEnumerable<SmartLock>> GetSmartLocks(List<string> smartLocksIdList);
        public Task<SmartLock> GetSmartLock(Guid smartLockId);
        public void UpdateSmartLock(SmartLock smartLock);
        public void AddSmartLock(SmartLock smartLock);
        public void DeleteSmartLock(SmartLock smartLock);
        public Task<bool> SmartLockExists(Guid smartLockId);
        public Task<SmartLock> GetSmartLockWithGroupsAndUsers(Guid smartLockId);
        public Task<IEnumerable<User>>GetSmartLockUsers(Guid smartLockId);
        public void AddSmartLockUser(Guid smartLockId, Guid userId);
        public Task<SmartLockUser> GetSmartLockUser(Guid smartLockId, Guid userId);
        public void DeleteSmartLockUser(Guid smartLockId, Guid userId);
        public Task<bool> SmartLockUserExists(Guid smartLockId, Guid userId);
        public Task<IEnumerable<Group>> GetSmartLockGroups(Guid smartLockId);
        public void AddSmartLockGroup(Guid smartLockId, Guid groupId);
        public Task<SmartLockGroup> GetSmartLockGroup(Guid smartLockId, Guid groupId);
        public void DeleteSmartLockGroup(Guid smartLockId, Guid groupId);
        public Task<bool> SmartLockGroupExists(Guid smartLockId, Guid groupId);
        public Task<bool> Save();
    }
}