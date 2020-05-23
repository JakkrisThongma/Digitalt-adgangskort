using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using api.Configuration;
using api.Helpers;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using Group = Microsoft.Graph.Group;
using User = api.Entities.User;

namespace api.Controllers
{
    [Produces("application/json")]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly ISmartLockRepository _smartLockRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IIdentityService _identityService;

        private readonly IMapper _mapper;


        public UsersController(IUserRepository userRepository, IGroupRepository groupRepository,
            IAzureAdRepository azureAdRepository, ISmartLockRepository smartLockRepository,
            IIdentityService identityService, IMapper mapper)
        {
            _userRepository = userRepository ??
                              throw new ArgumentNullException(nameof(userRepository));
            _groupRepository = groupRepository ??
                               throw new ArgumentNullException(nameof(groupRepository));
            _smartLockRepository = smartLockRepository ??
                                   throw new ArgumentNullException(nameof(smartLockRepository));
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(_azureAdRepository));
            
            _identityService = identityService ??
                               throw new ArgumentNullException(nameof(identityService));
            
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }

        // GET: /api/users
        /// <summary>
        /// Get a list of db users
        /// </summary>
        /// <returns>An ActionResult task of type IEnumerable of UserDto</returns>
        /// <response code="200">Users retrieved successfully</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="404">No users found</response>
        [Authorize("admin")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var allUsersFromRepo = await _userRepository.GetUsers();

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var allUsersFromAzureAd = await _azureAdRepository.GetUsers(client);

            var mergedUsers = DataMerger.MergeUsersWithAzureData(allUsersFromRepo,
                allUsersFromAzureAd, _mapper);

            return Ok(mergedUsers);
        }

        // POST: /api/users
        /// <summary>
        /// Add Azure Ad user to db
        /// </summary>
        /// <param name="userToAdd">The user to add</param>
        /// <returns>An ActionResult of type UserDto</returns>
        /// <response code="201">User created successfully</response>
        /// <response code="404">Azure Ad user not found</response>
        /// <response code="409">User already exist in db</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [Authorize("admin")]
        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] UserCreationDto userToAdd)
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            try
            {
                await _azureAdRepository.GetUser(client, userToAdd.Id.ToString());
            }
            catch (ServiceException e)
            {
                if (e.StatusCode == HttpStatusCode.NotFound)
                {
                    ModelState.AddModelError("azureAdUserNotFound",
                        $"User with id: {userToAdd.Id} was not found on Azure AD");
                }
            }

            var userExists = await _userRepository.UserExists(userToAdd.Id);
            if (userExists) return Conflict("User already exists");
            if (userToAdd.SmartLockUsers.Count > 0)
            {
                foreach (var smartLockUser in userToAdd.SmartLockUsers)
                {
                    var smartLockExist = await _smartLockRepository.SmartLockExists(smartLockUser.SmartLockId);
                    if (!smartLockExist)
                    {
                        ModelState.AddModelError("smartLockNotExist",
                            $"Smart lock with id: {smartLockUser.SmartLockId} doesn't exist");
                    }
                }
            }
            
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }
            
            var userEntity = _mapper.Map<User>(userToAdd);
            _userRepository.AddUser(userEntity);
            await _userRepository.Save();
            var userDto = _mapper.Map<UserDto>(userEntity);
            
            return CreatedAtAction("GetUser", new {userId = userDto.Id}, userDto);
        }
        
        // GET: /api/users/userId
        /// <summary>
        /// Get a db user by id
        /// </summary>
        /// <param name="userId">The id of the user to get</param>
        /// <returns>An ActionResult task of type UserDto</returns>
        /// <response code="200">User retrieved successfully</response>
        /// <response code="404">user from db not found</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [Authorize("admin")]
        [HttpGet("{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDto>> GetUser(Guid userId)
        {
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();

            var userFromRepo = await _userRepository.GetUser(userId);

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var userFromAzureAd = await _azureAdRepository.GetUser(client, userId.ToString());

            var mergedUser = DataMerger.MergeUserWithAzureData(userFromRepo, userFromAzureAd, _mapper);

            return Ok(mergedUser);
        }
        
        // PATCH: /api/users/userId
        /// <summary>
        ///  Update db user partially
        /// </summary>
        /// <param name="userId">The id of the user to get</param>
        /// <param name="patchDocument">The set of operations to apply to the user</param>
        /// <returns>An ActionResult of type NoContent</returns>
        /// <remarks>Sample request (this request updates the users's **status**)  
        /// 
        /// [ 
        ///     {
        ///         "op": "replace", 
        ///         "path": "/status", 
        ///         "value": "new status" 
        ///     } 
        /// ] 
        /// </remarks>
        /// <response code="204">User updated successfully</response>
        /// <response code="404">User not found in db</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [Authorize("admin")]
        [HttpPatch("{userId}")]
        [Consumes("application/json-patch+json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateUserPartially(Guid userId,
            [FromBody] JsonPatchDocument<UserModificationDto> patchDocument)
        {
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();

            var userFromRepo = await _userRepository.GetUserWithSmartLocks(userId);
            
            var userToPatch = _mapper.Map<UserModificationDto>(userFromRepo);
            
            patchDocument.ApplyTo(userToPatch, ModelState);
            
            if (userToPatch.SmartLockUsers.Count > 0)
            {
                foreach (var smartLockUser in userToPatch.SmartLockUsers)
                {
                    var smartLockExist = await _smartLockRepository.SmartLockExists(smartLockUser.SmartLockId);
                    if (!smartLockExist)
                    {
                        ModelState.AddModelError("smartLockNotExist",
                            $"Smart lock with id: {smartLockUser.SmartLockId} doesn't exist");
                    }
                }
            }

            if (!TryValidateModel(userToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(userToPatch, userFromRepo);
            
            userFromRepo.LastModificationDate = new DateTimeOffset(DateTime.Now);
            _userRepository.UpdateUser(userFromRepo);
            await _userRepository.Save();

            return NoContent();
        }

        // DELETE: api/users/userId
        /// <summary>
        /// Delete user from db
        /// </summary>
        /// <param name="userId">The id of user to delete</param>
        /// <returns>An ActionResult of type no content</returns>
        /// <response code="204">User deleted successfully</response>
        /// <response code="404">User not found in db</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [Authorize("admin")]
        [HttpDelete("{userId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();

            var userFromRepo = await _userRepository.GetUser(userId);

            _userRepository.DeleteUser(userFromRepo);
            await _userRepository.Save();

            return NoContent();
        }

        //GET: api/users/userId/groups
        /// <summary>
        /// Get a list of Azure Ad groups which are added to db for a db user
        /// </summary>
        /// <param name="userId">The id of user to get a list of the user's groups</param>
        /// <returns>An ActionResult task of type IEnumerable of GroupDto</returns>
        /// <response code="200">User Azure Ad groups retrieved successfully</response>
        /// <response code="404">User have no groups in Azure Ad</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [Authorize("admin")]
        [HttpGet("{userId}/groups")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups(Guid userId)
        {
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();

            var allGroupsFromRepo = await _groupRepository.GetGroups();

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var userGroupsIdsFromAzureAd = await _azureAdRepository
                .GetUserGroupsIds(client, userId.ToString());

            var userGroupsFromAzureAd = new List<Group>();

            foreach (var groupId in userGroupsIdsFromAzureAd)
            {
                var group = await _azureAdRepository
                    .GetGroup(groupId.ToString());
                userGroupsFromAzureAd.Add(group);
            }

            var mergedGroups = DataMerger.MergeGroupsWithAzureData(allGroupsFromRepo,
                userGroupsFromAzureAd, _mapper);

            return Ok(mergedGroups);
        }

        // GET: api/users/userId/smart-locks
        /// <summary>
        /// Get a list of smart locks for a db user
        /// </summary>
        /// <param name="userId">The id of user to get a list of the user's smart locks</param>
        /// <returns>An ActionResult task of type IEnumerable of SmartLockDto</returns>
        /// <response code="200">User smart locks retrieved successfully</response>
        /// <response code="404">User have no smart locks</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [Authorize("admin")]
        [HttpGet("{userId}/smart-locks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<SmartLockDto>>> GetSmartLockGroups(Guid userId)
        {
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();
            
            var userSmartLocks = await _userRepository.GetUserSmartLocks(userId);

            var userSmartLocksDto = _mapper.Map<IEnumerable<SmartLockDto>>(userSmartLocks);

            return Ok(userSmartLocksDto);
        }
        
        // Get: /api/users/current
        /// <summary>
        /// Get user by token
        /// </summary>
        /// <returns>An ActionResult of type UserDto</returns>
        /// <response code="200">User with valid token retrieved successfully</response>
        /// <response code="401">Not authorized</response>
        /// <response code="404">User not found in db</response>
        /// <response code="400">Validation error</response>
        [Authorize]
        [HttpGet("current")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var userId = Guid.Parse(_identityService.GetId());
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();

            var userFromRepo = await _userRepository.GetUser(userId);

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var userFromAzureAd = await _azureAdRepository.GetUser(client, userId.ToString());

            var mergedUser = DataMerger.MergeUserWithAzureData(userFromRepo, userFromAzureAd, _mapper);

            return Ok(mergedUser);
        }
        
        // Get: /api/users/current/access-level
        /// <summary>
        /// Get access level for a user by token
        /// </summary>
        /// <returns>An ActionResult of type String</returns>
        /// <response code="200">Access level for a user with valid token retrieved successfully</response>
        /// <response code="401">Not authorized</response>
        /// <response code="404">User not found in db</response>
        /// <response code="400">Validation error</response>
        [Authorize]
        [HttpGet("current/access-level")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDto>> GetCurrentUserAccessLevel()
        {
            var userId = Guid.Parse(_identityService.GetId());
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();
            
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var userGroupsIdsFromAzureAd = await _azureAdRepository.GetUserGroupsIds(client, userId.ToString());

            var authSettings = Startup.Configuration.GetSection("AzureAd").Get<AzureAdOptions>();
            if(userGroupsIdsFromAzureAd.Contains(authSettings.AdminGroupId)){
                return Ok("admin");
            }

            return Ok("user");
        }
    }
}