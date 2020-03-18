using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccessLevelsController : ControllerBase
    {
        private readonly ApiContext _context;

        public AccessLevelsController(ApiContext context)
        {
            _context = context;
        }

        // GET: api/AccessLevels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccessLevel>>> GetAccessLevels()
        {
            return await _context.AccessLevels.ToListAsync();
        }

        // GET: api/AccessLevels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AccessLevel>> GetAccessLevel(int id)
        {
            var accessLevel = await _context.AccessLevels.FindAsync(id);

            if (accessLevel == null)
            {
                return NotFound();
            }

            return accessLevel;
        }

        // PUT: api/AccessLevels/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAccessLevel(int id, AccessLevel accessLevel)
        {
            if (id != accessLevel.AccessLevelId)
            {
                return BadRequest();
            }

            _context.Entry(accessLevel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AccessLevelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AccessLevels
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<AccessLevel>> PostAccessLevel(AccessLevel accessLevel)
        {
            _context.AccessLevels.Add(accessLevel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAccessLevel", new { id = accessLevel.AccessLevelId }, accessLevel);
        }

        // DELETE: api/AccessLevels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AccessLevel>> DeleteAccessLevel(int id)
        {
            var accessLevel = await _context.AccessLevels.FindAsync(id);
            if (accessLevel == null)
            {
                return NotFound();
            }

            _context.AccessLevels.Remove(accessLevel);
            await _context.SaveChangesAsync();

            return accessLevel;
        }

        private bool AccessLevelExists(int id)
        {
            return _context.AccessLevels.Any(e => e.AccessLevelId == id);
        }
    }
}
