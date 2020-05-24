using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Entities;

namespace api.Repositories
{
    public interface IAccessRepository
    {
        Task<IEnumerable<Access>> GetAccesses();
        void AddAccess(Access access);
        Task<bool> Save();
    }
}