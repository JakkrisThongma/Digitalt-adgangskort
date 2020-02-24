using Microsoft.EntityFrameworkCore;

namespace api.Models
{
	public class ApiContext : DbContext
	{
		public ApiContext(DbContextOptions<ApiContext> options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<AccessGroupLock>()
				.HasKey(agl => new {agl.AccessGroupId, agl.LockId});
			modelBuilder.Entity<AccessGroupLock>()
				.HasOne(agl => agl.AccessGroup)
				.WithMany(ag => ag.AccessGroupLocks)
				.HasForeignKey(ag => ag.AccessGroupId);
			modelBuilder.Entity<AccessGroupLock>()
				.HasOne(ag => ag.Lock)
				.WithMany(l => l.AccessGroupLocks)
				.HasForeignKey(l => l.LockId);

			modelBuilder.Entity<EmployeeAccess>()
				.HasKey(ea => new {ea.EmployeeId, ea.AccessGroupId});
			modelBuilder.Entity<EmployeeAccess>()
				.HasOne(ea => ea.Employee)
				.WithMany(ea => ea.EmployeeAccesses)
				.HasForeignKey(ea => ea.EmployeeId);
			modelBuilder.Entity<EmployeeAccess>()
				.HasOne(ea => ea.AccessGroup)
				.WithMany(ea => ea.EmployeeAccesses)
				.HasForeignKey(ea => ea.AccessGroupId);


		}

		public DbSet<Lock> Locks { get; set; }
		public DbSet<Employee> Employees { get; set; }
		public DbSet<EmployeeAccess> EmployeeAccesses { get; set; }
		public DbSet<AccessGroup> AccessGroups { get; set; }
		public DbSet<AccessGroupLock> AccessGroupLocks { get; set; }
	}
}
