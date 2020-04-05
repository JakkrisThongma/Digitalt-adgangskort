using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/groups")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly ApiContext _context;

        public GroupsController(ApiContext context)
        {
            _context = context;
        }

        // GET: api/Groups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Group>>> GetGroups()
        {
            return await _context.Groups.ToListAsync();
        }

        // GET: api/Groups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Group>> GetGroup(Guid id)
        {
            var Group = await _context.Groups.FindAsync(id);

            if (Group == null) return NotFound();

            return Group;
        }

        // PUT: api/Groups/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroup(Guid id, Group Group)
        {
            if (id != Group.Id) return BadRequest();

            _context.Entry(Group).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/Groups
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Group>> PostGroup(Group Group)
        {
            _context.Groups.Add(Group);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGroup", new {id = Group.Id}, Group);
        }

        // DELETE: api/Groups/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Group>> DeleteGroup(Guid id)
        {
            var Group = await _context.Groups.FindAsync(id);
            if (Group == null) return NotFound();

            _context.Groups.Remove(Group);
            await _context.SaveChangesAsync();

            return Group;
        }

        private bool GroupExists(Guid id)
        {
            return _context.Groups.Any(e => e.Id.Equals(id));
        }
    }
}