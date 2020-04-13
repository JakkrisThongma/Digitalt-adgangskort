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

        public async Task<IEnumerable<SmartLock>> GetSmartLocks(List<string> smartLocksIdList)
        {
            var allUserSmartLocks = await _context.SmartLocks
                .Where(smartLock => smartLocksIdList
                    .Contains(smartLock.Id.ToString()))
                .ToListAsync();

            return allUserSmartLocks;
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
            _context.Entry(smartLock).State = EntityState.Modified;
        }

        public void AddSmartLock(SmartLock smartLock)
        {
            if (smartLock == null)
            {
                throw new ArgumentNullException(nameof(smartLock));
            }
            
            smartLock.Id = Guid.NewGuid();
            
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

        public async Task<IEnumerable<User>> GetSmartLockUsers(Guid smartLockId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            var smartLockWithUsers = await _context.SmartLocks
                .Include(s => s.SmartLockUsers)
                .ThenInclude(slu => slu.User).FirstOrDefaultAsync(sl => sl.Id == smartLockId);

            return smartLockWithUsers.SmartLockUsers.Select(slu => slu.User).ToList();
        }

        public void AddSmartLockUser(Guid smartLockId, Guid userId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            if (userId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            var smartLockUser = new SmartLockUser
            {
                UserId = userId,
                SmartLockId = smartLockId
            };
            _context.Add(smartLockUser);
        }
        
        public async Task<SmartLockUser> GetSmartLockUser(Guid smartLockId, Guid userId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }
            
            if (userId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            var smartLockWitUsers = await _context.SmartLocks
                .Include(s => s.SmartLockUsers)
                .ThenInclude(slu => slu.User).FirstOrDefaultAsync(sl => sl.Id == smartLockId);

            return smartLockWitUsers.SmartLockUsers.FirstOrDefault(slu => slu.UserId == userId);
        }

        public void DeleteSmartLockUser(Guid smartLockId, Guid userId)
        {
            if (smartLockId == null)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            if (userId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            var smartLockUser = new SmartLockUser {SmartLockId = smartLockId, UserId = userId};
            _context.Remove(smartLockUser);
        }

        public async Task<IEnumerable<Group>> GetSmartLockGroups(Guid smartLockId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            var smartLockWitGroups = await _context.SmartLocks
                .Include(s => s.SmartLockGroups)
                .ThenInclude(slg => slg.Group).FirstOrDefaultAsync(sl => sl.Id == smartLockId);

            return smartLockWitGroups.SmartLockGroups.Select(slg => slg.Group).ToList();
        }

        public void AddSmartLockGroup(Guid smartLockId, Guid groupId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            if (groupId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(groupId));
            }

            var smartLockGroup = new SmartLockGroup()
            {
                GroupId = groupId,
                SmartLockId = smartLockId
            };
            _context.Add(smartLockGroup);
        }
        
        public async Task<SmartLockGroup> GetSmartLockGroup(Guid smartLockId, Guid groupId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }
            
            if (groupId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(groupId));
            }

            var smartLockWitGroups = await _context.SmartLocks
                .Include(s => s.SmartLockGroups)
                .ThenInclude(slg => slg.Group).FirstOrDefaultAsync(sl => sl.Id == smartLockId);

            return smartLockWitGroups.SmartLockGroups.FirstOrDefault(slg => slg.GroupId == groupId);
        }

        public void DeleteSmartLockGroup(Guid smartLockId, Guid groupId)
        {
            if (smartLockId == null)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            if (groupId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(groupId));
            }

            var smartLockGroup = new SmartLockGroup
            {
                SmartLockId = smartLockId, GroupId = groupId
            };
            _context.Remove(smartLockGroup);
        }

        public async Task<bool> SmartLockExists(Guid smartLockId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            return await _context.SmartLocks.AnyAsync(sl => sl.Id == smartLockId);
        }

        public async Task<bool> SmartLockUserExists(Guid smartLockId, Guid userId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            if (userId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            return await _context.SmartLockUsers.AnyAsync(slu =>
                slu.SmartLockId == smartLockId && slu.UserId == userId);
        }

        public async Task<bool> SmartLockGroupExists(Guid smartLockId, Guid groupId)
        {
            if (smartLockId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            if (groupId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(smartLockId));
            }

            return await _context.SmartLockGroups.AnyAsync(slg =>
                slg.SmartLockId == smartLockId && slg.GroupId == groupId);
        }

        public async Task<bool> Save()
        {
            return await (_context.SaveChangesAsync()) > 0;
        }
    }
}