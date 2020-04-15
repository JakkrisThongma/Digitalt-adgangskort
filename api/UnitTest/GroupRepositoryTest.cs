using System;
using System.Threading.Tasks;
using api.Entities;
using api.Repositories;
using api.Services;
using Microsoft.EntityFrameworkCore;
using Xunit;
namespace UnitTest
{
    public class GroupRepositoryTest
    {
        [Fact]
        public async Task GetGroup_EmptyGuid_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;

            await using (var context = new ApiContext(options))
            {
                var groupRepository = new GroupRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () => groupRepository.GetGroup(Guid.Empty));
            }
        }
        
        [Fact]
        public void DeleteGroup_GroupIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;

            using (var context = new ApiContext(options))
            {
                var groupRepository = new GroupRepository(context);

                // Assert
                Assert.Throws<ArgumentNullException>(
                    // Act
                    () => groupRepository.DeleteGroup(null));
            }
        }
        
        [Fact]
        public void AddGroup_GroupIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;

            using (var context = new ApiContext(options))
            {
                var groupRepository = new GroupRepository(context);

                // Assert
                Assert.Throws<ArgumentNullException>(
                    // Act
                    () => groupRepository.AddGroup(null));
            }
        }
        
        [Fact]
        public async Task GetGroupSmartLocks_EmptyGuid_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;

            using (var context = new ApiContext(options))
            {
                var groupRepository = new GroupRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () => groupRepository.GetGroupSmartLocks(Guid.Empty));
            }
        }
        
        
        [Fact]
        public async Task GetGroupSmartLocksIdList_EmptyGuid_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;

            using (var context = new ApiContext(options))
            {
                var groupRepository = new GroupRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () => groupRepository.GetGroupSmartLocksIdList(Guid.Empty));
            }
        }
        
        [Fact]
        public async Task GetGroupsSmartLocksIdList_EmptyGroupsIdList_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;

            using (var context = new ApiContext(options))
            {
                var groupRepository = new GroupRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () => groupRepository.GetGroupsSmartLocksIdList(null));
            }
        }
        
        [Fact]
        public async Task GroupExists_EmptyGuid_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;

            using (var context = new ApiContext(options))
            {
                var groupRepository = new GroupRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () => groupRepository.GroupExists(Guid.Empty));
            }
        }
        
    }
}