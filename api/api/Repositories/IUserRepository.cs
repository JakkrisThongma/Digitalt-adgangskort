using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;

namespace api.Repositories
{
    public interface IUserRepository
    {
        public Task<IEnumerable<User>> GetUsers();
        public Task<User> GetUser(Guid userId);
        public void UpdateUser(User user);
        public void AddUser(User user);
        public void DeleteUser(User user);
        public Task<List<string>> GetUserSmartLocksIdList(Guid userId);
        public Task<IEnumerable<SmartLock>> GetUserSmartLocks(Guid userId);
        public Task<bool> UserExists(Guid userId);
        public Task<bool>  Save();
    }
}