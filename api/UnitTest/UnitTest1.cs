using api.Controllers;
using api.MappingProfiles;
using api.Repositories;
using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using api.Helpers;
using Microsoft.Graph;

namespace UnitTest
{
	[TestClass]
	public class UnitTest1
	{
		private IMapper _mapper;

		[TestInitialize]
		public void Initialize()
		{
			var groupProfile = new GroupMapper();
			var smartLockMapper = new SmartLockMapper();
			var userMapper = new UserMapper();

			var config = new MapperConfiguration(cfg =>
			{
				cfg.AddProfile(groupProfile);
				cfg.AddProfile(smartLockMapper);
				cfg.AddProfile(userMapper);
			});

			_mapper = new Mapper(config);
		}

		[TestMethod]
		public void TestMethod1()
		{
			var groupFromAzure = new List<Group>
			{
				new Group { Id = "8b4b5344-9050-4fd0-858b-5b93125341c9", DisplayName = "admin", Description = "admin", CreatedDateTime = DateTimeOffset.Parse("2020-03-19T22:37:35+00:00") },
				new Group { Id = "e1f2df93-23b6-45ec-9e2f-a845fcd25cff", DisplayName = "Employee", CreatedDateTime = DateTimeOffset.Parse("2020-03-20T00:02:08+00:00") },
				new Group { Id = "c374cb18-862e-4fef-871f-ae08337d1f76", DisplayName = "Group 1", Description = "Group 1", CreatedDateTime = DateTimeOffset.Parse("2020-04-11T11:22:09+00:00") },
				new Group { Id = "1933c967-2e14-4e95-bdb0-54723595672d", DisplayName = "Group 2", Description = "Group 2", CreatedDateTime = DateTimeOffset.Parse("2020-04-11T11:22:24+00:00") },
				new Group { Id = "e44e9133-6f88-42b9-84ba-970f9293c87a", DisplayName = "Group 3", Description = "Group 3", CreatedDateTime = DateTimeOffset.Parse("2020-04-11T11:22:32+00:00") }
			};
			
			List<api.Entities.Group> groupsFromRepo = new List<api.Entities.Group>
			{
				new api.Entities.Group { Id = Guid.Parse("c374cb18-862e-4fef-871f-ae08337d1f76"), Status = api.Types.Status.Active  },
				new api.Entities.Group { Id = Guid.Parse("1933c967-2e14-4e95-bdb0-54723595672d"), Status = api.Types.Status.Suspended },
				new api.Entities.Group { Id = Guid.Parse("e44e9133-6f88-42b9-84ba-970f9293c87a"), Status = api.Types.Status.Inactive },
				new api.Entities.Group { Id = Guid.Parse("e1f2df93-23b6-45ec-9e2f-a845fcd25cff"), Status = api.Types.Status.Active}
			};

			var azureAdRepository = new AzureAdRepositoryStub();
			var azAdGroups = azureAdRepository.GetGroups().Result;

			var mergedGroups = DataMerger.MergeGroupsWithAzureData(groupsFromRepo, azAdGroups, _mapper);
			
		}

	}
}
