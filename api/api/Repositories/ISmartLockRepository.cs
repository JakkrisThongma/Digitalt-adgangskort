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
        public Task<bool> SmartLockExists(Guid smartLockId);
        public Task<bool> Save();
    }
}