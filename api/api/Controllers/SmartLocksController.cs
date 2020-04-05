using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/smart-locks")]
    [ApiController]
    public class SmartLocksController : ControllerBase
    {
        private readonly ApiContext _context;

        public SmartLocksController(ApiContext context)
        {
            _context = context;
        }

        // GET: api/Locks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SmartLock>>> GetLocks()
        {
            return await _context.SmartLocks.ToListAsync();
        }

        // GET: api/Locks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SmartLock>> GetLock(Guid id)
        {
            var smartLock = await _context.SmartLocks.FindAsync(id);

            if (smartLock == null) return NotFound();

            return smartLock;
        }

        // PUT: api/Locks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLock(Guid id, SmartLock smartLock)
        {
            if (id != smartLock.Id) return BadRequest();

            _context.Entry(smartLock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LockExists(id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        // POST: api/Locks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<SmartLock>> PostLock(SmartLock smartLock)
        {
            _context.SmartLocks.Add(smartLock);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLock", new {id = smartLock.Id}, smartLock);
        }

        // DELETE: api/Locks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SmartLock>> DeleteLock(Guid id)
        {
            var smartLock = await _context.SmartLocks.FindAsync(id);
            if (smartLock == null) return NotFound();

            _context.SmartLocks.Remove(smartLock);
            await _context.SaveChangesAsync();

            return smartLock;
        }

        private bool LockExists(Guid id)
        {
            return _context.SmartLocks.Any(e => e.Id.Equals(id));
        }
    }
}