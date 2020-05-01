using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Helpers;
using api.Models;
using api.Repositories;
using api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [Produces("application/json")]
    [Route("api/access-log")]
    [ApiController]
    public class AccessLogController : ControllerBase
    {
        private readonly IAccessLogRepository _accessLogRepository;
        private readonly ISmartLockRepository _smartLockRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IMapper _mapper;

        public AccessLogController(IAccessLogRepository accessLogRepository, IUserRepository userRepository,
            ISmartLockRepository smartLockRepository ,IAzureAdRepository azureAdRepository, IMapper mapper)
        {
            _accessLogRepository = accessLogRepository ??
                               throw new ArgumentNullException(nameof(accessLogRepository));
            _smartLockRepository = smartLockRepository ??
                                   throw new ArgumentNullException(nameof(smartLockRepository));
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(azureAdRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }
        
        // GET: api/access-logs
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<AccessLogDto>>> GetAccessLogs()
        {
            var allAccessLogsFromRepo = await _accessLogRepository.GetAccessLog();
            
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var allUsersFromAzureAd = await _azureAdRepository.GetUsers(client);
            var allGroupsFromAzureAd = await _azureAdRepository.GetGroups();

            var allSmartLocks =await _smartLockRepository.GetSmartLocks();
            
            var mergedAccessLogs = DataMerger.MergeAccessLogData(allAccessLogsFromRepo,
                allUsersFromAzureAd, allGroupsFromAzureAd, allSmartLocks, _mapper);

            return Ok(mergedAccessLogs);
        }
        
    }
}