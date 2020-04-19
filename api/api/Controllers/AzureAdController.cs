/*
 * Originally created by: Saket Adhav
 * https://github.com/saketadhav/WebApiWithGraph
 * Refactored by group 25 to use the repository pattern
 */

using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using api.Constants;
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
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IMapper _mapper;

        public AzureAdController(IAzureAdRepository azureAdRepository, IMapper mapper)
        {
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(azureAdRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }


        [HttpGet("users")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

                return Ok(_mapper.Map<IEnumerable<AzureAdUserDto>>(userList));
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


        [HttpGet("users/{userId}", Name = RouteNames.UserById)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

                return Ok(_mapper.Map<AzureAdUserDto>(user));
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

        [HttpGet("users/{userId}/photo", Name = RouteNames.PhotoByUserId)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        [HttpGet("users/{userId}/groups")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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

        [HttpGet("groups/")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<AzureAdGroupDto>>> GetGroups()
        {
            try
            {
                // Load groups profiles.
                var groupList = await _azureAdRepository.GetGroups();

                return Ok(_mapper.Map<IEnumerable<AzureAdGroupDto>>(groupList));
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


        [HttpGet("groups/{groupId}", Name = RouteNames.GroupById)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AzureAdGroupDto>> GetGroup(string groupId)
        {
            try
            {
                // Initialize the GraphServiceClient.

                // Load group profile.
                var group = await _azureAdRepository.GetGroup(groupId);

                return Ok(_mapper.Map<AzureAdGroupDto>(group));
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

        [HttpGet("groups/{groupId}/members", Name = RouteNames.GroupMembersByGroupId)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
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