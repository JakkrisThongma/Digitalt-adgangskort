using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class AccessLevel
	{
		public int AccessLevelId { get; set; }
		public string Title { get; set; }
		public ICollection<EmployeeAccessLevel> EmployeeAccessLevels { get; set; }
		public ICollection<LockAccessLevel> LockAccessLevels { get; set; }

	}
}
