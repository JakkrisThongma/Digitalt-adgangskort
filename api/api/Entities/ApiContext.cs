using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace api.Entities
{
    public class ApiContext : DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options)
        {
        }
        
        public DbSet<SmartLock> SmartLocks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Group> Groups { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SmartLockGroup>()
                .HasKey(lg => new {LockId = lg.SmartLockId, lg.GroupId});

            modelBuilder.Entity<SmartLockGroup>()
                .HasOne(lg => lg.SmartLock)
                .WithMany(l => l.SmartLockGroups)
                .HasForeignKey(lg => lg.SmartLockId);

            modelBuilder.Entity<SmartLockGroup>()
                .HasOne(lg => lg.Group)
                .WithMany(g => g.SmartLockGroups)
                .HasForeignKey(lg => lg.GroupId);

            modelBuilder.Entity<SmartLockUser>()
                .HasKey(lg => new {LockId = lg.SmartLockId, lg.UserId});

            modelBuilder.Entity<SmartLockUser>()
                .HasOne(lu => lu.SmartLock)
                .WithMany(l => l.SmartLockUsers)
                .HasForeignKey(lu => lu.SmartLockId);

            modelBuilder.Entity<SmartLockUser>()
                .HasOne(lu => lu.User)
                .WithMany(u => u.SmartLockUsers)
                .HasForeignKey(lu => lu.UserId);
        }
        public static readonly ILoggerFactory MyLoggerFactory
            = LoggerFactory.Create(builder =>
            {
                builder
                    .AddFilter((category, level) =>
                        category == DbLoggerCategory.Database.Command.Name
                        && level == LogLevel.Information)
                    .AddConsole();
            });

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .UseLoggerFactory(MyLoggerFactory);

    }
}