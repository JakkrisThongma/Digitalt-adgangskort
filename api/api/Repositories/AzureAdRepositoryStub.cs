using Microsoft.Graph;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace api.Repositories
{
	public class AzureAdRepositoryStub : IAzureAdRepository
	{
		public Task<Group> GetGroup(GraphServiceClient client, string groupId)
		{
			throw new NotImplementedException();
		}

		public Task<IGroupMembersCollectionWithReferencesPage> GetGroupMembers(GraphServiceClient client, string groupId)
		{
			throw new NotImplementedException();
		}

		public async Task<IGraphServiceGroupsCollectionPage> GetGroups(GraphServiceClient client)
		{

			Group groups = await client.Groups.Request()
				.AddAsync(
				new Group
				{
					Id = "8b4b5344-9050-4fd0-858b-5b93125341c9",
					DisplayName = "admin",
					Description = "admin",
					CreatedDateTime = DateTimeOffset.Parse("2020-03-19T22:37:35+00:00")
				});

			var groupList = await client.Groups.Request()
				.GetAsync();
			
			return groupList;

			//List<Group> group = new List<Group>
			//{
			//	new Group { Id = "8b4b5344-9050-4fd0-858b-5b93125341c9", DisplayName = "admin", Description = "admin", CreatedDateTime = DateTimeOffset.Parse("2020-03-19T22:37:35+00:00") },
			//	new Group { Id = "e1f2df93-23b6-45ec-9e2f-a845fcd25cff", DisplayName = "Employee", CreatedDateTime = DateTimeOffset.Parse("2020-03-20T00:02:08+00:00") },
			//	new Group { Id = "c374cb18-862e-4fef-871f-ae08337d1f76", DisplayName = "Group 1", Description = "Group 1", CreatedDateTime = DateTimeOffset.Parse("2020-04-11T11:22:09+00:00") },
			//	new Group { Id = "1933c967-2e14-4e95-bdb0-54723595672d", DisplayName = "Group 2", Description = "Group 2", CreatedDateTime = DateTimeOffset.Parse("2020-04-11T11:22:24+00:00") },
			//	new Group { Id = "e44e9133-6f88-42b9-84ba-970f9293c87a", DisplayName = "Group 3", Description = "Group 3", CreatedDateTime = DateTimeOffset.Parse("2020-04-11T11:22:32+00:00") }
			//};

			//GraphServiceGroupsCollectionPage collectionPage = new GraphServiceGroupsCollectionPage();
			//collectionPage.CurrentPage.Add(
			//	new Group 
			//	{ 
			//		Id = "8b4b5344-9050-4fd0-858b-5b93125341c9", 
			//		DisplayName = "admin", 
			//		Description = "admin", 
			//		CreatedDateTime = DateTimeOffset.Parse("2020-03-19T22:37:35+00:00") 
			//	});
		}

		public Task<User> GetUser(GraphServiceClient client, string userId)
		{
			throw new NotImplementedException();
		}

		public Task<List<string>> GetUserGroupsIds(GraphServiceClient client, string userId)
		{
			throw new NotImplementedException();
		}

		public Task<Stream> GetUserPhoto(GraphServiceClient client, string userId)
		{
			throw new NotImplementedException();
		}

		public Task<IGraphServiceUsersCollectionPage> GetUsers(GraphServiceClient client)
		{
			throw new NotImplementedException();
		}
	}
}
