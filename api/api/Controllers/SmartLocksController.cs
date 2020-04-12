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
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;


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
        public async Task<ActionResult<IEnumerable<SmartLockDto>>> GetSmartLocks()
        {
            var smartLocksFromRepo = await _smartLockRepository.GetSmartLocks();
            var smartLocksDto = _mapper.Map<IEnumerable<SmartLockDto>>(smartLocksFromRepo);

            return Ok(smartLocksDto);
        }

        // POST: api/smart-locks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult> CreateSmartLock(SmartLockCreationDto smartLock)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLock.Id);
            if (smartLockExists) return Conflict("Smart lock already exists");

            var smartLockEntity = _mapper.Map<SmartLock>(smartLock);
            _smartLockRepository.AddSmartLock(smartLockEntity);
            await _smartLockRepository.Save();

            return CreatedAtAction("GetSmartLock", new {smartLockId = smartLock.Id}, smartLock);
        }

        // GET: api/smart-locks/5
        [HttpGet("{smartLockId}")]
        public async Task<ActionResult<SmartLockDto>> GetSmartLock(Guid smartLockId)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var smartLockFromRepo = await _smartLockRepository.GetSmartLock(smartLockId);

            var smartLock = _mapper.Map<SmartLockDto>(smartLockFromRepo);

            return Ok(smartLock);
        }

        // PUT: api/smart-locks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{smartLockId}")]
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

        // DELETE: api/smart-locks/5
        [HttpDelete("{smartLockId}")]
        public async Task<ActionResult> DeleteSmartLock(Guid smartLockId)
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
                    return BadRequest("User was not found on Azure AD");
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
        public async Task<ActionResult> GetSmartLockUser(Guid smartLockId, Guid userId)
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
        public async Task<ActionResult> DeleteSmartLockUser(Guid smartLockId, Guid userId)
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
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetSmartLockGroups(Guid smartLockId)
        {
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockId);
            if (!smartLockExists) return NotFound();

            var allSmartLockGroupsFromRepo = await _smartLockRepository.GetSmartLockGroups(smartLockId);

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var allGroupsFromAzureAd = await _azureAdRepository.GetGroups(client);

            var mergedSmartLockUsers = DataMerger.MergeGroupsWithAzureData(
                allSmartLockGroupsFromRepo, allGroupsFromAzureAd, _mapper);

            return Ok(mergedSmartLockUsers);
        }

        // Post: api/smart-locks/5/groups
        [HttpPost("{smartLockId}/groups")]
        public async Task<ActionResult<IEnumerable<UserDto>>> AddSmartLockUser(Guid smartLockId,
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
                    _logger.LogWarning("GroupId was not found on Azure AD");
                    return BadRequest("GroupId was not found on Azure AD");
                }
            }

            if (await _smartLockRepository.SmartLockGroupExists(smartLockId, smartLockGroup.GroupId))
            {
                _logger.LogWarning("Group already exists");
                return BadRequest("Group already exists");
            }

            _smartLockRepository.AddSmartLockGroup(smartLockId, smartLockGroup.GroupId);
            await _smartLockRepository.Save();

            return CreatedAtAction("GetSmartLockGroup", new {smartLockId = smartLockId, groupId = smartLockGroup.GroupId},
                smartLockGroup);
        }

        // GET: api/smart-locks/5/groups/1
        [HttpGet("{smartLockId}/groups/{groupId}")]
        public async Task<ActionResult> GetSmartLockGroup(Guid smartLockId, Guid groupId)
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
        public async Task<ActionResult> DeleteSmartLockGroup(Guid smartLockId, Guid groupId)
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
        public async Task<ActionResult<IEnumerable<UserDto>>> OpenSmartLock(SmartLockUserAccessDto smartLockUser)
        {
            var userExists = await _userRepository.UserExists(smartLockUser.UserId);
            if (!userExists) return NotFound();

            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockUser.smartLockId);
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
                    return BadRequest("User was not found on Azure AD");
                }
            }

            var smartLockUserExists =
                await _smartLockRepository.SmartLockUserExists(smartLockUser.smartLockId, smartLockUser.UserId);

            if (smartLockUserExists)
            {
                return Ok(new {accessAuthorized = true});
            }

            var userGroupsIdsFromAzureAd = await _azureAdRepository
                .GetUserGroupsIds(client, smartLockUser.UserId.ToString());

            foreach (var groupId in userGroupsIdsFromAzureAd)
            {
                var smartLockGroupExists =
                    await _smartLockRepository.SmartLockGroupExists(smartLockUser.smartLockId, Guid.Parse(groupId));
                if (smartLockGroupExists)
                {
                    return Ok(new {accessAuthorized = true});
                }
            }

            return Ok(new {accessAuthorized = false});
        }
    }
}