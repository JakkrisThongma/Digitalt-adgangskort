using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Graph;


namespace api.Controllers
{
    [Produces("application/json")]
    [Route("api/accesses")]
    [ApiController]
    public class AccessesController : ControllerBase
    {
        private readonly IAccessesService _accessesService;
        private readonly IUserRepository _userRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly ISmartLockRepository _smartLockRepository;
        private readonly IMapper _mapper;

        public AccessesController( IAccessesService accessesService, IUserRepository userRepository,
            ISmartLockRepository smartLockRepository, IAzureAdRepository azureAdRepository, IMapper mapper)
        {
     
            _accessesService = accessesService ??
                               throw new ArgumentNullException(nameof(accessesService));
            _userRepository = userRepository ??
                              throw new ArgumentNullException(nameof(userRepository));
            _smartLockRepository = smartLockRepository ??
                                   throw new ArgumentNullException(nameof(smartLockRepository));
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(azureAdRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }
        
        // GET: api/accesses
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<AdminAccessDto>>> GetAccesses()
        {
            var mergedAccessLogs = await _accessesService.GetAccesses();
            return Ok(mergedAccessLogs);
        }
        
        
        // Post: api/accesses
        [HttpPost]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<UserAccessDto>> AccessSmartLock(SmartLockUserAccessDto smartLockUser)
        {
            var userExists = await _userRepository.UserExists(smartLockUser.UserId);
            if (!userExists) return NotFound();
            
            var smartLockExists = await _smartLockRepository.SmartLockExists(smartLockUser.SmartLockId);
            if (!smartLockExists) return NotFound();
            
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            try
            {
                await _azureAdRepository.GetUser(client, smartLockUser.UserId.ToString());
            }
            catch (ServiceException e)
            {
                if (e.StatusCode == HttpStatusCode.NotFound)
                {
                    ModelState.AddModelError("azureAdUserNotFound",
                        $"User with id: {smartLockUser.UserId} was not found on Azure AD");
                }
            }
            
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var userAccessStatus = await _accessesService.GetUserAccessStatus(smartLockUser);
            return Ok(userAccessStatus);
        }
    }
}