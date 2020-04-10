using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;

namespace api.Repositories
{
    public interface ISmartLockRepository
    {
        public Task<IEnumerable<SmartLock>> GetSmartLocks();
        public Task<SmartLock> GetSmartLock(Guid smartLockId);
        public void UpdateSmartLock(SmartLock smartLock);
        public void AddSmartLock(SmartLock smartLock);
        public void DeleteSmartLock(SmartLock smartLock);
        public Task<IEnumerable<User>>GetSmartLockUsers(Guid smartLockId);
        public Task<IEnumerable<Group>> GetSmartLockGroups(Guid smartLockId);
        public void AddSmartLockUser(Guid smartLockId, Guid userId);
        public Task<bool> SmartLockUserExists(Guid smartLockId, Guid userId);
        public void AddSmartLockGroup(Guid smartLockId, Guid groupId);
        public Task<bool> SmartLockGroupExists(Guid smartLockId, Guid groupId);

        public Task<bool> SmartLockExists(Guid smartLockId);
        public Task<bool> Save();
    }
}