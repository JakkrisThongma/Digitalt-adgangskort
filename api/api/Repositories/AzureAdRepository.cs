using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using api.Services;
using Microsoft.Graph;

namespace api.Repositories
{
    public class AzureAdRepository : IAzureAdRepository
    {
        public async Task<User> GetUser(GraphServiceClient client, string userId)
        {
            if (client == null)
            {
                throw new ArgumentNullException(nameof(client));
            }
            if (userId == null)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            var user = await client.Users[userId].Request().GetAsync();
            return user;
        }

        public async Task<Stream> GetUserPhoto(GraphServiceClient client, string userId)
        {
            if (client == null)
            {
                throw new ArgumentNullException(nameof(client));
            }
            if (userId == null)
            {
                throw new ArgumentNullException(nameof(userId));
            }

            var pictureStream = await client.Users[userId].Photo.Content.Request().GetAsync();

            return pictureStream;
        }

        public async Task<List<string>> GetUserGroupsIds(GraphServiceClient client,
            string userId)
        {
            if (client == null)
            {
                throw new ArgumentNullException(nameof(client));
            }
            if (userId == null)
            {
                throw new ArgumentNullException(nameof(userId));
            }
            var userGroups = await client.Users[userId].GetMemberGroups(true).Request().PostAsync();
            return userGroups.ToList();
        }

        public async Task<IGraphServiceUsersCollectionPage> GetUsers(GraphServiceClient client)
        {
            if (client == null)
            {
                throw new ArgumentNullException(nameof(client));
            }
            var userList = await client.Users.Request().GetAsync();

            return userList;
        }
        
        public async Task<Group> GetGroup(GraphServiceClient client, string groupId)
        {
            if (client == null)
            {
                throw new ArgumentNullException(nameof(client));
            }
            if (groupId == null)
            {
                throw new ArgumentNullException(nameof(groupId));
            }
            var group = await client.Groups[groupId].Request().GetAsync();

            return group;
        }
        
        public async Task<IGroupMembersCollectionWithReferencesPage> GetGroupMembers(GraphServiceClient client,
            string groupId)
        {
            if (client == null)
            {
                throw new ArgumentNullException(nameof(client));
            }
            if (groupId == null)
            {
                throw new ArgumentNullException(nameof(groupId));
            }
            var members = await client.Groups[groupId]
                .Members
                .Request()
                .GetAsync();
            
            return members;
        }
        
        public async Task<IGraphServiceGroupsCollectionPage> GetGroups()
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            
            var groupList = await client.Groups.Request()
                .Filter("securityEnabled eq true")
                .GetAsync();
            return groupList;
        }
    }
}