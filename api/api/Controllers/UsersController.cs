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


        public UsersController(IUserRepository userRepository, IAzureAdRepository azureAdRepository, IMapper mapper)
        {
            _userRepository = userRepository ??
                              throw new ArgumentNullException(nameof(userRepository));
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(_azureAdRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();

            var usersFromRepo = await _userRepository.GetUsers();
            var allUsersFromAzureAd = await _azureAdRepository.GetUsers(client);
            
            var mergedUsers = (from userFromRepo in usersFromRepo
                from dbUserFromAzureAd in allUsersFromAzureAd 
                where userFromRepo.Id == Guid.Parse(dbUserFromAzureAd.Id) 
                let dtoFromDb = _mapper.Map<UserDto>(userFromRepo) 
                select _mapper.Map(dbUserFromAzureAd, dtoFromDb));

            return Ok(mergedUsers);
        }

        // GET: api/Users/5
        [HttpGet("{userId}")]
        public async Task<ActionResult<UserDto>> GetUser(Guid userId)
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();

            var userFromRepo = await _userRepository.GetUser(userId);
            if (userFromRepo == null) return NotFound();

            var userFromAzureAd = await _azureAdRepository.GetUser(client, userId.ToString());

            var dtoFromDb = _mapper.Map<UserDto>(userFromRepo);
             
            return _mapper.Map(userFromAzureAd, dtoFromDb);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(Guid userId, UserModificationDto user)
        {
            if (!await _userRepository.UserExists(userId) ) return BadRequest();
            var userEntity = _mapper.Map<User>(user);
            userEntity.Id = userId;
            userEntity.LastModificationDate = new DateTimeOffset(DateTime.Now);
            _userRepository.UpdateUser(userEntity);
            await _userRepository.Save();

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser([FromBody] UserCreationDto user)
        {
            var userEntity = _mapper.Map<User>(user);
            _userRepository.AddUser(userEntity);
            await _userRepository.Save();

            return CreatedAtAction("GetUser", new {userId = user.Id}, user);
        }


        // DELETE: api/Users/5
        [HttpDelete("{userId}")]
        public async Task<ActionResult> DeleteUser(Guid userId)
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