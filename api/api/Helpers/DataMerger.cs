using System;
using System.Collections.Generic;
using System.Linq;
using api.Entities;
using api.Models;
using AutoMapper;

namespace api.Helpers
{
    public class DataMerger
    {

        public static UserDto MergeUserWithAzureData(User userFromRepo, Microsoft.Graph.User userFromAzureAd, IMapper  mapper)
        {
            var dtoFromDb = mapper.Map<UserDto>(userFromRepo);
            return mapper.Map(userFromAzureAd, dtoFromDb);
        }
        
        public static IEnumerable<UserDto> MergeUsersWithAzureData(IEnumerable<User> usersFromRepo, 
            Microsoft.Graph.IGraphServiceUsersCollectionPage allUsersFromAzureAd, IMapper  mapper)
        {
            var mergedUsers = (from userFromRepo in usersFromRepo
                from dbUserFromAzureAd in allUsersFromAzureAd 
                where userFromRepo.Id == Guid.Parse(dbUserFromAzureAd.Id) 
                let dtoFromDb = mapper.Map<UserDto>(userFromRepo) 
                select mapper.Map(dbUserFromAzureAd, dtoFromDb));

            return mergedUsers;
        }
        
        public static GroupDto MergeGroupWithAzureData(Group groupFromRepo, Microsoft.Graph.Group groupFromAzureAd, IMapper  mapper)
        {
            var dtoGroupFromDb = mapper.Map<GroupDto>(groupFromRepo);

            return mapper.Map(groupFromAzureAd, dtoGroupFromDb);
        }
        
        public static IEnumerable<GroupDto> MergeGroupsWithAzureData(IEnumerable<Group> groupsFromRepo, 
            Microsoft.Graph.IGraphServiceGroupsCollectionPage allGroupsFromAzureAd, IMapper  mapper)
        {
            var mergedGroups = (from groupFromRepo in groupsFromRepo
                from dbGroupFromAzureAd in allGroupsFromAzureAd
                where groupFromRepo.Id == Guid.Parse(dbGroupFromAzureAd.Id)
                let dtoFromDb = mapper.Map<GroupDto>(groupFromRepo)
                select mapper.Map(dbGroupFromAzureAd, dtoFromDb));

            return mergedGroups;
        }
        
    }
}