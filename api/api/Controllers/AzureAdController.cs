/*
 * Originally created by: Saket Adhav
 * https://github.com/saketadhav/WebApiWithGraph
 * Refactored by group 25 to use the repository pattern
 */

using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;

namespace api.Controllers
{
    [Produces("application/json")]
    [Route("api/azure-ad")]
    public class AzureAdController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IMapper _mapper;

        public AzureAdController(IAzureAdRepository azureAdRepository,
            IUserRepository userRepository, IGroupRepository groupRepository,
            IMapper mapper)
        {
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(azureAdRepository));
            _userRepository = userRepository ??
                              throw new ArgumentNullException(nameof(userRepository));
            _groupRepository = groupRepository ??
                               throw new ArgumentNullException(nameof(groupRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }
        // GET /api/azure-ad/users
        /// <summary>
        /// Get a list of Azure Ad users
        /// </summary>
        /// <returns>An ActionResult task of type IEnumerable of AzureAdUserDto</returns>
        /// <response code="200">Users retrieved successfully</response>
        /// <response code="401">Not authorized</response>
        /// <response code="404">No users found</response>
        [HttpGet("users")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<AzureAdUserDto>>> GetUsers()
        {
            var users = new List<UserDto>();
            try
            {
                // Initialize the GraphServiceClient.
                var client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load users profiles.
                var userList = await _azureAdRepository.GetUsers(client);
                var userListDto = _mapper.Map<IEnumerable<AzureAdUserDto>>(userList);
                foreach (var azureAdUserDto in userListDto)
                {
                    var userExist = await _userRepository.UserExists(azureAdUserDto.Id);

                    if (userExist)
                    {
                        azureAdUserDto.AddedToDb = true;
                    }
                }
                
                return Ok(userListDto);

            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }
        // GET /api/azure-ad/users/userId
        /// <summary>
        /// Get Azure Ad user by id
        /// </summary>
        /// <param name="userId">The id of the user to get</param>
        /// <returns>An ActionResult task of type AzureAdUserDto</returns>
        /// <response code="200">User retrieved successfully</response>
        /// <response code="401">Not authorized</response>
        /// <response code="404">No users found</response>
        [HttpGet("users/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AzureAdUserDto>> GetUser(string userId)
        {
            try
            {
                if (string.IsNullOrEmpty(userId) || string.IsNullOrWhiteSpace(userId))
                {
                    return BadRequest();
                }

                // Initialize the GraphServiceClient.
                var client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load user profile.
                var user = await _azureAdRepository.GetUser(client, userId);
                
                var userDto = _mapper.Map<AzureAdUserDto>(user);

                var userExist = await _userRepository.UserExists(userDto.Id);

                if (userExist)
                {
                    userDto.AddedToDb = true;
                }

                return Ok(userDto);
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }
        
        // GET /api/azure-ad/users/userId/photo
        /// <summary>
        /// Get photo for Azure Ad user by user id
        /// </summary>
        /// <param name="userId">The id of the user to get a user's photo</param>
        /// <returns>An ActionResult task of type string</returns>
        /// <response code="200">User's photo retrieved successfully</response>
        /// <response code="404">User not found</response>
        /// <response code="401">Not authorized</response>
        /// <response code="400">Validation error</response>
        [HttpGet("users/{userId}/photo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<string>> GetUserPhoto(string userId)
        {
            try
            {
                // Initialize the GraphServiceClient.
                var client = await MicrosoftGraphClient.GetGraphServiceClient();

                var pictureStream = await _azureAdRepository.GetUserPhoto(client, userId);
                var pictureBase64 = PhotoBase64Converter.StreamToBase64ImageString(pictureStream);

                return Ok(pictureBase64);
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }

        // GET: /api/azure-ad/users/userId/groups
        /// <summary>
        /// Get list of Azure Ad groups by user id
        /// </summary>
        /// <param name="userId">The id of the user to get a list of the user's groups</param>
        /// <returns>An ActionResult task of type List of string</returns>
        /// <response code="200">Groups retrieved successfully</response>
        /// <response code="404">User id from db not found</response>
        /// <response code="401">Not authorized</response>
        /// <response code="400">Validation error</response>
        [HttpGet("users/{userId}/groups")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<String>>> GetUserGroups(string userId)
        {
            try
            {
                if (string.IsNullOrEmpty(userId) || string.IsNullOrWhiteSpace(userId))
                {
                    return BadRequest();
                }

                // Initialize the GraphServiceClient.
                var client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load user profile.
                var userGroups = await _azureAdRepository.GetUserGroupsIds(client, userId);

                return Ok(userGroups);
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }
        // GET: /api/azure-ad/groups
        /// <summary>
        /// Get a list of Azure ad groups
        /// </summary>
        /// <returns>An ActionResult task of type IEnumerable of AzureAdGroupDto</returns>
        /// <response code="200">Groups retrieved successfully</response>
        /// <response code="401">Not authorized</response>
        /// <response code="404">No groups found</response>
        [HttpGet("groups/")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<AzureAdGroupDto>>> GetGroups()
        {
            try
            {
                // Load groups profiles.
                var groupList = await _azureAdRepository.GetGroups();

                var groupListDto = _mapper.Map<IEnumerable<AzureAdGroupDto>>(groupList);
                foreach (var azureAdGroupDto in groupListDto)
                {
                    var groupExist = await _groupRepository.GroupExists(azureAdGroupDto.Id);

                    if (groupExist)
                    {
                        azureAdGroupDto.AddedToDb = true;
                    }
                }

                return Ok(groupListDto);
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }
        
        // GET: /api/azure-ad/groups/groupId
        /// <summary>
        /// Get a Azure Ad group by id
        /// </summary>
        /// <param name="groupId">The id of the group to get</param>
        /// <returns>An ActionResult task of type AzureAdGroupDto</returns>
        /// <response code="200">Group retrieved successfully</response>
        /// <response code="404">Group not not found</response>
        /// <response code="401">Not authorized</response>
        /// <response code="400">Validation error</response>
        [HttpGet("groups/{groupId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AzureAdGroupDto>> GetGroup(string groupId)
        {
            try
            {
                // Load group profile.
                var group = await _azureAdRepository.GetGroup(groupId);
                var groupDto = _mapper.Map<AzureAdGroupDto>(group);

                var groupExist = await _groupRepository.GroupExists(groupDto.Id);

                if (groupExist)
                {
                    groupDto.AddedToDb = true;
                }
                
                return Ok(groupDto);
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }
        
        // GET: /api/azure-ad/groups/groupId/members
        /// <summary>
        /// Get list of members of Azure Ad group
        /// </summary>
        /// <param name="groupId">The id of the group to get a list of the group's members</param>
        /// <returns>An ActionResult task of type AzureAdUserDto</returns>
        /// <response code="200">Users retrieved successfully</response>
        /// <response code="404">Group members not found</response>
        /// <response code="401">Not authorized</response>
        /// <response code="400">Validation error</response>
        [HttpGet("groups/{groupId}/members")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<AzureAdUserDto>>> GetGroupMembers(string groupId)
        {
            try
            {
                // Initialize the GraphServiceClient.
                var client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load group profile.
                var members = await _azureAdRepository.GetGroupMembers(client, groupId);

                return Ok(_mapper.Map<IEnumerable<AzureAdUserDto>>(members));
            }
            catch (ServiceException ex)
            {
                if (ex.StatusCode == HttpStatusCode.BadRequest)
                {
                    return BadRequest();
                }
                else
                {
                    return NotFound();
                }
            }
        }
    }
}