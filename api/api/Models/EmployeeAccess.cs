using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace api.Models
{
	public class EmployeeAccess
	{
		public int EmployeeId { get; set; }
		public Employee Employee { get; set; }

		public int AccessGroupId { get; set; }
		public AccessGroup AccessGroup { get; set; }
	}
}
