using System;
using api.ValidationAttributes;

namespace api.Models
{
    public class SmartLockGroupCreationDto
    {
        [NonEmptyGuid]
        public Guid GroupId { get; set; }

    }
}