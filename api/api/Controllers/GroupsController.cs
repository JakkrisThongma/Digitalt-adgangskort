﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;
using Group = api.Entities.Group;

namespace api.Controllers
{
    [Produces("application/json")]
    [Route("api/groups")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IUserRepository _userRepository;
        private readonly ISmartLockRepository _smartLockRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IMapper _mapper;

        public GroupsController(IGroupRepository groupRepository, IUserRepository userRepository,
            ISmartLockRepository smartLockRepository ,IAzureAdRepository azureAdRepository, IMapper mapper)
        {
            _groupRepository = groupRepository ??
                               throw new ArgumentNullException(nameof(groupRepository));
            _userRepository = userRepository ??
                              throw new ArgumentNullException(nameof(userRepository));
            _smartLockRepository = smartLockRepository ??
                                   throw new ArgumentNullException(nameof(smartLockRepository));
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(azureAdRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }

        // GET: api/groups
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups()
        {
            var allGroupsFromRepo = await _groupRepository.GetGroups();

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var allGroupsFromAzureAd = await _azureAdRepository.GetGroups(client);

            var mergedGroups = DataMerger.MergeGroupsWithAzureData(allGroupsFromRepo,
                allGroupsFromAzureAd, _mapper);

            return Ok(mergedGroups);
        }
        
        // POST: api/groups
        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GroupDto>> CreateGroup([FromBody] GroupCreationDto group)
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            try
            {
                await _azureAdRepository.GetGroup(client, group.Id.ToString());
            }
            catch (ServiceException e)
            {
                if (e.StatusCode == HttpStatusCode.NotFound)
                {
                    ModelState.AddModelError("azureAdGroupNotFound",
                        $"Group with id: {group.Id} was not found on Azure AD");
                }
            }

            var groupExists = await _groupRepository.GroupExists(group.Id);
            if (groupExists) return Conflict("Group already exists");

            if (group.SmartLockGroups.Count > 0)
            {
                foreach (var smartLockGroup in group.SmartLockGroups)
                {
                    var smartLockExist = await _smartLockRepository.SmartLockExists(smartLockGroup.SmartLockId);
                    if (!smartLockExist)
                        ModelState.AddModelError("smartLockNotExist",
                            $"Smart lock with id: {smartLockGroup.SmartLockId} doesn't exist");
                }
            }

            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }
            
            var groupEntity = _mapper.Map<Group>(group);
            
            _groupRepository.AddGroup(groupEntity);
            await _groupRepository.Save();
            var groupDto = _mapper.Map<GroupDto>(groupEntity);

            return CreatedAtAction("GetGroup", new {groupId = groupDto.Id}, groupDto);
        }

        // GET: api/groups/5
        [HttpGet("{groupId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GroupDto>> GetGroup(Guid groupId)
        {
            var groupExists = await _groupRepository.GroupExists(groupId);
            if (!groupExists) return NotFound();

            var groupFromRepo = await _groupRepository.GetGroup(groupId);

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var groupFromAzureAd = await _azureAdRepository.GetGroup(client, groupId.ToString());

            var mergedGroup = DataMerger.MergeGroupWithAzureData(groupFromRepo,
                groupFromAzureAd, _mapper);

            return mergedGroup;
        }

        
        // PUT: api/groups/5
        [HttpPut("{groupId}")]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateGroup(Guid groupId, GroupModificationDto group)
        {
            var groupExists = await _groupRepository.GroupExists(groupId);
            if (!groupExists) return NotFound();

            var groupEntity = _mapper.Map<Group>(group);
            groupEntity.Id = groupId;
            groupEntity.LastModificationDate = new DateTimeOffset(DateTime.Now);
            _groupRepository.UpdateGroup(groupEntity);
            await _groupRepository.Save();

            return NoContent();
        }

        [HttpPatch("{groupId}")]
        [Consumes("application/json-patch+json")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateGroupPartially(Guid groupId,
            [FromBody] JsonPatchDocument<GroupModificationDto> patchDoc)
        {
            var groupExists = await _groupRepository.GroupExists(groupId);
            if (!groupExists) return NotFound();

            var groupFromRepo = await _groupRepository.GetGroup(groupId);
            
            var groupToPatch = _mapper.Map<GroupModificationDto>(groupFromRepo);
            
            patchDoc.ApplyTo(groupToPatch, ModelState);

            if (!TryValidateModel(groupToPatch))
            {
                return ValidationProblem(ModelState);
            }

            _mapper.Map(groupToPatch, groupFromRepo);
            
            groupFromRepo.LastModificationDate = new DateTimeOffset(DateTime.Now);
            _groupRepository.UpdateGroup(groupFromRepo);
            await _groupRepository.Save();

            return NoContent();
        }

        // DELETE: api/groups/5
        [HttpDelete("{groupId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteGroup(Guid groupId)
        {
            var groupExists = await _groupRepository.GroupExists(groupId);
            if (!groupExists) return NotFound();

            var groupFromRepo = await _groupRepository.GetGroup(groupId);

            _groupRepository.DeleteGroup(groupFromRepo);
            await _groupRepository.Save();

            return NoContent();
        }
        
        // GET: api/groups/5/users
        [HttpGet("{groupId}/users")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetGroupUsers(Guid groupId)
        {
            var groupExists = await _groupRepository.GroupExists(groupId);
            if (!groupExists) return NotFound();

            var allUsersFromRepo = await _userRepository.GetUsers();

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var groupUsersFromAzureAd = await _azureAdRepository
                .GetGroupMembers(client, groupId.ToString());
            
            var mergedUsers = DataMerger.MergeUsersWithAzureData(allUsersFromRepo,
                groupUsersFromAzureAd, _mapper);

            return Ok(mergedUsers);
        }

        // GET: api/groups/5/smart-locks
        [HttpGet("{groupId}/smart-locks")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<SmartLockDto>>> GetGroupSmartLocks(Guid groupId)
        {
            var groupExists = await _groupRepository.GroupExists(groupId);
            if (!groupExists) return NotFound();

            var allGroupSmartLocksFromRepo = await _groupRepository.GetGroupSmartLocks(groupId);

            var groupSmartLocksDto = _mapper.Map<IEnumerable<SmartLockDto>>(allGroupSmartLocksFromRepo);

            return Ok(groupSmartLocksDto);
        }
    }
}