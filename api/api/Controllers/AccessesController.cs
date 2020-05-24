using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IAccessService _accessService;
        private readonly IUserRepository _userRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly ISmartLockRepository _smartLockRepository;
        private readonly IMapper _mapper;

        public AccessesController( IAccessService accessService, IUserRepository userRepository,
            ISmartLockRepository smartLockRepository, IAzureAdRepository azureAdRepository, IMapper mapper)
        {
     
            _accessService = accessService ??
                               throw new ArgumentNullException(nameof(accessService));
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
        /// <summary>
        /// Get access log
        /// </summary>
        /// <returns>An ActionResult task of type IEnumerable of AdminAccessDto</returns>
        /// <response code="200">Access log retrieved successfully</response>
        /// <response code="401">Not authorized</response>
        /// <response code="403">Forbidden (User don't have enough privileges)</response>
        /// <response code="404">No users found</response>
        [Authorize("admin")]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<AdminAccessDto>>> GetAccesses()
        {
            var mergedAccessLogs = await _accessService.GetAccesses();
            return Ok(mergedAccessLogs);
        }
        
        
        // Post: api/accesses
        /// <summary>
        /// Verifies user access with smart lock
        /// </summary>
        /// <param name="smartLockUser">Smart lock user to verify</param>
        /// <returns>An ActionResult of type UserAccessDto</returns>
        /// <response code="201">User created successfully</response>
        /// <response code="404">Azure Ad user not found</response>
        /// <response code="401">Not authorized</response>
        /// <response code="400">Validation error</response>
        [HttpPost]
        [Authorize]
        [Consumes("application/json")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
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

            var userAccessStatus = await _accessService.GetUserAccessStatus(smartLockUser);
            return Ok(userAccessStatus);
        }
    }
}