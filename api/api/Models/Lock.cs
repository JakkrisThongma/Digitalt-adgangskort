using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
	public class Lock
	{
		public int LockId { get; set; }
		public string LockName { get; set; }
		public ICollection<LockAccessLevel> LockAccessLevels { get; set; }
	}
}
