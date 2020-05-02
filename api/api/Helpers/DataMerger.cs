using System;
using System.Collections.Generic;
using System.Linq;
using api.Entities;
using api.Models;
using AutoMapper;
using Microsoft.Graph;
using Group = api.Entities.Group;
using User = api.Entities.User;

namespace api.Helpers
{
    public class DataMerger
    {
        public static UserDto MergeUserWithAzureData(User userFromRepo, Microsoft.Graph.User userFromAzureAd,
            IMapper mapper)
        {
            var dtoFromDb = mapper.Map<UserDto>(userFromRepo);
            return mapper.Map(userFromAzureAd, dtoFromDb);
        }

        public static IEnumerable<UserDto> MergeUsersWithAzureData(IEnumerable<User> usersFromRepo,
            Microsoft.Graph.IGraphServiceUsersCollectionPage allUsersFromAzureAd, IMapper mapper)
        {
            var mergedUsers = (from userFromRepo in usersFromRepo
                from dbUserFromAzureAd in allUsersFromAzureAd
                where userFromRepo.Id == Guid.Parse(dbUserFromAzureAd.Id)
                let dtoFromDb = mapper.Map<UserDto>(userFromRepo)
                select mapper.Map(dbUserFromAzureAd, dtoFromDb))
                .OrderByDescending(u=>u.Surname)
                .ThenBy(u => u.GivenName)
                .ThenBy(u => u.DisplayName);
            return mergedUsers;
        }


        public static IEnumerable<UserDto> MergeUsersWithAzureData(IEnumerable<User> usersFromRepo,
            IGroupMembersCollectionWithReferencesPage usersFromAzureAd, IMapper mapper)
        {
            var mergedUsers = (from userFromRepo in usersFromRepo
                from dbUserFromAzureAd in usersFromAzureAd
                where userFromRepo.Id == Guid.Parse(dbUserFromAzureAd.Id)
                let dtoFromDb = mapper.Map<UserDto>(userFromRepo)
                select mapper.Map(dbUserFromAzureAd, dtoFromDb))
                .OrderByDescending(u=>u.Surname)
                .ThenBy(u => u.GivenName)
                .ThenBy(u => u.DisplayName);

            return mergedUsers;
        }


        public static GroupDto MergeGroupWithAzureData(Group groupFromRepo, Microsoft.Graph.Group groupFromAzureAd,
            IMapper mapper)
        {
            var dtoGroupFromDb = mapper.Map<GroupDto>(groupFromRepo);

            return mapper.Map(groupFromAzureAd, dtoGroupFromDb);
        }
        
        public static IEnumerable<GroupDto> MergeGroupsWithAzureData(IEnumerable<Group> groupsFromRepo,
            IEnumerable<Microsoft.Graph.Group> allGroupsFromAzureAd, IMapper mapper)
        {
            var mergedGroups = (from groupFromRepo in groupsFromRepo
                from dbGroupFromAzureAd in allGroupsFromAzureAd
                where groupFromRepo.Id == Guid.Parse(dbGroupFromAzureAd.Id)
                let dtoFromDb = mapper.Map<GroupDto>(groupFromRepo)
                select mapper.Map(dbGroupFromAzureAd, dtoFromDb))
                .OrderBy(g=> g.DisplayName);

            return mergedGroups;
        }

        public static List<string> MergeLists(List<string> list1, List<string> list2)
        {
            if (list1.Count > 0 && list2.Count > 0)
            {
                foreach (var item in list2)
                {
                    if (!list1.Contains(item))
                    {
                        list1.Add(item);
                    }
                }

                return list1;
            }

            if (list1.Count > 0)
            {
                return list1;
            }

            return list2;
        }
        
        public static IEnumerable<AccessLogDto> MergeAccessLogData(IEnumerable<Access> accessLogsFromRepo,
            Microsoft.Graph.IGraphServiceUsersCollectionPage allUsersFromAzureAd, 
            IEnumerable<SmartLock> allSmartLocksFromRepo, IMapper mapper)
        {
            var logsFromRepo = accessLogsFromRepo.ToList();
        
            var mergedUserLogs = (from logFromRepo in logsFromRepo
                    from dbUserFromAzureAd in allUsersFromAzureAd
                    where logFromRepo.UserId == Guid.Parse(dbUserFromAzureAd.Id)
                    let dtoFromDb = mapper.Map<AccessLogDto>(logFromRepo)
                    select mapper.Map(dbUserFromAzureAd, dtoFromDb))
                .OrderByDescending(al => al.Time).ToList();

            var mergedSmartLockLogs = (from logFromRepo in logsFromRepo
                from smartLockFromRepo in allSmartLocksFromRepo
                where logFromRepo.SmartLockId == smartLockFromRepo.Id
                let dtoFromDb = mapper.Map<AccessLogDto>(logFromRepo)
                select mapper.Map(smartLockFromRepo, dtoFromDb)).ToList();
            
            
            foreach (var ul in mergedUserLogs)
            {
                foreach (var sll in mergedSmartLockLogs)
                {
                    if (ul.SmartLockId == sll.SmartLockId)
                    {
                        ul.SmartLockTitle = sll.SmartLockTitle;
                    }
                }
                        
            }
            
            var x = mergedUserLogs;
            return mergedUserLogs;
        }

    }
}