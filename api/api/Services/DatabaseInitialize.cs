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
                Id = Guid.Parse("48984aba-64e1-4eef-b2bd-af2061cb2616"),
                Status = Status.Active
            };

            var user2 = new User
            {
                Id = Guid.Parse("47f9a467-8755-4f0f-90a8-293c2ce26941"),
                Status = Status.Active
            };
            var user3 = new User
            {
                Id = Guid.Parse("b37e26ba-a5f6-4089-a8cf-d1431415f924"),
                Status = Status.Active
            };
            var user4 = new User
            {
                Id = Guid.Parse("cde7bd38-15ea-46e6-b7eb-e15f79e87c6a"),
                Status = Status.Active
            };
            var user5 = new User
            {
                Id = Guid.Parse("2af19c79-665a-4ad2-bbed-09c381fb30ad"),
                Status = Status.Active
            };
            
            var user6 = new User
            {
                Id = Guid.Parse("b0568c49-a276-4eeb-9000-6555c0bc3801"),
                Status = Status.Active
            };


            var group1 = new Group
            {
                Id = Guid.Parse("c374cb18-862e-4fef-871f-ae08337d1f76"),
                Status = Status.Active
            };

            var group2 = new Group
            {
                Id = Guid.Parse("1933c967-2e14-4e95-bdb0-54723595672d"),
                Status = Status.Active
            };

            var group3 = new Group
            {
                Id = Guid.Parse("e44e9133-6f88-42b9-84ba-970f9293c87a"),
                Status = Status.Active
            };
            
            var group4 = new Group
            {
                Id = Guid.Parse("e1f2df93-23b6-45ec-9e2f-a845fcd25cff"),
                Status = Status.Active
            };



            var smartLock1 = new SmartLock
            {
                Id = Guid.Parse("C18CCE7C-8E0C-4CA3-989F-9B60FE323A1B"),
                Title = "Smart lock 1",
                Description = "Access to U1",
                ManufactureId = "abcd1234",
                Status = Status.Active
            };
            var smartLock2 = new SmartLock
            {
                Id = Guid.Parse("e7d2c9dd-cc16-4bce-a908-019d98619417"),
                Title = "Smart lock 2",
                Description = "Access to G3",
                ManufactureId = "qweasd123",
                Status = Status.Active

            };
            var smartLock3 = new SmartLock
            {
                Id = Guid.Parse("ad2f8c1a-3590-4b93-b5f8-4fae365ec8ef"),
                Title = "Smart lock 3",
                Description = "Access to  U3, and G1",
                ManufactureId = "qweasd123",
                Status = Status.Active

            };

            var smartLock4 = new SmartLock
            {
                Id = Guid.Parse("064259d2-237f-4237-9127-1683573e1190"),
                Title = "Smart lock 4",
                Description = "Access to U1, and G2",
                ManufactureId = "qweasd123",
                Status = Status.Active

            };


            var smartLock5 = new SmartLock
            {
                Id = Guid.Parse("64136395-55d4-41df-881a-863dfb9dd747"),
                Title = "Smart lock 5",
                Description = "Access to G1, and G2",
                ManufactureId = "qweasd123",
                Status = Status.Active

            };

            var smartLock6 = new SmartLock
            {
                Id = Guid.Parse("0f90217c-1709-4771-8669-57c89fca2f3d"),
                Title = "Smart lock 6",
                Description = "Access to U1, U2, U3, G1, G2, and G3",
                ManufactureId = "qweasd123",
                Status = Status.Active

            };


            if (!context.Users.ToList().Any())
            {
                context.Users.AddRange(user1, user2, user3, user4, user5, user6);
                context.SaveChanges();
            }

            if (!context.Groups.ToList().Any())
            {
                context.Groups.AddRange(group1, group2, group3, group4);
                context.SaveChanges();
            }

            if (!context.SmartLocks.ToList().Any())
            {
                context.SmartLocks.AddRange(smartLock1, smartLock2, smartLock3, smartLock4, smartLock5,
                    smartLock6);
                context.SaveChanges();
            }
            

            context.AddRange(
                new SmartLockGroup
                {
                    GroupId = group3.Id,
                    SmartLockId = smartLock2.Id
                },
                new SmartLockGroup
                {
                    GroupId = group1.Id,
                    SmartLockId = smartLock3.Id
                }, new SmartLockGroup
                {
                    GroupId = group2.Id,
                    SmartLockId = smartLock4.Id
                }, new SmartLockGroup
                {
                    GroupId = group1.Id,
                    SmartLockId = smartLock5.Id
                }, 
                new SmartLockGroup
                {
                    GroupId = group2.Id,
                    SmartLockId = smartLock5.Id
                },
                new SmartLockGroup
                {
                    GroupId = group1.Id,
                    SmartLockId = smartLock6.Id
                },
                new SmartLockGroup
                {
                    GroupId = group2.Id,
                    SmartLockId = smartLock6.Id
                },
                new SmartLockGroup
                {
                    GroupId = group3.Id,
                    SmartLockId = smartLock6.Id
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
                    UserId = user3.Id,
                    SmartLockId = smartLock3.Id
                },
                new SmartLockUser
                {
                    UserId = user1.Id,
                    SmartLockId = smartLock4.Id
                },
                new SmartLockUser
                {
                    UserId = user1.Id,
                    SmartLockId = smartLock6.Id
                },
                new SmartLockUser
                {
                    UserId = user2.Id,
                    SmartLockId = smartLock6.Id
                },
                new SmartLockUser
                {
                    UserId = user3.Id,
                    SmartLockId = smartLock6.Id
                });

            var accessLog1 = new Access
            {
                UserId = Guid.Parse("48984ABA-64E1-4EEF-B2BD-AF2061CB2616"),
                SmartLockId = Guid.Parse("0F90217C-1709-4771-8669-57C89FCA2F3D"),
                IsValid = true,
                Info = "Access was permitted for user"
            };
            
            var accessLog2 = new Access
            {
                UserId = Guid.Parse("48984aba-64e1-4eef-b2bd-af2061cb2616"),
                SmartLockId = Guid.Parse("064259D2-237F-4237-9127-1683573E1190"),
                IsValid = true,
                Info = "Access was permitted for group user"

            };
            
            context.AccessLog.AddRange(accessLog1, accessLog2);

            context.SaveChanges();
        }
    }
}