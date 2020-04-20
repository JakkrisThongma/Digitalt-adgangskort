using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;
using Group = Microsoft.Graph.Group;
using User = api.Entities.User;

namespace api.Controllers
{
    [Produces("application/json")]
    [Authorize]
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

        // GET: api/users
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
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

        // POST: api/users
        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] UserCreationDto user)
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            try
            {
                await _azureAdRepository.GetUser(client, user.Id.ToString());
            }
            catch (ServiceException e)
            {
                if (e.StatusCode == HttpStatusCode.NotFound)
                {
                    ModelState.AddModelError("azureAdUserNotFound",
                        $"User with id: {user.Id} was not found on Azure AD");
                }
            }

            var userExists = await _userRepository.UserExists(user.Id);
            if (userExists) return Conflict("User already exists");
            if (user.SmartLockUsers.Count > 0)
            {
                foreach (var smartLockUser in user.SmartLockUsers)
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
            
            var userEntity = _mapper.Map<User>(user);
            _userRepository.AddUser(userEntity);
            await _userRepository.Save();
            var userDto = _mapper.Map<UserDto>(userEntity);
            
            return CreatedAtAction("GetUser", new {userId = userDto.Id}, userDto);
        }
        
        // GET: api/users/5
        [HttpGet("{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
        
        
        // PUT: api/users/5
        [HttpPut("{userId}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateUser(Guid userId, UserModificationDto user)
        {
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();

            var userEntity = _mapper.Map<User>(user);
            userEntity.Id = userId;
            userEntity.LastModificationDate = new DateTimeOffset(DateTime.Now);
            _userRepository.UpdateUser(userEntity);
            await _userRepository.Save();

            return NoContent();
        }
        
        [HttpPatch("{userId}")]
        [Consumes("application/json-patch+json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateUserPartially(Guid userId,
            [FromBody] JsonPatchDocument<UserModificationDto> patchDoc)
        {
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();

            var userFromRepo = await _userRepository.GetUser(userId);
            
            var userToPatch = _mapper.Map<UserModificationDto>(userFromRepo);
            
            patchDoc.ApplyTo(userToPatch, ModelState);

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

        // DELETE: api/users/5
        [HttpDelete("{userId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        //GET: api/users/5/groups
        [HttpGet("{userId}/groups")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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
                    .GetGroup(client, groupId.ToString());
                userGroupsFromAzureAd.Add(group);
            }

            var mergedGroups = DataMerger.MergeGroupsWithAzureData(allGroupsFromRepo,
                userGroupsFromAzureAd, _mapper);

            return Ok(mergedGroups);
        }

        // GET: api/users/5/smart-locks
        [HttpGet("{userId}/smart-locks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<SmartLockDto>>> GetSmartLockGroups(Guid userId)
        {
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return NotFound();
            
            var userSmartLocks = await _userRepository.GetUserSmartLocks(userId);

            var userSmartLocksDto = _mapper.Map<IEnumerable<SmartLockDto>>(userSmartLocks);

            return Ok(userSmartLocksDto);
        }
        
        [HttpGet("current")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
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
    }
}