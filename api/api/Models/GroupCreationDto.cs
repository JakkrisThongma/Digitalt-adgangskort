using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Types;
using api.ValidationAttributes;

namespace api.Models
{
	public class GroupCreationDto
	{
		[NonEmptyGuid]
		public Guid Id { get; set; }

		public Status Status { get; set; }
		
		public ICollection<SmartLockCollectionDto> SmartLockGroups { get; set; }
			= new List<SmartLockCollectionDto>();
	}
}
