using System;
using api.ValidationAttributes;

namespace api.Models
{
    public class SmartLockCollectionCreationDto
    {
        [NonEmptyGuid]
        public Guid SmartLockId { get; set; }
    }
}