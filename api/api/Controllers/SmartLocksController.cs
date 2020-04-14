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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using Status = api.Types.Status;


namespace api.Controllers
{
    [Produces("application/json")]
    [Route("api/smart-locks")]
    [ApiController]
    public class SmartLocksController : ControllerBase
    {
        private readonly ISmartLockRepository _smartLockRepository;
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<SmartLocksController> _logger;

        public SmartLocksController(ISmartLockRepository smartLockRepository,
            IUserRepository userRepository, IGroupRepository groupRepository,
            IAzureAdRepository azureAdRepository, IMapper mapper,
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
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
            _logger = logger ??
                      throw new ArgumentNullException(nameof(logger));
        }

        // GET: api/smart-locks
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<SmartLockDto>>> GetSmartLocks()
        {
            var smartLocksFromRepo = await _smartLockRepository.GetSmartLocks();
            var smartLocksDto = _mapper.Map<IEnumerable<SmartLockDto>>(smartLocksFromRepo);

            return Ok(smartLocksDto);
        }

        // POST: api/smart-locks
        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SmartLockDto>> CreateSmartLock(SmartLockCreationDto smartLock)
        {
            var smartLockEntity = _mapper.Map<SmartLock>(smartLock);
            _smartLockRepository.AddSmartLock(smartLockEntity);
            await _smartLockRepository.Save();
            var smartLockDto = _mapper.Map<SmartLockDto>(smartLockEntity);

            return CreatedAtAction("GetSmartLock", new {smartLockId = smartLockDto.Id}, smartLockDto);
        }

        // GET: api/smart-locks/5
        [HttpGet("{smartLockId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SmartLockDto>> GetSmartLock(Guid smartLockId)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var smartLockFromRepo = await _smartLockRepository.GetSmartLock(smartLockId);

            var smartLock = _mapper.Map<SmartLockDto>(smartLockFromRepo);

            return Ok(smartLock);
        }

        // PUT: api/smart-locks/5
        [HttpPut("{smartLockId}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateSmartLock(Guid smartLockId, SmartLockModificationDto smartLock)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var smartLockEntity = _mapper.Map<SmartLock>(smartLock);
            smartLockEntity.Id = smartLockId;
            smartLockEntity.LastModificationDate = new DateTimeOffset(DateTime.Now);
            _smartLockRepository.UpdateSmartLock(smartLockEntity);
            await _smartLockRepository.Save();

            return NoContent();
        }
        
        [HttpPatch("{smartLockId}")]
        [Consumes("application/json-patch+json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateSmartLockPartially(Guid smartLockId,
            [FromBody] JsonPatchDocument<SmartLockModificationDto> patchDoc)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var smartLockFromRepo = await _smartLockRepository.GetSmartLock(smartLockId);
            
            var smartLockToPatch = _mapper.Map<SmartLockModificationDto>(smartLockFromRepo);
            // add validation
            patchDoc.ApplyTo(smartLockToPatch, ModelState);

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

        // DELETE: api/smart-locks/5
        [HttpDelete("{smartLockId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        // GET: api/smart-locks/5
        [HttpGet("{smartLockId}/5/users")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        // Post: api/smart-locks/5/users
        [HttpPost("{smartLockId}/users")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
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
                    return ValidationProblem("User was not found on Azure AD");
                }
            }

            var userExists = await _smartLockRepository.SmartLockUserExists(smartLockId, smartLockUser.UserId);
            if (userExists)
            {
                _logger.LogWarning("User already exists");
                return Conflict("User already exists");
            }

            _smartLockRepository.AddSmartLockUser(smartLockId, smartLockUser.UserId);
            await _smartLockRepository.Save();

            return CreatedAtAction("GetSmartLockUser", new {smartLockId = smartLockId, userId = smartLockUser.UserId },
                smartLockUser);
        }

        // GET: api/smart-locks/5/users/1
        [HttpGet("{smartLockId}/users/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        // DELETE: api/smart-locks/5/users/1
        [HttpDelete("{smartLockId}/users/{userId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        // GET: api/smart-locks/5/groups
        [HttpGet("{smartLockId}/groups")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        // Post: api/smart-locks/5/groups
        [HttpPost("{smartLockId}/groups")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<SmartLockGroupDto>> AddSmartLockGroup(Guid smartLockId,
            SmartLockGroupCreationDto smartLockGroup)
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            try
            {
                await _azureAdRepository.GetGroup(client, smartLockGroup.GroupId.ToString());
            }
            catch (ServiceException e)
            {
                if (e.StatusCode == HttpStatusCode.NotFound)
                {
                    _logger.LogWarning("Group  was not found on Azure AD");
                    return ValidationProblem("Group  was not found on Azure AD");
                }
            }

            if (await _smartLockRepository.SmartLockGroupExists(smartLockId, smartLockGroup.GroupId))
            {
                _logger.LogWarning("Group already exists");
                return Conflict("Group already exists");
            }

            _smartLockRepository.AddSmartLockGroup(smartLockId, smartLockGroup.GroupId);
            await _smartLockRepository.Save();

            return CreatedAtAction("GetSmartLockGroup", new {smartLockId = smartLockId, groupId = smartLockGroup.GroupId},
                smartLockGroup);
        }

        // GET: api/smart-locks/5/groups/1
        [HttpGet("{smartLockId}/groups/{groupId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        // DELETE: api/smart-locks/5/groups/1
        [HttpDelete("{smartLockId}/groups/{groupId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        // Post: api/smart-locks/get-access
        [HttpPost("get-access")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AccessDto>> OpenSmartLock(SmartLockUserAccessDto smartLockUser)
        {
            var userExists = await _userRepository.UserExists(smartLockUser.UserId);
            if (!userExists) return NotFound();

            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockUser.SmartLockId);
            if (!smartLockExists) return NotFound();

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
                    return ValidationProblem("User was not found on Azure AD");
                }
            }

            var smartLockUserExists =
                await _smartLockRepository.SmartLockUserExists(smartLockUser.SmartLockId, smartLockUser.UserId);

            if (smartLockUserExists)
            {
                var smartLock = await _smartLockRepository.GetSmartLock(smartLockUser.SmartLockId);
                if (smartLock.Status != Status.Active)
                {
                    return Ok(new AccessDto
                    {
                        AccessAuthorized = false,
                        Info = "The lock is in inactive state. Try again later"
                    });
                }
                var user = await _userRepository.GetUser(smartLockUser.UserId);

                if (user.Status != Status.Active)
                {
                    return Ok(new AccessDto
                    {
                        AccessAuthorized = false, 
                        Info = "The user is in inactive state. Try again later"
                    });
                }
                
                return Ok(new AccessDto
                {
                    AccessAuthorized = true,
                    Info = $"Access is permitted for user {user.Id}"
                });

            }

            var userGroupsIdsFromAzureAd = await _azureAdRepository
                .GetUserGroupsIds(client, smartLockUser.UserId.ToString());

            foreach (var groupId in userGroupsIdsFromAzureAd)
            {
                var smartLockGroupExists =
                    await _smartLockRepository.SmartLockGroupExists(smartLockUser.SmartLockId, Guid.Parse(groupId));
                if (smartLockGroupExists)
                {
                    var smartLock = await _smartLockRepository.GetSmartLock(smartLockUser.SmartLockId);
                    if (smartLock.Status != Status.Active)
                    {
                        return Ok(new AccessDto
                        {
                            AccessAuthorized = false,
                            Info = "The lock is in inactive state. Try again later"
                        });
                    }
                    var group = await _groupRepository.GetGroup(Guid.Parse(groupId));

                    if (group.Status != Status.Active)
                    {
                        return Ok(new AccessDto
                        {
                            AccessAuthorized = false, 
                            Info = "The group is in inactive state. Try again later"
                        });
                    }
                
                    return Ok(new AccessDto
                    {
                        AccessAuthorized = true,
                        Info = $"Access is permitted for group {group.Id}"
                    });
                }
            }

            return Ok(new AccessDto
            {
                AccessAuthorized = false,
                Info = "Access is not permitted"
            });
        }
    }
}