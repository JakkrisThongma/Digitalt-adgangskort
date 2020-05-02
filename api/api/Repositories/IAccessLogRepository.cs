using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;

namespace api.Repositories
{
    public interface IAccessLogRepository
    {
        Task<IEnumerable<Access>> GetAccessLog();
        void AddAccess(Access access);
        Task<bool> Save();
    }
}