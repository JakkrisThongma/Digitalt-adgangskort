using System;
using System.Collections.Generic;
using api.Entities;

namespace api.Repositories
{
    public interface IUserRepository
    {
        public IEnumerable<User> GetUsers();
        public User GetUser(Guid userId);
        public void UpdateUser(User user);
        public void AddUser(User user);
        public void DeleteUser(User user);
        public bool UserExists(Guid userId);
        public bool Save();
    }
}