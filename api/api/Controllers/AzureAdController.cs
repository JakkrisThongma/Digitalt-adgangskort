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
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;

namespace api.Controllers
{
    [Produces("application/json")]
    [Route("azure-ad")]
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


        [HttpGet("users/")]
        public async Task<IActionResult> GetUsers()
        {
            var users = new List<UserDto>();
            try
            {
                // Initialize the GraphServiceClient.
                var client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load users profiles.
                var userList = await _azureAdRepository.GetUsers(client);

                return Ok(_mapper.Map<IEnumerable<UserDto>>(userList));
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
        public async Task<IActionResult> GetUser(string userId)
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

                return Ok(_mapper.Map<UserDto>(user));
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
        public async Task<IActionResult> GetUserPhoto(string userId)
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


        [HttpGet("groups/")]
        public async Task<IActionResult> GetGroups()
        {
            try
            {
                // Initialize the GraphServiceClient.
                var client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load groups profiles.
                var groupList = await _azureAdRepository.GetGroups(client);

                return Ok(_mapper.Map<IEnumerable<GroupDto>>(groupList));
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
        public async Task<IActionResult> GetGroup(string groupId)
        {
            try
            {
                // Initialize the GraphServiceClient.
                var client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load group profile.
                var group = await _azureAdRepository.GetGroup(client, groupId);

                return Ok(_mapper.Map<GroupDto>(group));
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
        public async Task<IActionResult> GetGroupMembers(string groupId)
        {
            try
            {
                // Initialize the GraphServiceClient.
                var client = await MicrosoftGraphClient.GetGraphServiceClient();

                // Load group profile.
                var members = await _azureAdRepository.GetGroupMembers(client, groupId);

                return Ok(_mapper.Map<IEnumerable<UserDto>>(members));
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