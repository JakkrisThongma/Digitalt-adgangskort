using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
	[Table("Ansatte")]
	public class Employee
	{
		public int EmployeeId { get; set; }
		public string Firstname { get; set; }
		public string Lastname { get; set; }
		public int DayOfBirth { get; set; }
		public int PhoneNumber { get; set; }
		public int MyProperty { get; set; }
	}
}
