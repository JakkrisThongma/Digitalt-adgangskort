using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;

namespace api.Repositories
{
    public interface IGroupRepository
    {
        public Task<IEnumerable<Group>> GetGroups();
        public Task<Group> GetGroup(Guid groupId);
        public void UpdateGroup(Group groupToUpdate);
        public void AddGroup(Group groupToAdd);
        void DeleteGroup(Group groupFromRepo);
        public Task<IEnumerable<SmartLock>> GetGroupSmartLocks(Guid groupId);
        public Task<bool> GroupExists(Guid groupId);
        public Task<bool> Save();
    }
}