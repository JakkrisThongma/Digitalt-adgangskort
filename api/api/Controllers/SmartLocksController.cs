using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;
using api.Models;
using api.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Route("api/smart-locks")]
    [ApiController]
    public class SmartLocksController : ControllerBase
    {
        private readonly ISmartLockRepository _smartLockRepository;
        private readonly IMapper _mapper;

        public SmartLocksController(ISmartLockRepository smartLockRepository, IMapper mapper)
        {
            _smartLockRepository = smartLockRepository ??
                              throw new ArgumentNullException(nameof(smartLockRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }

        // GET: api/smart-locks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SmartLockDto>>> GetSmartLocks()
        {
            var smartLocksFromRepo = await _smartLockRepository.GetSmartLocks();
            var smartLocksDto = _mapper.Map<IEnumerable<SmartLockDto>>(smartLocksFromRepo);

            return Ok(smartLocksDto);
        }

        // GET: api/smart-locks/5
        [HttpGet("{smartLockId}")]
        public async Task<ActionResult<SmartLockDto>> GetSmartLock(Guid smartLockId)
        {
            var smartLockFromRepo = await _smartLockRepository.GetSmartLock(smartLockId);

            if (smartLockFromRepo == null) return NotFound();
            var smartLock = _mapper.Map<SmartLockDto>(smartLockFromRepo);

            return Ok(smartLock);
        }
        
        // POST: api/smart-locks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult> CreateSmartLock(SmartLockCreationDto smartLock)
        {
            var smartLockEntity = _mapper.Map<SmartLock>(smartLock);
            _smartLockRepository.AddSmartLock(smartLockEntity);
            await _smartLockRepository.Save();
            
            return CreatedAtAction("GetSmartLock", new { id = smartLock.Id }, smartLock);
        }

        // PUT: api/smart-locks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{smartLockId}")]
        public async Task<IActionResult> UpdateSmartLock(Guid smartLockId, SmartLockModificationDto smartLock)
        {
            if (!await _smartLockRepository.SmartLockExists(smartLockId)) return BadRequest();
            var smartLockEntity = _mapper.Map<SmartLock>(smartLock);
            smartLockEntity.Id = smartLockId;
            smartLockEntity.LastModificationDate = new DateTimeOffset(DateTime.Now);
            _smartLockRepository.UpdateSmartLock(smartLockEntity);
            await _smartLockRepository.Save();

            return NoContent();
        }

        // DELETE: api/smart-locks/5
        [HttpDelete("{smartLockId}")]
        public async Task<ActionResult> DeleteSmartLock(Guid smartLockId)
        {
            var smartLockFromRepo = await _smartLockRepository.GetSmartLock(smartLockId);

            if (smartLockFromRepo == null) return NotFound();

            _smartLockRepository.DeleteSmartLock(smartLockFromRepo);
            await _smartLockRepository.Save();

            return NoContent();
        }
    }
}