using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
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
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IMapper _mapper;

        public GroupsController(IGroupRepository groupRepository, IAzureAdRepository azureAdRepository, IMapper mapper)
        {
            _groupRepository = groupRepository ??
                               throw new ArgumentNullException(nameof(groupRepository));
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(azureAdRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }

        // GET: api/groups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups()
        {
            var allGroupsFromRepo = await _groupRepository.GetGroups();

            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var allGroupsFromAzureAd = await _azureAdRepository.GetGroups(client);

            var mergedGroups = DataMerger.MergeGroupsWithAzureData(allGroupsFromRepo,
                allGroupsFromAzureAd, _mapper);

            return Ok(mergedGroups);
        }

        // GET: api/groups/5
        [HttpGet("{groupId}")]
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

        // POST: api/groups
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult> CreateGroup([FromBody] GroupCreationDto group)
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
                    return BadRequest("Group was not found on Azure AD");
                }
            }

            var groupExists = await _groupRepository.GroupExists(group.Id);
            if (groupExists) return Conflict("Group already exists");

            var groupEntity = _mapper.Map<Group>(group);
            _groupRepository.AddGroup(groupEntity);
            await _groupRepository.Save();

            return CreatedAtAction("GetGroup", new {groupId = group.Id}, group);
        }

        // PUT: api/groups/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{groupId}")]
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

        // DELETE: api/groups/5
        [HttpDelete("{groupId}")]
        public async Task<ActionResult> DeleteGroup(Guid groupId)
        {
            var groupExists = await _groupRepository.GroupExists(groupId);
            if (!groupExists) return NotFound();

            var groupFromRepo = await _groupRepository.GetGroup(groupId);

            _groupRepository.DeleteGroup(groupFromRepo);
            await _groupRepository.Save();

            return NoContent();
        }

        // GET: api/groups/5/smart-locks
        [HttpGet("{groupId}/smart-locks")]
        public async Task<ActionResult<IEnumerable<SmartLockDto>>> GetSmartLockGroups(Guid groupId)
        {
            var groupExists = await _groupRepository.GroupExists(groupId);
            if (!groupExists) return NotFound();

            var allGroupSmartLocksFromRepo = await _groupRepository.GetGroupSmartLocks(groupId);

            var groupSmartLocksDto = _mapper.Map<IEnumerable<SmartLockDto>>(allGroupSmartLocksFromRepo);

            return Ok(groupSmartLocksDto);
        }
    }
}