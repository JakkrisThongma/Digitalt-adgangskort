using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
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

        public  IEnumerable<User> GetUsers()
        {
            return  _context.Users.ToList();
        }

        public User GetUser(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(userId));
            }
            
            return _context.Users.FirstOrDefault(u => u.Id == userId);;
        }

        public void UpdateUser(User user)
        {
        }


        public void AddUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            _context.Users.Add(user);
        }


        public void DeleteUser(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            _context.Users.Remove(user);
        }

        public bool UserExists(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            return _context.Users.Any(u => u.Id == userId);
        }


        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}