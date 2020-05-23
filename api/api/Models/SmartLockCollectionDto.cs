using System;
using api.ValidationAttributes;

namespace api.Models
{
    public class SmartLockCollectionDto
    {
        [NonEmptyGuid]
        public Guid SmartLockId { get; set; }
    }
}