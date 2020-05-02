using System;
using System.Collections.Generic;
using api.Entities;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class AccessRepository : IAccessRepository
    {
        private readonly ApiContext _context;

        public AccessRepository(ApiContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Access>> GetAccesses()
        {
            return await _context.Accesses.ToListAsync();
        }

        public void AddAccess(Access access)
        {
            if (access == null)
            {
                throw new ArgumentNullException(nameof(access));
            }
            
            access.Id = Guid.NewGuid();

            _context.Accesses.Add(access);
        }

        
        public async Task<bool> Save()
        {
            return await (_context.SaveChangesAsync()) > 0;
        }
    }
    
}