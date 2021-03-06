using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.EntityFrameworkCore;
using User = api.Entities.User;

namespace api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApiContext _context;

        public UserRepository(ApiContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUser(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(userId));
            }
            
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);;
        }
        
        public async Task<User> GetUserWithSmartLocks(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(userId));
            }
            
            var userWithSmartLocks = await _context.Users
                .Include(u => u.SmartLockUsers)
                .ThenInclude(slu => slu.SmartLock).FirstOrDefaultAsync(u => u.Id == userId);
            
            return userWithSmartLocks;
        }

        public void UpdateUser(User user)
        {
            foreach (var smartLockUser in user.SmartLockUsers)
            {
                smartLockUser.UserId = user.Id;
            }
            
            _context.Entry(user).State = EntityState.Modified;

        }
        
        public void AddUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            foreach (var smartLockUser in user.SmartLockUsers)
            {
                smartLockUser.UserId = user.Id;
            }
            
            _context.Users.Add(user);
        }
        
        public  void DeleteUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            _context.Users.Remove(user);
        }

        public async Task<List<string>> GetUserSmartLocksIdList(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            var userWithSmartLocks = await _context.Users
                .Include(u => u.SmartLockUsers)
                .ThenInclude(slu => slu.SmartLock).FirstOrDefaultAsync(u => u.Id == userId);

            return userWithSmartLocks.SmartLockUsers.Select(slu => slu.SmartLock.ToString()).ToList();
        }
        
        public async Task<IEnumerable<SmartLock>> GetUserSmartLocks(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            var userWithSmartLocks = await _context.Users
                .Include(u => u.SmartLockUsers)
                .ThenInclude(slu => slu.SmartLock).FirstOrDefaultAsync(u => u.Id == userId);

            return userWithSmartLocks.SmartLockUsers.Select(slu => slu.SmartLock)
                .ToList()
                .OrderBy(sl=> sl.Title);
        }
        
        public async Task<bool> UserExists(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            return await _context.Users.AnyAsync(u => u.Id == userId);
        }

        public async Task<bool>  Save()
        {
            return (await _context.SaveChangesAsync() > 0);
        }
    }
}