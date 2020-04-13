using System;
using api.ValidationAttributes;

namespace api.Models
{
    public class SmartLockUserCreationDto
    {
        [NonEmptyGuid]
        public Guid UserId { get; set; }
    }
}