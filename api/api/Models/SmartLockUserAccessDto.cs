using System;
using api.ValidationAttributes;

namespace api.Models
{
    public class SmartLockUserAccessDto
    {
        [NonEmptyGuid]
        public Guid UserId { get; set; }
        [NonEmptyGuid]
        public Guid SmartLockId { get; set; }

    }
}