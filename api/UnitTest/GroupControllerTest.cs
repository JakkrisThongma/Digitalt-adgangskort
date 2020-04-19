using api.Controllers;
using api.MappingProfiles;
using api.Repositories;
using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Entities;
using api.Models;
using api.Types;

namespace UnitTest
{
	[TestClass]
	public class GroupControllerTest
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
		public async Task DeleteGroup_UserNotExist_ThrowsNotFound()
		{
			// Arrange
			var controller = new GroupsController(new GroupRepositoryStub(), new UserRepositoryStub(),
				new SmartLockRepositoryStub(), new AzureAdRepositoryStub(), _mapper);
			
			var groupId = Guid.Parse("c374cb18-862e-4fef-871f-ae08337d1234");
			
			// Act
			var result = await controller.DeleteGroup(groupId);
			
			// Assert
			Assert.IsInstanceOfType(result, typeof(NotFoundResult));
		}
		
		
		[TestMethod]
		public async Task GroupById_GroupIdNotExist_NotFound()
		{
			// Arrange 
			var controller = new GroupsController(new GroupRepositoryStub(), new UserRepositoryStub(), 
				new SmartLockRepositoryStub(),new AzureAdRepositoryStub(), _mapper);
			var groupId = Guid.Parse("c374cb18-862e-4fef-871f-ae08337d1234");
			
			// Act
			var result = await controller.GetGroup(groupId);
			
			// Assert
			Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
		}
		
		[TestMethod]
		public async Task GetGroup_WithGroupId_ReturnsGroupGto()
		{
			// Arrange 
			var controller = new GroupsController(new GroupRepositoryStub(), new UserRepositoryStub(), 
				new SmartLockRepositoryStub(), new AzureAdRepositoryStub(), _mapper);
			var groupId = Guid.Parse("c374cb18-862e-4fef-871f-ae08337d1f76");
			
			// Act
			var result = await controller.GetGroup(groupId);
			
			// Assert
			Assert.AreEqual(Guid.Parse("c374cb18-862e-4fef-871f-ae08337d1f76"), result.Value.Id);
			Assert.AreEqual(api.Types.Status.Active, result.Value.Status);
			Assert.AreEqual("Group 1", result.Value.Description);
			Assert.AreEqual("Group 1", result.Value.DisplayName);



			
		}

		[TestMethod]
		public async Task GetGroups_Groups_ReturnsMergedGroupsStatusOk()
		{
			// Arrange
			var controller = new GroupsController(new GroupRepositoryStub(), new UserRepositoryStub(), 
				new SmartLockRepositoryStub(), new AzureAdRepositoryStub(), _mapper);
			
			var groups = new List<Group>
			{
				new Group { Id = Guid.Parse("c374cb18-862e-4fef-871f-ae08337d1f76"), Status = Status.Active  },
				new Group { Id = Guid.Parse("1933c967-2e14-4e95-bdb0-54723595672d"), Status = Status.Inactive },
				new Group { Id = Guid.Parse("e44e9133-6f88-42b9-84ba-970f9293c87a"), Status = Status.Suspended },
				new Group { Id = Guid.Parse("e1f2df93-23b6-45ec-9e2f-a845fcd25cff"), Status = Status.Active}
			};
			// Act
			var result = await controller.GetGroups();

			// Assert
			//Assert.AreEqual(4, result.Value.GetEnumerator());
			Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
		}

	}
}
