using api.Entities;
using api.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Repositories
{
	public class GroupRepositoryStub : IGroupRepository
	{
		
		
		public void AddGroup(Group groupToAdd)
		{
		}

		public void DeleteGroup(Group groupFromRepo)
		{
			var groups = new List<Group>
			{
				new Group { Id = Guid.Parse("c374cb18-862e-4fef-871f-ae08337d1f76"), Status = Status.Active  },
				new Group { Id = Guid.Parse("1933c967-2e14-4e95-bdb0-54723595672d"), Status = Status.Inactive },
				new Group { Id = Guid.Parse("e44e9133-6f88-42b9-84ba-970f9293c87a"), Status = Status.Suspended },
				new Group { Id = Guid.Parse("e1f2df93-23b6-45ec-9e2f-a845fcd25cff"), Status = Status.Active}
			};

			
		}

		public Task<Group> GetGroup(Guid groupId)
		{
			if (groupId == Guid.Empty)
			{
				throw new ArgumentNullException(nameof(groupId));
			}
			
			var groups = new List<Group>
			{
				new Group { Id = Guid.Parse("c374cb18-862e-4fef-871f-ae08337d1f76"), Status = Status.Active  },
				new Group { Id = Guid.Parse("1933c967-2e14-4e95-bdb0-54723595672d"), Status = Status.Inactive },
				new Group { Id = Guid.Parse("e44e9133-6f88-42b9-84ba-970f9293c87a"), Status = Status.Suspended },
				new Group { Id = Guid.Parse("e1f2df93-23b6-45ec-9e2f-a845fcd25cff"), Status = Status.Active}
			};
			
			return Task.FromResult(groups.Find(g => g.Id == groupId));
		}

		public async Task<IEnumerable<Group>> GetGroups()
		{
			List<Group> groups = new List<Group>
			{
				new Group { Id = Guid.Parse("c374cb18-862e-4fef-871f-ae08337d1f76"), Status = Status.Active  },
				new Group { Id = Guid.Parse("1933c967-2e14-4e95-bdb0-54723595672d"), Status = Status.Inactive },
				new Group { Id = Guid.Parse("e44e9133-6f88-42b9-84ba-970f9293c87a"), Status = Status.Suspended },
				new Group { Id = Guid.Parse("e1f2df93-23b6-45ec-9e2f-a845fcd25cff"), Status = Status.Active}
			};	

			return await Task.FromResult(groups);
		}

		public Task<IEnumerable<SmartLock>> GetGroupSmartLocks(Guid groupId)
		{
			throw new NotImplementedException();
		}

		public Task<List<string>> GetGroupSmartLocksIdList(Guid groupId)
		{
			throw new NotImplementedException();
		}

		public Task<List<string>> GetGroupsSmartLocksIdList(List<string> groupsIdList)
		{
			throw new NotImplementedException();
		}

		public Task<bool> GroupExists(Guid groupId)
		{
			if (groupId == Guid.Empty)
			{
				throw new ArgumentNullException(nameof(groupId));
			}
			
			var groups = new List<Group>
			{
				new Group { Id = Guid.Parse("c374cb18-862e-4fef-871f-ae08337d1f76"), Status = Status.Active  },
				new Group { Id = Guid.Parse("1933c967-2e14-4e95-bdb0-54723595672d"), Status = Status.Inactive },
				new Group { Id = Guid.Parse("e44e9133-6f88-42b9-84ba-970f9293c87a"), Status = Status.Suspended },
				new Group { Id = Guid.Parse("e1f2df93-23b6-45ec-9e2f-a845fcd25cff"), Status = Status.Active}
			};

			return Task.FromResult(groups.Any(g => g.Id == groupId));
		}

		public Task<bool> Save()
		{
			throw new NotImplementedException();
		}

		public void UpdateGroup(Group groupToUpdate)
		{
			throw new NotImplementedException();
		}
	}
}
