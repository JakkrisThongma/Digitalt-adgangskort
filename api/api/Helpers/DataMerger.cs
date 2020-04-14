using System;
using System.Collections.Generic;
using System.Linq;
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
                select mapper.Map(dbUserFromAzureAd, dtoFromDb));

            return mergedUsers;
        }


        public static IEnumerable<UserDto> MergeUsersWithAzureData(IEnumerable<User> usersFromRepo,
            IGroupMembersCollectionWithReferencesPage usersFromAzureAd, IMapper mapper)
        {
            var mergedUsers = (from userFromRepo in usersFromRepo
                from dbUserFromAzureAd in usersFromAzureAd
                where userFromRepo.Id == Guid.Parse(dbUserFromAzureAd.Id)
                let dtoFromDb = mapper.Map<UserDto>(userFromRepo)
                select mapper.Map(dbUserFromAzureAd, dtoFromDb));

            return mergedUsers;
        }


        public static GroupDto MergeGroupWithAzureData(Group groupFromRepo, Microsoft.Graph.Group groupFromAzureAd,
            IMapper mapper)
        {
            var dtoGroupFromDb = mapper.Map<GroupDto>(groupFromRepo);

            return mapper.Map(groupFromAzureAd, dtoGroupFromDb);
        }

        public static IEnumerable<GroupDto> MergeGroupsWithAzureData(IEnumerable<Group> groupsFromRepo,
            IEnumerable<Microsoft.Graph.User> allGroupsFromAzureAd, IMapper mapper)
        {
            var mergedGroups = (from groupFromRepo in groupsFromRepo
                from dbGroupFromAzureAd in allGroupsFromAzureAd
                where groupFromRepo.Id == Guid.Parse(dbGroupFromAzureAd.Id)
                let dtoFromDb = mapper.Map<GroupDto>(groupFromRepo)
                select mapper.Map(dbGroupFromAzureAd, dtoFromDb));

            return mergedGroups;
        }

        public static IEnumerable<GroupDto> MergeGroupsWithAzureData(IEnumerable<Group> groupsFromRepo,
            IEnumerable<Microsoft.Graph.Group> allGroupsFromAzureAd, IMapper mapper)
        {
            var mergedGroups = (from groupFromRepo in groupsFromRepo
                from dbGroupFromAzureAd in allGroupsFromAzureAd
                where groupFromRepo.Id == Guid.Parse(dbGroupFromAzureAd.Id)
                let dtoFromDb = mapper.Map<GroupDto>(groupFromRepo)
                select mapper.Map(dbGroupFromAzureAd, dtoFromDb));

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
    }
}