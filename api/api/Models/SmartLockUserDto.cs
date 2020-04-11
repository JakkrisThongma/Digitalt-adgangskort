using System;

namespace api.Models
{
    public class SmartLockUserDto
    {
        public Guid UserId { get; set; }
        public Guid SmartLockId { get; set; }
        public DateTimeOffset CreationDate { get; set; }
    }
}