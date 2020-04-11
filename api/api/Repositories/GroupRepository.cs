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

        public void UpdateGroup(Group group)
        {
            _context.Entry(group).State = EntityState.Modified;
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

        public async Task<IEnumerable<SmartLock>> GetGroupSmartLocks(Guid groupId)
        {
            if (groupId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(groupId));
            }

            var groupWithSmartLocks = await _context.Groups
                .Include(g => g.SmartLockGroups)
                .ThenInclude(slg => slg.SmartLock).FirstOrDefaultAsync(g => g.Id == groupId);

            return groupWithSmartLocks.SmartLockGroups.Select(slu => slu.SmartLock).ToList();
        }

        public async Task<List<string>> GetGroupSmartLocksIdList(Guid groupId)
        {
            if (groupId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(groupId));
            }

            try
            {
                var groupWithSmartLocks = await _context.Groups
                    .Include(g => g.SmartLockGroups)
                    .ThenInclude(slg => slg.SmartLock).FirstOrDefaultAsync(g => g.Id == groupId);
                var groupSmartLocks = groupWithSmartLocks.SmartLockGroups.Select(slu => slu.SmartLockId.ToString())
                    .ToList();
                return groupSmartLocks;
            }
            catch (Exception e)
            {
                return new List<string>();
            }
            
        }

        public async Task<List<string>> GetGroupsSmartLocksIdList(List<string> groupsIdList)
        {
            if (groupsIdList == null)
            {
                throw new ArgumentNullException(nameof(groupsIdList));
            }

            var allGroupsLocksIdList = new List<string>();
            foreach (var groupId in groupsIdList)
            {
                var groupSmartLocksIdList = await GetGroupSmartLocksIdList(Guid.Parse(groupId));
                foreach (var lockId in groupSmartLocksIdList)
                {
                    if (!allGroupsLocksIdList.Contains(lockId))
                    {
                        allGroupsLocksIdList.Add(lockId);
                    }
                }
            }

            return allGroupsLocksIdList;
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