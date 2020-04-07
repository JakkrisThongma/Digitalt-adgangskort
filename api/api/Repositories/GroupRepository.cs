using System;
using System.Collections.Generic;
using api.Entities;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly ApiContext _context;

        public GroupRepository(ApiContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Group>> GetGroups()
        {
            return await _context.Groups.ToListAsync();
        }

        public async Task<Group> GetGroup(Guid groupId)
        {
            if (groupId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(groupId));
            }
            
            return await _context.Groups.FirstOrDefaultAsync(g => g.Id == groupId);
        }

        public void UpdateGroup(Group groupToUpdate)
        {
        }

        public void AddGroup(Group groupToAdd)
        {
            if (groupToAdd == null)
            {
                throw new ArgumentNullException(nameof(groupToAdd));
            }

            _context.Groups.Add(groupToAdd);
        }

        public void DeleteGroup(Group groupToDelete)
        {
            if (groupToDelete == null)
            {
                throw new ArgumentNullException(nameof(groupToDelete));
            }

            _context.Groups.Remove(groupToDelete);
        }

        public async Task<bool> GroupExists(Guid groupId)
        {
            if (groupId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(groupId));
            }

            return await _context.Groups.AnyAsync(g => g.Id == groupId);
        }


        public async Task<bool> Save()
        {
            return await (_context.SaveChangesAsync()) > 0;
        }
    }
}