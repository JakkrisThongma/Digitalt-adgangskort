using System;
using System.Linq;
using api.Entities;
using api.Types;

namespace api.Services
{
    public class DatabaseInitialize : IDatabaseInitialize
    {
        [Obsolete]
        public void Initialize(ApiContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            var user1 = new User
            {
                Id = Guid.Parse("b0568c49-a276-4eeb-9000-6555c0bc3801"),
                Status = Status.Active
            };

            var user2 = new User
            {
                Id = Guid.Parse("d003b41f-4e39-4bc7-9dee-2f873dbed582"),
                Status = Status.Inactive
            };


            var group1 = new Group
            {
                Id = Guid.Parse("8b4b5344-9050-4fd0-858b-5b93125341c9"),
                Status = Status.Active
            };

            var group2 = new Group
            {
                    Id = Guid.Parse("e1f2df93-23b6-45ec-9e2f-a845fcd25cff"),
                    Status = Status.Inactive
            };


            var smartLock1 = new SmartLock
            {
                Id = Guid.NewGuid(),
                Title = "Inngang",
                Description = "Tilgang til Alle ansatte",
                ManufactureId = "abcd1234",
                Status = Status.Active
            };
            var smartLock2 = new SmartLock
            {
                Id = Guid.NewGuid(),
                Title = "Utgang",
                Description = "Tilgang til Alle ansatte",
                ManufactureId = "qweasd123"


            };

            if (!context.Users.ToList().Any())
            {
                context.Users.AddRange(user1, user2);
                context.SaveChanges();
            }

            if (!context.Groups.ToList().Any())
            {
                context.Groups.AddRange(group1, group2);
                context.SaveChanges();
            }

            if (!context.SmartLocks.ToList().Any())
            {
                context.SmartLocks.AddRange(smartLock1, smartLock2);
                context.SaveChanges();
            }

            context.AddRange(
                new SmartLockGroup
                {
                    GroupId = group1.Id,
                    SmartLockId = smartLock1.Id
                },
                new SmartLockGroup
                {
                    GroupId = group2.Id,
                    SmartLockId = smartLock1.Id
                });

            context.AddRange(
                new SmartLockUser
                {
                    UserId = user1.Id,
                    SmartLockId = smartLock1.Id
                },
                new SmartLockUser
                {
                    UserId = user2.Id,
                    SmartLockId = smartLock1.Id
                });

            context.SaveChanges();
        }
    }
}