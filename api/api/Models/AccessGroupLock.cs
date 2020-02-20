using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class AccessGroupLock
	{
		public int AccessGroupID { get; set; }
		public AccessGroup AccessGroup { get; set; }

		public int LockId { get; set; }
		public Lock Lock { get; set; }

	}
}
