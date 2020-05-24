using System;
using System.Threading.Tasks;
using api.Repositories;
using api.Services;
using Microsoft.Graph;
using Xunit;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;


namespace UnitTest

{
    public class AzureAdRepositoryTest
    {
        [Fact]
        public async Task GetUser_GraphServiceClientIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var azureRepository = new AzureAdRepository();
            
            // Act
            await Assert.ThrowsExceptionAsync<ArgumentNullException>( 
                // Act
                () => azureRepository.GetUser(null, "test"));
        }
        
        [Fact]
        public async Task GetUsers_GraphServiceClientIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var azureRepository = new AzureAdRepository();
            
            // Act
            await Assert.ThrowsExceptionAsync<ArgumentNullException>( 
                // Act
                () => azureRepository.GetUsers(null));
        }
        
        [Fact]
        public async Task GetUser_UserIdIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var azureRepository = new AzureAdRepository();
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
 

            // Act
            await Assert.ThrowsExceptionAsync<ArgumentNullException>( 
                // Act
                () => azureRepository.GetUser(client, null));
        }
        
        [Fact]
        public async Task GetUserPhoto_GraphServiceClientIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var azureRepository = new AzureAdRepository();
            
            // Act
            await Assert.ThrowsExceptionAsync<ArgumentNullException>( 
                // Act
                () => azureRepository.GetUserPhoto(null, "test"));
        }
        
        [Fact]
        public async Task GetUserPhoto_UserIdIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var azureRepository = new AzureAdRepository();
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
 

            // Act
            await Assert.ThrowsExceptionAsync<ArgumentNullException>( 
                // Act
                () => azureRepository.GetUserPhoto(client, null));
        }
        
        [Fact]
        public async Task GetUserGroupIds_GraphServiceClientIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var azureRepository = new AzureAdRepository();
            
            // Act
            await Assert.ThrowsExceptionAsync<ArgumentNullException>( 
                // Act
                () => azureRepository.GetUserGroupsIds(null, "test"));
        }
        
        [Fact]
        public async Task GetUserPhoto_UserGroupIdsIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var azureRepository = new AzureAdRepository();
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
 

            // Act
            await Assert.ThrowsExceptionAsync<ArgumentNullException>( 
                // Act
                () => azureRepository.GetUserGroupsIds(client, null));
        }
        
        [Fact]
        public async Task GetGroup_UserGroupIdsIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var azureRepository = new AzureAdRepository();

            // Act
            await Assert.ThrowsExceptionAsync<ArgumentNullException>( 
                // Act
                () => azureRepository.GetGroup(null));
        }
        
        [Fact]
        public async Task GetGetGroupMembers_UserGroupIdsIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var azureRepository = new AzureAdRepository();
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
 

            // Act
            await Assert.ThrowsExceptionAsync<ArgumentNullException>( 
                // Act
                () => azureRepository.GetGroupMembers(client, null));
        }
        
        [Fact]
        public async Task GetGetGroupMembers_GraphServiceClientIsNull_ThrowsArgumentNullException()
        {
            // Arrange
            var azureRepository = new AzureAdRepository();
 

            // Act
            await Assert.ThrowsExceptionAsync<ArgumentNullException>( 
                // Act
                () => azureRepository.GetGroupMembers(null, "test"));
        }
        
        
        
        
        
        
        
        
    }
}