using System;

namespace api.Models
{
    public class SmartLockGroupDto
    {
        public Guid GroupId { get; set; }
        public Guid SmartLockId { get; set; }
        public DateTimeOffset CreationDate { get; set; }
    }
}