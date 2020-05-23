using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using api.Entities;
using api.Helpers;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;


namespace api.Controllers
{
    [Authorize("admin")]
    [Produces("application/json")]
    [Route("api/smart-locks")]
    [ApiController]
    public class SmartLocksController : ControllerBase
    {
        private readonly ISmartLockRepository _smartLockRepository;
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IAccessRepository _accessRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<SmartLocksController> _logger;

        public SmartLocksController(ISmartLockRepository smartLockRepository,
            IUserRepository userRepository, IGroupRepository groupRepository,
            IAzureAdRepository azureAdRepository, IAccessRepository accessRepository, IMapper mapper,
            ILogger<SmartLocksController> logger)
        {
            _smartLockRepository = smartLockRepository ??
                                   throw new ArgumentNullException(nameof(smartLockRepository));
            _userRepository = userRepository ??
                              throw new ArgumentNullException(nameof(userRepository));
            _groupRepository = groupRepository ??
                               throw new ArgumentNullException(nameof(groupRepository));
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(azureAdRepository));
            _accessRepository = accessRepository ??
                                   throw new ArgumentNullException(nameof(accessRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
            _logger = logger ??
                      throw new ArgumentNullException(nameof(logger));
        }

        // GET: /api/smart-locks
        /// <summary>
        /// Get a list of smart locks
        /// </summary>
        /// <returns>An ActionResult task of type IEnumerable of SmartLockDto</returns>
        /// <response code="200">Smart-locks retrieved successfully</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="404">No smart-locks found</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<SmartLockDto>>> GetSmartLocks()
        {
            var smartLocksFromRepo = await _smartLockRepository.GetSmartLocks();
            var smartLocksDto = _mapper.Map<IEnumerable<SmartLockDto>>(smartLocksFromRepo);

            return Ok(smartLocksDto);
        }

        // POST: /api/smart-locks
        /// <summary>
        /// Add smart lock to db
        /// </summary>
        /// <param name="smartLock">The smart lock to add</param>
        /// <returns>An ActionResult of type SmartLockDto</returns>
        /// <response code="201">Smart-lock created successfully</response>
        /// <response code="404">The user or group in the payload was not found</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SmartLockDto>> CreateSmartLock(SmartLockCreationDto smartLock)
        {
            if (smartLock.SmartLockUsers.Count > 0)
            {
                foreach (var smartLockUser in smartLock.SmartLockUsers)
                {
                    var userExist = await _userRepository.UserExists(smartLockUser.UserId);
                    if (!userExist)
                        ModelState.AddModelError("userNotExist",
                            $"User with id: {smartLockUser.UserId} doesn't exist");
                }
            }

            if (smartLock.SmartLockGroups.Count > 0)
            {
                foreach (var smartLockGroup in smartLock.SmartLockGroups)
                {
                    var groupExist = await _groupRepository.GroupExists(smartLockGroup.GroupId);
                    if (!groupExist)
                        ModelState.AddModelError("groupNotExist",
                            $"Group with id: {smartLockGroup.GroupId} doesn't exist");
                }
            }

            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }
            
            var smartLockEntity = _mapper.Map<SmartLock>(smartLock);
            _smartLockRepository.AddSmartLock(smartLockEntity);
            await _smartLockRepository.Save();
            var smartLockDto = _mapper.Map<SmartLockDto>(smartLockEntity);

            return CreatedAtAction("GetSmartLock", new {smartLockId = smartLockDto.Id}, smartLockDto);
        }

        // GET: /api/smart-locks/5
        /// <summary>
        /// Get a smart lock from db by id
        /// </summary>
        /// <param name="smartLockId">The id of the smart lock to get</param>
        /// <returns>An ActionResult task of type SmartLockDto</returns>
        /// <response code="200">Smart lock retrieved successfully</response>
        /// <response code="404">Smart lock from db not found</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [HttpGet("{smartLockId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SmartLockDto>> GetSmartLock(Guid smartLockId)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var smartLockFromRepo = await _smartLockRepository.GetSmartLock(smartLockId);

            var smartLock = _mapper.Map<SmartLockDto>(smartLockFromRepo);

            return Ok(smartLock);
        }

        // PATCH: /api/smart-locks/5
        /// <summary>
        ///  Update smart lock partially
        /// </summary>
        /// <param name="smartLockId">The id of the smart lock to get</param>
        /// <param name="patchDoc">The set of operations to apply to the smart lock</param>
        /// <returns>An ActionResult of type NoContent</returns>
        /// <remarks>Sample request (this request updates the smart lock's **status**)  
        /// 
        /// [ 
        ///     {
        ///         "op": "replace", 
        ///         "path": "/status", 
        ///         "value": "new status" 
        ///     } 
        /// ] 
        /// </remarks>
        /// <response code="204">smart lock updated successfully</response>
        /// <response code="404">smart lock not found in db</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [HttpPatch("{smartLockId}")]
        [Consumes("application/json-patch+json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateSmartLockPartially(Guid smartLockId,
            [FromBody] JsonPatchDocument<SmartLockModificationDto> patchDoc)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var smartLockFromRepo = await _smartLockRepository.GetSmartLockWithGroupsAndUsers(smartLockId);
            
            var smartLockToPatch = _mapper.Map<SmartLockModificationDto>(smartLockFromRepo);

            patchDoc.ApplyTo(smartLockToPatch, ModelState);
            
            if (smartLockToPatch.SmartLockUsers.Count > 0)
            {
                foreach (var smartLockUser in smartLockToPatch.SmartLockUsers)
                {
                    var userExist = await _userRepository.UserExists(smartLockUser.UserId);
                    if (!userExist)
                        ModelState.AddModelError("userNotExist",
                            $"User with id: {smartLockUser.UserId} doesn't exist");
                }
            }

            if (smartLockToPatch.SmartLockGroups.Count > 0)
            {
                foreach (var smartLockGroup in smartLockToPatch.SmartLockGroups)
                {
                    var groupExist = await _groupRepository.GroupExists(smartLockGroup.GroupId);
                    if (!groupExist)
                        ModelState.AddModelError("groupNotExist",
                            $"Group with id: {smartLockGroup.GroupId} doesn't exist");
                }
            }

            if (!TryValidateModel(smartLockToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(smartLockToPatch, smartLockFromRepo);
            
            smartLockFromRepo.LastModificationDate = new DateTimeOffset(DateTime.Now);
            _smartLockRepository.UpdateSmartLock(smartLockFromRepo);
            await _smartLockRepository.Save();

            return NoContent();
        }

        // DELETE: /api/smart-locks/5
        /// <summary>
        /// Delete smart lock from db
        /// </summary>
        /// <param name="smartLockId">The id of smart lock to delete</param>
        /// <returns>An ActionResult of type no content</returns>
        /// <response code="204">Smart lock deleted successfully</response>
        /// <response code="404">Smart lock not found in db</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [HttpDelete("{smartLockId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteSmartLock(Guid smartLockId)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var smartLockFromRepo = await _smartLockRepository.GetSmartLock(smartLockId);

            _smartLockRepository.DeleteSmartLock(smartLockFromRepo);
            await _smartLockRepository.Save();

            return NoContent();
        }

        // GET: /api/smart-locks/5/users
        /// <summary>
        /// Get a list of smart lock's users by smart lock id
        /// </summary>
        /// <param name="smartLockId">The id of smart lock to get the smart lock's users</param>
        /// <returns>An ActionResult task of type IEnumerable of UserDto</returns>
        /// <response code="200">User retrieved successfully</response>
        /// <response code="404">Smart lock id not found in db</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [HttpGet("{smartLockId}/users")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetSmartLockUsers(Guid smartLockId)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var allSmartLockUsersFromRepo = await _smartLockRepository.GetSmartLockUsers(smartLockId);

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var allUsersFromAzureAd = await _azureAdRepository.GetUsers(client);

            var mergedSmartLockUsers = DataMerger.MergeUsersWithAzureData(
                allSmartLockUsersFromRepo, allUsersFromAzureAd, _mapper);

            return Ok(mergedSmartLockUsers);
        }

        // Post: /api/smart-locks/5/users
        /// <summary>
        /// Add user to smart lock or add smart lock to user
        /// </summary>
        /// <param name="smartLockId">The smart lock to add smart lock's user</param>
        /// <param name="smartLockUser">The user to add</param>
        /// <returns>An ActionResult of type UserDto</returns>
        /// <response code="201">Smart lock user created successfully</response>
        /// <response code="404">Azure Ad user not found</response>
        /// <response code="409">User already exist for this smart lock</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [HttpPost("{smartLockId}/users")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<UserDto>>> AddSmartLockUser(Guid smartLockId,
            SmartLockUserCreationDto smartLockUser)
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            try
            {
                await _azureAdRepository.GetUser(client, smartLockUser.UserId.ToString());
            }
            catch (ServiceException e)
            {
                if (e.StatusCode == HttpStatusCode.NotFound)
                {
                    _logger.LogWarning("User was not found on Azure AD");
                    ModelState.AddModelError("azureAdUserNotFound",
                        $"User with id: {smartLockUser.UserId} was not found on Azure AD");
                }
            }
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var userExists = await _smartLockRepository.SmartLockUserExists(smartLockId, smartLockUser.UserId);
            if (userExists)
            {
                _logger.LogWarning("User already exists for this smart lock");
                return Conflict("User already exists for this smart lock");
            }

            _smartLockRepository.AddSmartLockUser(smartLockId, smartLockUser.UserId);
            await _smartLockRepository.Save();

            return CreatedAtAction("GetSmartLockUser", new {smartLockId = smartLockId, userId = smartLockUser.UserId },
                smartLockUser);
        }

        // GET: /api/smart-locks/5/users/1
        /// <summary>
        /// Get smart lock user by smartLockId id and userid
        /// </summary>
        /// <param name="userId">The id of the user to get smart lock's user</param>
        /// <param name="smartLockId">The id of the smart lock to get smart lock's user</param>
        /// <returns>An ActionResult task of type SmartLockUserDto</returns>
        /// <response code="200">Smart lock user retrieved successfully</response>
        /// <response code="404">Smart lock user from db not found</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [HttpGet("{smartLockId}/users/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SmartLockUserDto>> GetSmartLockUser(Guid smartLockId, Guid userId)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();

            var smartLockUserExists = await _smartLockRepository.SmartLockUserExists(smartLockId, userId);
            if (!smartLockUserExists) return NotFound();

            var smartLockUserFromRepo = await _smartLockRepository.GetSmartLockUser(smartLockId, userId);

            var smartLockUserFromRepoDto = _mapper.Map<SmartLockUserDto>(smartLockUserFromRepo);

            return Ok(smartLockUserFromRepoDto);
        }

        // DELETE: /api/smart-locks/5/users/1
        /// <summary>
        /// Delete smart lock's user or user's smart lock from db
        /// </summary>
        /// <param name="userId">The id of user to delete a smart lock's user</param>
        /// <param name="smartLockId">The id of smart lock to delete smart lock's user</param>
        /// <returns>An ActionResult of type no content</returns>
        /// <response code="204">Smart lock user deleted successfully</response>
        /// <response code="404">Smart lock user not found in db</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [HttpDelete("{smartLockId}/users/{userId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteSmartLockUser(Guid smartLockId, Guid userId)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();

            var smartLockUserExists = await _smartLockRepository.SmartLockUserExists(smartLockId, userId);

            if (!smartLockUserExists) return NotFound();

            _smartLockRepository.DeleteSmartLockUser(smartLockId, userId);

            await _smartLockRepository.Save();

            return NoContent();
        }

        // GET: /api/smart-locks/5/groups
        /// <summary>
        /// Retrieve list of smart lock groups by smart lock i
        /// </summary>
        /// <param name="smartLockId">The id of smart lock to get a list of smart lock's group</param>
        /// <returns>An ActionResult task of type GroupDto</returns>
        /// <response code="200">Smart lock groups retrieved successfully</response>
        /// <response code="404">Smart lock groups from db not found</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [HttpGet("{smartLockId}/groups")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetSmartLockGroups(Guid smartLockId)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var allSmartLockGroupsFromRepo = await _smartLockRepository.GetSmartLockGroups(smartLockId);

            var allGroupsFromAzureAd = await _azureAdRepository.GetGroups();

            var mergedSmartLockUsers = DataMerger.MergeGroupsWithAzureData(
                allSmartLockGroupsFromRepo, allGroupsFromAzureAd, _mapper);

            return Ok(mergedSmartLockUsers);
        }

        // Post: /api/smart-locks/5/groups
        /// <summary>
        /// Add group to smart lock or add smart lock to group
        /// </summary>
        /// <param name="smartLockId">The id of smart lock to add smart lock's group</param>
        /// <param name="smartLockGroup">The group to add</param>
        /// <returns>An ActionResult of type SmartLockGroupDto</returns>
        /// <response code="201">Smart lock group created successfully</response>
        /// <response code="404">Azure Ad group not found</response>
        /// <response code="409">Group already exist for this smart lock</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [HttpPost("{smartLockId}/groups")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SmartLockGroupDto>> AddSmartLockGroup(Guid smartLockId,
            SmartLockGroupCreationDto smartLockGroup)
        {
            try
            {
                await _azureAdRepository.GetGroup(smartLockGroup.GroupId.ToString());
            }
            catch (ServiceException e)
            {
                if (e.StatusCode == HttpStatusCode.NotFound)
                {
                    _logger.LogWarning("Group  was not found on Azure AD");
                    ModelState.AddModelError("azureAdGroupNotFound",
                        $"Group with id: {smartLockGroup.GroupId} was not found on Azure AD");
                }
            }
            
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            if (await _smartLockRepository.SmartLockGroupExists(smartLockId, smartLockGroup.GroupId))
            {
                _logger.LogWarning("Group already exists for this smart lock");
                return Conflict("Group already exists for this smart lock");
            }

            _smartLockRepository.AddSmartLockGroup(smartLockId, smartLockGroup.GroupId);
            await _smartLockRepository.Save();

            return CreatedAtAction("GetSmartLockGroup", new {smartLockId = smartLockId, groupId = smartLockGroup.GroupId},
                smartLockGroup);
        }

        // GET: /api/smart-locks/5/groups/1
        /// <summary>
        /// Get a smart lock group by smart lock id and group id
        /// </summary>
        /// <returns>An ActionResult task of type SmartLockGroupDto</returns>
        /// <response code="200">Smart lock group retrieved successfully</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="404">Smart lock group not found in db</response>
        [HttpGet("{smartLockId}/groups/{groupId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SmartLockGroupDto>> GetSmartLockGroup(Guid smartLockId, Guid groupId)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();
            
            var groupExists = await _groupRepository.GroupExists(groupId);
            if (!groupExists) return NotFound();

            var smartLockGroupExists = await _smartLockRepository.SmartLockGroupExists(smartLockId, groupId);
            if (!smartLockGroupExists) return NotFound();

            var smartLockGroup = await _smartLockRepository.GetSmartLockGroup(smartLockId, groupId);

            var smartLockGroupFromRepoDto = _mapper.Map<SmartLockGroupDto>(smartLockGroup);

            return Ok(smartLockGroupFromRepoDto);
        }

        // DELETE: /api/smart-locks/5/groups/1
        /// <summary>
        /// Delete smart lock's group or group's smart lock from db
        /// </summary>
        /// <param name="smartLockId">The id of smart lock to delete a smart lock's group</param>
        /// <param name="groupId">The id of group to delete a smart lock's group</param>
        /// <returns>An ActionResult of type no content</returns>
        /// <response code="204">Smart lock group deleted successfully</response>
        /// <response code="404">Smart lock or group or smart lock group not found in db</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="400">Validation error</response>
        [HttpDelete("{smartLockId}/groups/{groupId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteSmartLockGroup(Guid smartLockId, Guid groupId)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var groupExists = await _groupRepository.GroupExists(groupId);
            if (!groupExists) return NotFound();

            var smartLockGroupExists = await _smartLockRepository.SmartLockGroupExists(smartLockId, groupId);

            if (!smartLockGroupExists) return NotFound();

            _smartLockRepository.DeleteSmartLockGroup(smartLockId, groupId);

            await _smartLockRepository.Save();

            return NoContent();
        }

    }
}