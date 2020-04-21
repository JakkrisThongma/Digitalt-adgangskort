using System;
using System.Threading.Tasks;
using api.Entities;
using api.Repositories;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace UnitTest
{
    public class SmartLockRepositoryTest
    {
        [Fact]
        public async Task GetSmartLock_EmptySmartLockId_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;
            
            await using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () => smartLockRepository.GetSmartLock(Guid.Empty));
            }
        }
        
        [Fact]
        public void AddSmartLock_SmartLockIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;
            
             using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                 Assert.Throws<ArgumentNullException>(
                    // Act
                    () => smartLockRepository.AddSmartLock(null));
            }
        }
        
        
        [Fact]
        public void DeleteSmartLock_SmartLockIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;
            
            using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                Assert.Throws<ArgumentNullException>(
                    // Act
                    () => smartLockRepository.DeleteSmartLock(null));
            }
        }
        
        
        [Fact]
        public async Task GetSmartLockUsers_EmptySmartLockId_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;
            
            await using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () => smartLockRepository.GetSmartLockUsers(Guid.Empty));
            }
        }
        
        [Fact]
        public void AddSmartLockUser_SmartLockIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory")
                .Options;
            
            using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                Assert.Throws<ArgumentNullException>(
                    // Act
                    () => smartLockRepository.AddSmartLockUser(Guid.Empty, Guid.NewGuid()));
            }
        }
        
        [Fact]
        public void AddSmartLockUser_UserIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;
            
            using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                Assert.Throws<ArgumentNullException>(
                    // Act
                    () => smartLockRepository.AddSmartLockUser(Guid.NewGuid(), Guid.Empty));
            }
        }
        
        [Fact]
        public async Task GetSmartLockUser_UserIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;
            
            await using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () =>  smartLockRepository.GetSmartLockUser(Guid.NewGuid(), Guid.Empty));
            }
        }
        
        [Fact]
        public async Task GetSmartLockUser_SmartLockIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;
            
            await using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () =>  smartLockRepository.GetSmartLockUser(Guid.Empty,Guid.NewGuid()));
            }
        }
        
        [Fact]
        public void DeleteSmartLockUser_UserIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;
            
            using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                Assert.Throws<ArgumentNullException>(
                    // Act
                    () => smartLockRepository.DeleteSmartLockUser(Guid.NewGuid(), Guid.Empty));
            }
        }
        
        [Fact]
        public void DeleteSmartLockUser_SmartLockIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;
            
            using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                Assert.Throws<ArgumentNullException>(
                    // Act
                    () => smartLockRepository.DeleteSmartLockUser(Guid.Empty, Guid.NewGuid()));
            }
        }
        
        [Fact]
        public async Task GetSmartLockGroups_SmartLockIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;
            
            await using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () =>  smartLockRepository.GetSmartLockGroups(Guid.Empty));
            }
        }
        
        
        [Fact]
        public void AddSmartLockGroup_SmartLockIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;
            
            using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                Assert.Throws<ArgumentNullException>(
                    // Act
                    () => smartLockRepository.AddSmartLockGroup(Guid.Empty, Guid.NewGuid()));
            }
        }
        
        [Fact]
        public void AddSmartLockGroup_UserIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;
            
            using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                Assert.Throws<ArgumentNullException>(
                    // Act
                    () => smartLockRepository.AddSmartLockGroup(Guid.NewGuid(),Guid.Empty));
            }
        }
        
        [Fact]
        public async Task GetSmartLockGroup_SmartLockIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;
            
            await using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () =>  smartLockRepository.GetSmartLockGroup(Guid.Empty, Guid.NewGuid()));
            }
        }
        
        [Fact]
        public async Task GetSmartLockGroup_GroupIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;
            
            await using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                await Assert.ThrowsAsync<ArgumentNullException>(
                    // Act
                    () =>  smartLockRepository.GetSmartLockGroup(Guid.NewGuid(),Guid.Empty));
            }
        }
        
        [Fact]
        public void DeleteSmartLockGroup_SmartLockIdIsEmpty_ThrowsArgumentException()
        {
            var options = new DbContextOptionsBuilder<ApiContext>()
                .UseInMemoryDatabase("TestDbInMemory2")
                .Options;
            
            using (var context = new ApiContext(options))
            {
                var smartLockRepository = new SmartLockRepository(context);

                // Assert
                Assert.Throws<ArgumentNullException>(
                    // Act
                    () => smartLockRepository.DeleteSmartLockGroup(Guid.Empty, Guid.NewGuid()));
            }
        }
        
    }
}