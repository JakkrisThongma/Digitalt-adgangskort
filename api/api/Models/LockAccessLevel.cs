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

		public int LockId { get; set; }
		public Doorlock Lock { get; set; }
	}
}
