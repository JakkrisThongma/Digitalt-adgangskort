using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using api.Entities;
using api.Helpers;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;
using Group = Microsoft.Graph.Group;
using User = api.Entities.User;

namespace api.Controllers
{
    [Produces("application/json")]
    //[Authorize("admin")]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly ISmartLockRepository _smartLockRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IMapper _mapper;


        public UsersController(IUserRepository userRepository, IGroupRepository groupRepository,
            IAzureAdRepository azureAdRepository, ISmartLockRepository smartLockRepository, IMapper mapper)
        {
            _userRepository = userRepository ??
                              throw new ArgumentNullException(nameof(userRepository));
            _groupRepository = groupRepository ??
                               throw new ArgumentNullException(nameof(groupRepository));
            _smartLockRepository = smartLockRepository ??
                                   throw new ArgumentNullException(nameof(smartLockRepository));
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(_azureAdRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var allUsersFromRepo = await _userRepository.GetUsers();

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var allUsersFromAzureAd = await _azureAdRepository.GetUsers(client);

            var mergedUsers = DataMerger.MergeUsersWithAzureData(allUsersFromRepo,
                allUsersFromAzureAd, _mapper);

            return Ok(mergedUsers);
        }

        // GET: api/users/5
        [HttpGet("{userId}")]
        public async Task<ActionResult<UserDto>> GetUser(Guid userId)
        {
            var userFromRepo = await _userRepository.GetUser(userId);
            if (userFromRepo == null) NotFound();

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var userFromAzureAd = await _azureAdRepository.GetUser(client, userId.ToString());

            var mergedUser = DataMerger.MergeUserWithAzureData(userFromRepo, userFromAzureAd, _mapper);

            return Ok(mergedUser);
            ;
        }

        // POST: api/users
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult> CreateUser([FromBody] UserCreationDto user)
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
                    return BadRequest("User was not found on Azure AD");
                }
            }

            var userEntity = _mapper.Map<User>(user);
            _userRepository.AddUser(userEntity);
            await _userRepository.Save();

            return CreatedAtAction("GetUser", new {userId = user.Id}, user);
        }

        // PUT: api/users/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(Guid userId, UserModificationDto user)
        {
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return BadRequest();
            var userEntity = _mapper.Map<User>(user);
            userEntity.Id = userId;
            userEntity.LastModificationDate = new DateTimeOffset(DateTime.Now);
            _userRepository.UpdateUser(userEntity);
            await _userRepository.Save();

            return NoContent();
        }

        // DELETE: api/users/5
        [HttpDelete("{userId}")]
        public async Task<ActionResult> DeleteUser(Guid userId)
        {
            var userFromRepo = await _userRepository.GetUser(userId);

            if (userFromRepo == null)
            {
                return NotFound();
            }

            _userRepository.DeleteUser(userFromRepo);
            await _userRepository.Save();

            return NoContent();
        }

        //GET: api/users/5/groups
        [HttpGet("{userId}/groups")]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups(Guid userId)
        {
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
        public async Task<ActionResult<IEnumerable<SmartLockDto>>> GetSmartLockGroups(Guid userId)
        {
            var userExists = await _userRepository.UserExists(userId);
            if (!userExists) return BadRequest();

            var allUserSmartLocksFromRepo = await _userRepository.GetUserSmartLocks(userId);
            var allUserLocksIds = allUserSmartLocksFromRepo.Select(l => l.Id.ToString()).ToList();
            
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var userGroupsIdsFromAzureAd = await _azureAdRepository
                .GetUserGroupsIds(client, userId.ToString());

            foreach (var groupId in userGroupsIdsFromAzureAd)
            {
                var smartLocks = await _groupRepository.GetGroupSmartLocks(Guid.Parse(groupId));
                var allLocksIds = smartLocks.Select(l => l.Id.ToString()).ToList();
                foreach (var lockId in allLocksIds)
                {
                    if (!allUserLocksIds.Contains(lockId))
                    {
                        allUserLocksIds.Add(lockId);
                    }
                }
            }

            var x = await _smartLockRepository.GetSmartLocks();

            var y = x.Where(smartLock =>
            {
                return allUserLocksIds
                    .Contains(smartLock.Id.ToString());
            }).ToList();

            if (y.Count == 0) return NotFound();

            var userSmartLocksDto = _mapper.Map<IEnumerable<SmartLockDto>>(y);

            return Ok(userSmartLocksDto);
        }
    }
}