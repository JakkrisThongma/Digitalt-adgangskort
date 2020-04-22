using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;

namespace api.Repositories
{
    public class UserRepositoryStub : IUserRepository
    {
        public Task<IEnumerable<User>> GetUsers()
        {
            throw new NotImplementedException();
        }

        public Task<User> GetUser(Guid userId)
        {
            throw new NotImplementedException();
        }

        public void UpdateUser(User user)
        {
            throw new NotImplementedException();
        }

        public void AddUser(User user)
        {
            throw new NotImplementedException();
        }

        public void DeleteUser(User user)
        {
            throw new NotImplementedException();
        }


        public Task<List<string>> GetUserSmartLocksIdList(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<SmartLock>> GetUserSmartLocks(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UserExists(Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Save()
        {
            throw new NotImplementedException();
        }
    }
}