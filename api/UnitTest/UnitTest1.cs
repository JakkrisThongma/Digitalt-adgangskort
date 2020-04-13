using api.Controllers;
using api.MappingProfiles;
using api.Repositories;
using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

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
			var controller = new GroupsController(new GroupRepositoryStub(), new AzureAdRepository(), _mapper);
			var group = controller.GetGroups();
		}

	}
}
