using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Graph;

namespace api.Repositories
{
    public interface IAzureAdRepository
    {

        public Task<User> GetUser(GraphServiceClient client, string userId);
        
        public Task<Stream> GetUserPhoto(GraphServiceClient client, string userId);

        public Task<List<string>> GetUserGroupsIds(GraphServiceClient client, string userId);

        public Task<IGraphServiceUsersCollectionPage> GetUsers(GraphServiceClient client);
        
        public Task<Group> GetGroup(GraphServiceClient client, string groupId);


        public Task<IGroupMembersCollectionWithReferencesPage> GetGroupMembers(GraphServiceClient client,
            string groupId);


        public Task<IGraphServiceGroupsCollectionPage> GetGroups(GraphServiceClient client);



    }
}