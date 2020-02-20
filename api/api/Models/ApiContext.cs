using Microsoft.EntityFrameworkCore;

namespace api.Models
{
	public class ApiContext : DbContext
	{
		public ApiContext(DbContextOptions<ApiContext> options) : base(options)
		{

		}

		public DbSet<Lock> DoorLocks { get; set; }
		public DbSet<Employee> Employees { get; set; }
	}
}
