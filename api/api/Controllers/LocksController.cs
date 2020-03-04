using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocksController : ControllerBase
    {
        private readonly ApiContext _context;

        public LocksController(ApiContext context)
        {
            _context = context;
        }

        // GET: api/Locks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lock>>> GetLocks()
        {
            return await _context.Locks.ToListAsync();
        }

        // GET: api/Locks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lock>> GetLock(int id)
        {
            var @lock = await _context.Locks.FindAsync(id);

            if (@lock == null)
            {
                return NotFound();
            }

            return @lock;
        }

        // PUT: api/Locks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLock(int id, Lock @lock)
        {
            if (id != @lock.LockId)
            {
                return BadRequest();
            }

            _context.Entry(@lock).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LockExists(id))
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

        // POST: api/Locks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Lock>> PostLock(Lock @lock)
        {
            _context.Locks.Add(@lock);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLock", new { id = @lock.LockId }, @lock);
        }

        // DELETE: api/Locks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Lock>> DeleteLock(int id)
        {
            var @lock = await _context.Locks.FindAsync(id);
            if (@lock == null)
            {
                return NotFound();
            }

            _context.Locks.Remove(@lock);
            await _context.SaveChangesAsync();

            return @lock;
        }

        private bool LockExists(int id)
        {
            return _context.Locks.Any(e => e.LockId == id);
        }
    }
}
