using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Types;

namespace api.Repositories
{
    public class SmartLockRepositoryStub : ISmartLockRepository
    {
        public async Task<IEnumerable<SmartLock>> GetSmartLocks()
        {
            var smartLocks = new List<SmartLock>
            {
                new SmartLock
                {
                    Id = Guid.Parse("C18CCE7C-8E0C-4CA3-989F-9B60FE323A1B"),
                    Title = "Smart lock 1",
                    Description = "Access to U1",
                    ManufactureId = "abcd1234",
                    Status = Status.Active
                },
                
                new SmartLock
                {
                    Id = Guid.Parse("e7d2c9dd-cc16-4bce-a908-019d98619417"),
                    Title = "Smart lock 2",
                    Description = "Access to G3",
                    ManufactureId = "qweasd123",
                    Status = Status.Active
                },
                
                new SmartLock
                {
                    Id = Guid.Parse("ad2f8c1a-3590-4b93-b5f8-4fae365ec8ef"),
                    Title = "Smart lock 3",
                    Description = "Access to  U3, and G1",
                    ManufactureId = "qweasd123",
                    Status = Status.Active
                },
                
                new SmartLock
                {
                    Id = Guid.Parse("064259d2-237f-4237-9127-1683573e1190"),
                    Title = "Smart lock 4",
                    Description = "Access to U1, and G2",
                    ManufactureId = "qweasd123",
                    Status = Status.Active
                },
                
                new SmartLock
                {
                    Id = Guid.Parse("64136395-55d4-41df-881a-863dfb9dd747"),
                    Title = "Smart lock 5",
                    Description = "Access to G1, and G2",
                    ManufactureId = "qweasd123",
                    Status = Status.Active

                },
                
                new SmartLock
                {
                    Id = Guid.Parse("0f90217c-1709-4771-8669-57c89fca2f3d"),
                    Title = "Smart lock 6",
                    Description = "Access to U1, U2, U3, G1, G2, and G3",
                    ManufactureId = "qweasd123",
                    Status = Status.Active

                }
            };

            return await Task.FromResult(smartLocks);
        }

        public Task<IEnumerable<SmartLock>> GetSmartLocks(List<string> smartLocksIdList)
        {
            throw new NotImplementedException();
        }

        public Task<SmartLock> GetSmartLock(Guid smartLockId)
        {
            throw new NotImplementedException();
        }

        public void UpdateSmartLock(SmartLock smartLock)
        {
            throw new NotImplementedException();
        }

        public void AddSmartLock(SmartLock smartLock)
        {
            throw new NotImplementedException();
        }

        public void DeleteSmartLock(SmartLock smartLock)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SmartLockExists(Guid smartLockId)
        {
            var smartLocks = await GetSmartLocks();

            return smartLocks.Any(s1 => s1.Id == smartLockId);
        }

        public Task<SmartLock> GetSmartLockWithGroupsAndUsers(Guid smartLockId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetSmartLockUsers(Guid smartLockId)
        {
            throw new NotImplementedException();
        }

        public void AddSmartLockUser(Guid smartLockId, Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<SmartLockUser> GetSmartLockUser(Guid smartLockId, Guid userId)
        {
            throw new NotImplementedException();
        }

        public void DeleteSmartLockUser(Guid smartLockId, Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SmartLockUserExists(Guid smartLockId, Guid userId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Group>> GetSmartLockGroups(Guid smartLockId)
        {
            throw new NotImplementedException();
        }

        public void AddSmartLockGroup(Guid smartLockId, Guid groupId)
        {
            throw new NotImplementedException();
        }

        public Task<SmartLockGroup> GetSmartLockGroup(Guid smartLockId, Guid groupId)
        {
            throw new NotImplementedException();
        }

        public void DeleteSmartLockGroup(Guid smartLockId, Guid groupId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SmartLockGroupExists(Guid smartLockId, Guid groupId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Save()
        {
            throw new NotImplementedException();
        }
    }
}