using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class Lock
	{
		public int LookId { get; set; }
		public string LockName { get; set; }
		public virtual List<AccessGroup> AccessGroups { get; set; }
	}
}
