using System;
using System.Linq;
using api.Entities;

namespace api.Services
{
    public class DatabaseInitialize : IDatabaseInitialize
    {
        [Obsolete]
        public void Initialize(ApiContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            var user1 =
                new User
                {
                    Id = Guid.NewGuid()
                };
            var user2 = new User
            {
                Id = Guid.NewGuid()
            };


            var group1 =
                new Group
                {
                    Id = Guid.NewGuid()
                };
            var group2 = new Group
            {
                Id = Guid.NewGuid()
            };
            var group3 = new Group
            {
                Id = Guid.NewGuid()
            };


            var smartLock1 = new SmartLock
            {
                Id = Guid.NewGuid(),
                Title = "Inngang",
                Description = "Tilgang til Alle ansatte",
                ManufactureId = "abcd1234"
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
                context.Groups.AddRange(group1, group2, group3);
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