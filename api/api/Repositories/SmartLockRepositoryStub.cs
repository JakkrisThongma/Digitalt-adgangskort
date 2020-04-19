using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;

namespace api.Repositories
{
    public class SmartLockRepositoryStub : ISmartLockRepository
    {
        public Task<IEnumerable<SmartLock>> GetSmartLocks()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<SmartLock>> GetSmartLocks(List<string> smartLocksIdList)
        {
            throw new NotImplementedException();
        }

        public Task<SmartLock> GetSmartLock(Guid smartLockId)
        {
            throw new NotImplementedException();
        }

        public void UpdateSmartLock(SmartLock smartLock)
        {
            throw new NotImplementedException();
        }

        public void AddSmartLock(SmartLock smartLock)
        {
            throw new NotImplementedException();
        }

        public void DeleteSmartLock(SmartLock smartLock)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SmartLockExists(Guid smartLockId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetSmartLockUsers(Guid smartLockId)
        {
            throw new NotImplementedException();
        }

        public void AddSmartLockUser(Guid smartLockId, Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<SmartLockUser> GetSmartLockUser(Guid smartLockId, Guid userId)
        {
            throw new NotImplementedException();
        }

        public void DeleteSmartLockUser(Guid smartLockId, Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SmartLockUserExists(Guid smartLockId, Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Group>> GetSmartLockGroups(Guid smartLockId)
        {
            throw new NotImplementedException();
        }

        public void AddSmartLockGroup(Guid smartLockId, Guid groupId)
        {
            throw new NotImplementedException();
        }

        public Task<SmartLockGroup> GetSmartLockGroup(Guid smartLockId, Guid groupId)
        {
            throw new NotImplementedException();
        }

        public void DeleteSmartLockGroup(Guid smartLockId, Guid groupId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SmartLockGroupExists(Guid smartLockId, Guid groupId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Save()
        {
            throw new NotImplementedException();
        }
    }
}