using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class AccessGroup
	{
		public int AccessGroupId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public ICollection<AccessGroupLock> AccessGroupLocks { get; set; }
		public ICollection<EmployeeAccess> EmployeeAccesses { get; set; }

	}
}
