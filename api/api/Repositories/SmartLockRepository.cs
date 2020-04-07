using System;
using System.Collections.Generic;
using System.Linq;
using api.Entities;

namespace api.Repositories
{
    public class SmartLockRepository : ISmartLockRepository
    {
        private readonly ApiContext _context;

        public SmartLockRepository(ApiContext context)
        {
            _context = context;
        }
        
        public IEnumerable<SmartLock> GetSmartLocks()
        {
            return _context.SmartLocks.ToList().ToList();
        }

        public SmartLock GetSmartLock(Guid smartLockId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            return _context.SmartLocks.FirstOrDefault(sl => sl.Id == smartLockId);
            
        }

        public void UpdateSmartLock(SmartLock smartLock)
        {
            throw new NotImplementedException();
        }

        public void AddSmartLock(SmartLock smartLock)
        {
            if (smartLock == null)
            {
                throw new ArgumentNullException(nameof(smartLock));
            }

            _context.SmartLocks.Add(smartLock);
        }

        public void DeleteSmartLock(SmartLock smartLock)
        {
            if (smartLock == null)
            {
                throw new ArgumentNullException(nameof(smartLock));
            }

            _context.SmartLocks.Remove(smartLock);
        }

        public bool SmartLockExists(Guid smartLockId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            return _context.SmartLocks.Any(sl => sl.Id == smartLockId);
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}