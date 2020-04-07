using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;
using Newtonsoft.Json;
using User = api.Entities.User;

namespace api.Controllers
{
    //[Authorize("admin")]
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IMapper _mapper;


        public UsersController(IUserRepository userRepository, IAzureAdRepository azureAdRepository,IMapper mapper)
        {
            _userRepository = userRepository ??
                              throw new ArgumentNullException(nameof(userRepository));
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(azureAdRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();

            var userFromRepo = await _userRepository.GetUsers();
            var usersFromAzureAd = await _azureAdRepository.GetUsers(client);

            var a = _mapper.Map<IEnumerable<UserDto>>(userFromRepo);
            var b = _mapper.Map<IEnumerable<UserDto>>(usersFromAzureAd);
            // var merged = _mapper.Map(b,a );
            //return Ok(JsonConvert.SerializeObject(merged));
            return Ok(JsonConvert.SerializeObject(new { fromDb = a, fromAzure=b}));
        }

        // GET: api/Users/5
        [HttpGet("{userId}")]
        public async Task<ActionResult<User>> GetUser(Guid userId)
        {
            var userFromRepo = await _userRepository.GetUser(userId);
            if (userFromRepo == null) return NotFound();
            

            return Ok(_mapper.Map<UserDto>(userFromRepo));
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(Guid userId, User user)
        {
            if (userId != user.Id) return BadRequest();

            _userRepository.UpdateUser(user);
            await _userRepository.Save();

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {
            var userEntity = _mapper.Map<User>(user);
            _userRepository.AddUser(userEntity);
            await _userRepository.Save();

            return CreatedAtAction("GetUser", new {userId = user.Id}, User);
        }


        // DELETE: api/Users/5
        [HttpDelete("{userId}")]
        public async Task<ActionResult<User>> DeleteUser(Guid userId)
        {
            var userFromRepo = await _userRepository.GetUser(userId);

            if (userFromRepo == null)
            {
                return NotFound();
            }
            _userRepository.DeleteUser(userFromRepo);
            await _userRepository.Save();

            return NoContent();
        }
    }
}