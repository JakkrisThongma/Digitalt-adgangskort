using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
	[Table("Employees")]
	public class Employee
	{
		public int EmployeeId { get; set; }
		public string Firstname { get; set; }
		public string Lastname { get; set; }
		public string DayOfBirth { get; set; }
		public int PhoneNumber { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public ICollection<EmployeeAccessLevel> EmployeeAccessLevels { get; set; }
	}
}
