using System;
using System.Threading.Tasks;
using api.Entities;
using api.Repositories;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace UnitTest
{
    public class UserRepositoryTest
    {
        [Fact]
        public async Task GetUser_EmptyGuid_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory1")
                .Options;

            await using (var context = new ApiContext(options))
            {
                var userRepository = new UserRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () => userRepository.GetUser(Guid.Empty));
            }
        }
        
        [Fact]
        public void AddUser_UserIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;

            using (var context = new ApiContext(options))
            {
                var userRepository = new UserRepository(context);

                // Assert
                 Assert.Throws<ArgumentNullException>(
                    // Act
                    () => userRepository.AddUser(null));
            }
        }
        
        [Fact]
        public void DeleteUser_UserIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory3")
                .Options;

            using (var context = new ApiContext(options))
            {
                var userRepository = new UserRepository(context);

                // Assert
                Assert.Throws<ArgumentNullException>(
                    // Act
                    () => userRepository.DeleteUser(null));
            }
        }

        [Fact]
        public async Task GetUserSmartLocksIdList_EmptyGuid_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory4")
                .Options;

            await using (var context = new ApiContext(options))
            {
                var userRepository = new UserRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () => userRepository.GetUserSmartLocksIdList(Guid.Empty));
            }
        }
        
        [Fact]
        public async Task UserExists_EmptyGuid_ThrowsArgumentNullException()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory5")
                .Options;

            await using (var context = new ApiContext(options))
            {
                var userRepository = new UserRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () => userRepository.UserExists(Guid.Empty));
            }
        }
        
        


    }
}