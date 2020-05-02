using System.Collections.Generic;
using System.Threading.Tasks;
using api.Models;

namespace api.Services
{
    public interface IAccessesService
    {
        Task<UserAccessDto> GetUserAccessStatus(SmartLockUserAccessDto smartLockUser);
        Task<IEnumerable<AdminAccessDto>> GetAccesses();

    }
}