using System;
using System.Collections.Generic;
using api.Entities;
using System.Linq;


namespace api.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly ApiContext _context;

        public GroupRepository(ApiContext context)
        {
            _context = context;
        }

        public IEnumerable<Group> GetGroups()
        {
            return _context.Groups.ToList();
        }

        public Group GetGroup(Guid groupId)
        {
            if (groupId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(groupId));
            }
            
            return _context.Groups.FirstOrDefault(g => g.Id == groupId);
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

        public bool GroupExists(Guid groupId)
        {
            if (groupId == Guid.Empty)
            {
                throw new ArgumentNullException(nameof(groupId));
            }

            return _context.Groups.Any(g => g.Id == groupId);
        }


        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}