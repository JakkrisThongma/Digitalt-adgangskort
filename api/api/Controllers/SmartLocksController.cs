using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Models;
using api.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace api.Controllers
{
    [Route("api/smart-locks")]
    [ApiController]
    public class SmartLocksController : ControllerBase
    {
        private readonly ISmartLockRepository _smartLockRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IMapper _mapper;

        public SmartLocksController(ISmartLockRepository smartLockRepository, IAzureAdRepository azureAdRepository, IMapper mapper)
        {
            _smartLockRepository = smartLockRepository ??
                              throw new ArgumentNullException(nameof(smartLockRepository));
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(azureAdRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }

        // GET: api/Locks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SmartLock>>> GetLocks()
        {
            var smartLockFromRepo = await _smartLockRepository.GetSmartLocks();

            return Ok(JsonConvert.SerializeObject(smartLockFromRepo));
        }

        // GET: api/Locks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SmartLock>> GetLock(Guid id)
        {
            var smartLockFromRepo = await _smartLockRepository.GetSmartLock(id);

            if (smartLockFromRepo == null) return NotFound();

            return Ok(JsonConvert.SerializeObject(smartLockFromRepo));
        }

        // PUT: api/Locks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLock(Guid smartLockId, SmartLock smartLock)
        {
            if (smartLockId != smartLock.Id) return BadRequest();

            _smartLockRepository.UpdateSmartLock(smartLock);
            await _smartLockRepository.Save();

            return NoContent();
        }

        // POST: api/Locks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        //[HttpPost]
        //public async Task<ActionResult<SmartLock>> PostLock(SmartLock smartLock)
        //{
        //    _context.SmartLocks.Add(smartLock);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetLock", new { id = smartLock.Id }, smartLock);
        //}

        // DELETE: api/Locks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SmartLock>> DeleteLock(Guid smartLockId)
        {
            var smartLockFromRepo = await _smartLockRepository.GetSmartLock(smartLockId);

            if (smartLockFromRepo == null) return NotFound();

            _smartLockRepository.DeleteSmartLock(smartLockFromRepo);
            await _smartLockRepository.Save();

            return NoContent();
        }
    }
}