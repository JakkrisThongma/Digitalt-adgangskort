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
        public async Task<ActionResult<IEnumerable<DoorLock>>> GetLocks()
        {
            return await _context.DoorLocks.ToListAsync();
        }

        // GET: api/Locks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DoorLock>> GetLock(int id)
        {
            var @lock = await _context.DoorLocks.FindAsync(id);

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
        public async Task<IActionResult> PutLock(int id, DoorLock doorLock)
        {
            if (id != doorLock.DoorLockId)
            {
                return BadRequest();
            }

            _context.Entry(doorLock).State = EntityState.Modified;

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
        public async Task<ActionResult<DoorLock>> PostLock(DoorLock doorLock)
        {
            _context.DoorLocks.Add(doorLock);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLock", new { id = doorLock.DoorLockId }, doorLock);
        }

        // DELETE: api/Locks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DoorLock>> DeleteLock(int id)
        {
            var @lock = await _context.DoorLocks.FindAsync(id);
            if (@lock == null)
            {
                return NotFound();
            }

            _context.DoorLocks.Remove(@lock);
            await _context.SaveChangesAsync();

            return @lock;
        }

        private bool LockExists(int id)
        {
            return _context.DoorLocks.Any(e => e.DoorLockId == id);
        }
    }
}
