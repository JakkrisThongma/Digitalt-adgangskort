using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class DoorLock
	{
		public int DoorLockId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public ICollection<LockAccessLevel> LockAccessLevels { get; set; }
	}
}
