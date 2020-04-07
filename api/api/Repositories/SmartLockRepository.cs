using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class SmartLockRepository : ISmartLockRepository
    {
        private readonly ApiContext _context;

        public SmartLockRepository(ApiContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<SmartLock>> GetSmartLocks()
        {
            return await _context.SmartLocks.ToListAsync();
        }

        public async Task<SmartLock> GetSmartLock(Guid smartLockId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            return await _context.SmartLocks.FirstOrDefaultAsync(sl => sl.Id == smartLockId);
            
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

        public async Task<bool> SmartLockExists(Guid smartLockId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            return await _context.SmartLocks.AnyAsync(sl => sl.Id == smartLockId);
        }

        public async Task<bool> Save()
        {
            return await (_context.SaveChangesAsync()) > 0;
        }
    }
}