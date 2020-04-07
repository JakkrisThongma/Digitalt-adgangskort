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
        public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();

            var groupFromRepo = await _groupRepository.GetGroups();
            var usersFromAzureAd = await _azureAdRepository.GetGroups(client);

            var a = _mapper.Map<IEnumerable<GroupDto>>(groupFromRepo);
            var b = _mapper.Map<IEnumerable<GroupDto>>(usersFromAzureAd);

            return Ok(JsonConvert.SerializeObject(new { fromDb = a, fromAzure = b }));
        }

        // GET: api/Groups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> GetGroup(Guid id)
        {
            var groupFromRepo = await _groupRepository.GetGroup(id);

            if (groupFromRepo == null)
                return NotFound();

            return Ok(_mapper.Map<GroupDto>(groupFromRepo));
        }

        // PUT: api/Groups/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{GroupId}")]
        public async Task<IActionResult> UpdateGroup(Guid groupId, Group group)
        {
            if (groupId != group.Id) return BadRequest();

            _groupRepository.UpdateGroup(group);
            await _groupRepository.Save();

            return NoContent();
        }

        // POST: api/Groups
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Group>> CreateGroup([FromBody]Group group)
        {
            var groupEntity = _mapper.Map<Group>(group);
            _groupRepository.AddGroup(groupEntity);
            await _groupRepository.Save();

            return CreatedAtAction("GetGroup", new { groupId = group.Id }, group);
        }

        // DELETE: api/Groups/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Group>> DeleteGroup(Guid groupId)
        {
            var groupFromRepo = _groupRepository.GetGroup(groupId);
            
            if (groupFromRepo == null) return NotFound();

             _groupRepository.DeleteGroup(groupFromRepo);
            await _groupRepository.Save();

            return NoContent();
        }


    }
}