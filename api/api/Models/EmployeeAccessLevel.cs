using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class EmployeeAccessLevel
	{
		public int EmployeeId { get; set; }
		public Employee Employee { get; set; }

		public int AccessLevelId { get; set; }
		public AccessLevel AccessLevel { get; set; }
	}
}
