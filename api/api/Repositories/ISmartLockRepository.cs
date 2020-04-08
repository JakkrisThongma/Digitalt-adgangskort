using System;
using System.Collections.Generic;
using api.Entities;

namespace api.Repositories
{
    public interface ISmartLockRepository
    {
        public IEnumerable<SmartLock> GetSmartLocks();
        public SmartLock GetSmartLock(Guid smartLockId);
        public void UpdateSmartLock(SmartLock smartLock);
        public void AddSmartLock(SmartLock smartLock);
        public void DeleteSmartLock(SmartLock smartLock);
        public bool SmartLockExists(Guid smartLockId);
        public bool Save();
    }
}