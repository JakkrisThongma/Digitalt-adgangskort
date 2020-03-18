using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class LockAccessLevel
	{
		public int AccessLevelId { get; set; }
		public AccessLevel AccessLevel { get; set; }

		public int DoorLockId { get; set; }
		public DoorLock DoorLock { get; set; }
	}
}
