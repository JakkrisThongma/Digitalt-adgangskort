using System;

namespace api.Models
{
    public class SmartLockUserAccessDto
    {
        public Guid UserId { get; set; }
        public Guid smartLockId { get; set; }

    }
}