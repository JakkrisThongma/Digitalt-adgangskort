using System;
using System.Collections.Generic;
using api.Entities;

namespace api.Repositories
{
    public interface IGroupRepository
    {
        public IEnumerable<Group> GetGroups();
        public Group GetGroup(Guid groupId);
        public void UpdateGroup(Group groupToUpdate);
        public void AddGroup(Group groupToAdd);
        public void DeleteGroup(Group groupToDelete);
        public bool GroupExists(Guid groupId);
        public bool Save();
    }
}