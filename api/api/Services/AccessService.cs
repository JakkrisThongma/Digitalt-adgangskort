using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using api.Models;
using api.Repositories;
using AutoMapper;
using Status = api.Types.Status;

namespace api.Services
{
    public class AccessService : IAccessService
    {
        private readonly IAccessRepository _accessRepository;
        private readonly IUserRepository _userRepository;
        private readonly IGroupRepository _groupRepository;
        private readonly ISmartLockRepository _smartLockRepository;
        private readonly IAzureAdRepository _azureAdRepository;
        private readonly IMapper _mapper;

        public AccessService(IAccessRepository accessRepository, IUserRepository userRepository,
            IGroupRepository groupRepository, ISmartLockRepository smartLockRepository 
            ,IAzureAdRepository azureAdRepository, IMapper mapper)
        {
            _accessRepository = accessRepository ??
                                throw new ArgumentNullException(nameof(accessRepository));
            _userRepository = userRepository ??
                              throw new ArgumentNullException(nameof(userRepository));
            _groupRepository = groupRepository ??
                               throw new ArgumentNullException(nameof(groupRepository));
            _smartLockRepository = smartLockRepository ??
                                   throw new ArgumentNullException(nameof(smartLockRepository));
            _azureAdRepository = azureAdRepository ??
                                 throw new ArgumentNullException(nameof(azureAdRepository));
            _mapper = mapper ??
                      throw new ArgumentNullException(nameof(mapper));
        }
        
        public async Task<IEnumerable<AdminAccessDto>> GetAccesses()
        {
            var allAccessesFromRepo = await _accessRepository.GetAccesses();
            
            var client = await MicrosoftGraphClient.GetGraphServiceClient();
            var allUsersFromAzureAd = await _azureAdRepository.GetUsers(client);
            var allSmartLocks =await _smartLockRepository.GetSmartLocks();
            var logsFromRepo = allAccessesFromRepo.ToList();
        
            var mergedUsers = (from logFromRepo in logsFromRepo
                    from dbUserFromAzureAd in allUsersFromAzureAd
                    where logFromRepo.UserId == Guid.Parse(dbUserFromAzureAd.Id)
                    let dtoFromDb = _mapper.Map<AdminAccessDto>(logFromRepo)
                    select _mapper.Map(dbUserFromAzureAd, dtoFromDb))
                .OrderByDescending(al => al.Time).ToList();

            var mergedSmartLocks = (from logFromRepo in logsFromRepo
                from smartLockFromRepo in allSmartLocks
                where logFromRepo.SmartLockId == smartLockFromRepo.Id
                let dtoFromDb = _mapper.Map<AdminAccessDto>(logFromRepo)
                select _mapper.Map(smartLockFromRepo, dtoFromDb)).ToList();
            
            
            foreach (var ul in mergedUsers)
            {
                foreach (var sll in mergedSmartLocks)
                {
                    if (ul.SmartLockId == sll.SmartLockId)
                    {
                        ul.SmartLockTitle = sll.SmartLockTitle;
                    }
                }
                        
            }
            
            return mergedUsers;
        }
        
         public async Task<UserAccessDto> GetUserAccessStatus(SmartLockUserAccessDto smartLockUser)
        {
            var client = await MicrosoftGraphClient.GetGraphServiceClient();

            var smartLockUserExists =
                await _smartLockRepository.SmartLockUserExists(smartLockUser.SmartLockId, smartLockUser.UserId);

            if (smartLockUserExists)
            {
                var smartLock = await _smartLockRepository.GetSmartLock(smartLockUser.SmartLockId);
                if (smartLock.Status != Types.Status.Active)
                {
                    var inactiveLockAccess = new Access
                    {
                        UserId = smartLockUser.UserId,
                        SmartLockId = smartLockUser.SmartLockId,
                        IsValid = false,
                        Info = "Lock was in inactive state"
                    };
                    _accessRepository.AddAccess(inactiveLockAccess);
                    await _accessRepository.Save();
                    return new UserAccessDto
                    {
                        AccessAuthorized = false
                        
                    };
                }
                var user = await _userRepository.GetUser(smartLockUser.UserId);

                if (user.Status != Types.Status.Active)
                {
                    var inactiveUserAccess = new Access
                    {
                        UserId = smartLockUser.UserId,
                        SmartLockId = smartLockUser.SmartLockId,
                        IsValid = false,
                        Info = "User was in inactive state"
                    };
                    _accessRepository.AddAccess(inactiveUserAccess);
                    await _accessRepository.Save();
                    return new UserAccessDto
                    {
                        AccessAuthorized = false
                        
                    };
                }
                var validAccess = new Access
                {
                    UserId = smartLockUser.UserId,
                    SmartLockId = smartLockUser.SmartLockId,
                    IsValid = true,
                    Info = "Access was permitted for user"
                };
                _accessRepository.AddAccess(validAccess);
                await _accessRepository.Save();
                
                return new UserAccessDto
                {
                    AccessAuthorized = true
                };

            }

            var userGroupsIdsFromAzureAd = await _azureAdRepository
                .GetUserGroupsIds(client, smartLockUser.UserId.ToString());

            foreach (var groupId in userGroupsIdsFromAzureAd)
            {
                var smartLockGroupExists =
                    await _smartLockRepository.SmartLockGroupExists(smartLockUser.SmartLockId, Guid.Parse(groupId));
                if (smartLockGroupExists)
                {
                    var smartLock = await _smartLockRepository.GetSmartLock(smartLockUser.SmartLockId);
                    if (smartLock.Status != Types.Status.Active)
                    {
                        var inactiveLockAccess = new Access
                        {
                            UserId = smartLockUser.UserId,
                            SmartLockId = smartLockUser.SmartLockId,
                            IsValid = false,
                            Info = "Lock was in inactive state"
                        };
                        _accessRepository.AddAccess(inactiveLockAccess);
                        await _accessRepository.Save();
                        
                        return new UserAccessDto
                        {
                            AccessAuthorized = false
                            
                        };
                    }
                    var group = await _groupRepository.GetGroup(Guid.Parse(groupId));

                    if (group.Status != Status.Active)
                    {
                        var inactiveGroupAccess = new Access
                        {
                            UserId = smartLockUser.UserId,
                            SmartLockId = smartLockUser.SmartLockId,
                            IsValid = false,
                            Info = "User group was in inactive state"
                        };
                        _accessRepository.AddAccess(inactiveGroupAccess);
                        await _accessRepository.Save();
                        
                        return new UserAccessDto
                        {
                            AccessAuthorized = false
                        };
                    }
                    var validGroupAccess = new Access
                    {
                        UserId = smartLockUser.UserId,
                        SmartLockId = smartLockUser.SmartLockId,
                        IsValid = true,
                        Info = "Access is permitted for group user"
                    };
                    _accessRepository.AddAccess(validGroupAccess);
                    await _accessRepository.Save();
                    return new UserAccessDto
                    {
                        AccessAuthorized = true
                    };
                }
            }

            var notValidAccess = new Access
            {
                UserId = smartLockUser.UserId,
                SmartLockId = smartLockUser.SmartLockId,
                IsValid = false,
                Info = "Access was denied"
            };
            _accessRepository.AddAccess(notValidAccess);
            await _accessRepository.Save();
            return new UserAccessDto
            {
                AccessAuthorized = false
            };
        }
    }
}