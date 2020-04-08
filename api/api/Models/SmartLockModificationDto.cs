using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class SmartLockModificationDto
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public string ManufactureId { get; set; }
		public string Status { get; set; }
	}
}
