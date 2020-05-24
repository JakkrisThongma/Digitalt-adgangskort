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
            // context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            /*
            // Initializing database with data for development purposes
            // Note that the ids for users and groups should belong to users and groups in your Azure Ad tenant
    
            var user1 = new User
            {
                Id = Guid.Parse("72ba6db2-945e-449a-b8f2-ea6fc1bde02d"),
                Status = Status.Active
            };
            
            var user2 = new User
            {
                Id = Guid.Parse("b719d5c3-884e-443a-8e63-6c036725f0f8"),
                Status = Status.Active
            };
    

            var group1 = new Group
            {
                Id = Guid.Parse("34227134-1d06-421e-94cd-901d7d57bace"),
                Status = Status.Active
            };

            var group2 = new Group
            {
                Id = Guid.Parse("e1f2df93-23b6-45ec-9e2f-a845fcd25cff"),
                Status = Status.Active
            };

            
            var smartLock1 = new SmartLock
            {
                Id = Guid.Parse("C18CCE7C-8E0C-4CA3-989F-9B60FE323A1B"),
                Title = "Developer office",
                Description = "Access to U1",
                ManufactureId = "qweasd123axc",
                Status = Status.Active
            };
            

            var smartLock2 = new SmartLock
            {
                Id = Guid.Parse("064259d2-237f-4237-9127-1683573e1190"),
                Title = "HR office",
                Description = "Access to U1, and G2",
                ManufactureId = "fdscgdfrt442",
                Status = Status.Active

            };


            var smartLock3 = new SmartLock
            {
                Id = Guid.Parse("64136395-55d4-41df-881a-863dfb9dd747"),
                Title = "Administration office",
                Description = "Access to G1, and G2",
                ManufactureId = "dfxwrsdfs12s",
                Status = Status.Active

            };

            var smartLock4 = new SmartLock
            {
                Id = Guid.Parse("0f90217c-1709-4771-8669-57c89fca2f3d"),
                Title = "Marketing office",
                Description = "Access to U1, U2, U3, G1, G2, and G3",
                ManufactureId = "xsdwsx123wqsd",
                Status = Status.Active

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
                context.SmartLocks.AddRange(smartLock1, smartLock2, smartLock3, smartLock4);
                context.SaveChanges();
            }
            
            context.AddRange(
                new SmartLockGroup
                {
                    GroupId = group2.Id,
                    SmartLockId = smartLock4.Id
                }, new SmartLockGroup
                {
                    GroupId = group1.Id,
                    SmartLockId = smartLock3.Id
                }, 
                new SmartLockGroup
                {
                    GroupId = group2.Id,
                    SmartLockId = smartLock2.Id
                },
                new SmartLockGroup
                {
                    GroupId = group1.Id,
                    SmartLockId = smartLock4.Id
                }
            );

            context.AddRange(
                new SmartLockUser
                {
                    UserId = user1.Id,
                    SmartLockId = smartLock1.Id
                },
                new SmartLockUser
                {
                    UserId = user1.Id,
                    SmartLockId = smartLock3.Id
                },
                new SmartLockUser
                {
                    UserId = user2.Id,
                    SmartLockId = smartLock4.Id
                });

            var accessLog1 = new Access
            {
                UserId = Guid.Parse("72ba6db2-945e-449a-b8f2-ea6fc1bde02d"),
                SmartLockId = Guid.Parse("C18CCE7C-8E0C-4CA3-989F-9B60FE323A1B"),
                IsValid = true,
                Info = "Access was permitted for user"
            };
            
            var accessLog2 = new Access
            {
                UserId = Guid.Parse("b719d5c3-884e-443a-8e63-6c036725f0f8"),
                SmartLockId = Guid.Parse("0f90217c-1709-4771-8669-57c89fca2f3d"),
                IsValid = true,
                Info = "Access was permitted for group user"

            };
            
            context.Accesses.AddRange(accessLog1, accessLog2);

            context.SaveChanges();
            */
        }
    }
}