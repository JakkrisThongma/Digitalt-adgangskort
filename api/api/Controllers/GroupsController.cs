using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace api.Controllers
{
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

        // GET: api/Groups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetGroups()
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();

            var groupsFromRepo = await _groupRepository.GetGroups();
            var allGroupsFromAzureAd = await _azureAdRepository.GetGroups(client);

            var mergedGroups = (from groupFromRepo in groupsFromRepo
                               from dbUserFromAzureAd in allGroupsFromAzureAd
                               where groupFromRepo.Id == Guid.Parse(dbUserFromAzureAd.Id)
                               let dtoFromDb = _mapper.Map<GroupDto>(groupFromRepo)
                               select _mapper.Map(dbUserFromAzureAd, dtoFromDb));

            return Ok(mergedGroups);
        }

        // GET: api/Groups/5
        [HttpGet("{groupId}")]
        public async Task<ActionResult<GroupDto>> GetGroup(Guid groupId)
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();

            var groupFromRepo = await _groupRepository.GetGroup(groupId);

            if (groupFromRepo == null)
                return NotFound();

            var groupFromAzureAd = await _azureAdRepository.GetGroup(client, groupId.ToString());

            var dtoFromDb = _mapper.Map<GroupDto>(groupFromRepo);

            return _mapper.Map(groupFromAzureAd, dtoFromDb);
        }

        // PUT: api/Groups/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{groupId}")]
        public async Task<IActionResult> UpdateGroup(Guid groupId, GroupModificationDto group)
        {
            if (!await _groupRepository.GroupExists(groupId)) return BadRequest();
            var groupEntity = _mapper.Map<Group>(group);
            groupEntity.Id = groupId;
            groupEntity.LastModificationDate = new DateTimeOffset(DateTime.Now);
            _groupRepository.UpdateGroup(groupEntity);
            await _groupRepository.Save();

            return NoContent();
        }

        // POST: api/Groups
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<GroupDto>> CreateGroup([FromBody] GroupCreationDto group)
        {
            var groupEntity = _mapper.Map<Group>(group);
            _groupRepository.AddGroup(groupEntity);
            await _groupRepository.Save();

            return CreatedAtAction("GetGroup", new { groupId = group.Id }, group);
        }

        // DELETE: api/Groups/5
        [HttpDelete("{groupId}")]
        public async Task<ActionResult<Group>> DeleteGroup(Guid groupId)
        {
            var groupFromRepo = await _groupRepository.GetGroup(groupId);
            
            if (groupFromRepo == null) 
                return NotFound();

             _groupRepository.DeleteGroup(groupFromRepo);
            await _groupRepository.Save();

            return NoContent();
        }


    }
}