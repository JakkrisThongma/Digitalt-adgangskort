using System;
using System.Collections.Generic;
using api.Types;
using api.ValidationAttributes;

namespace api.Models
{
    public class UserCreationDto
    {
        [NonEmptyGuid]
        public Guid Id { get; set; }
   
        public Status Status { get; set; }
        
        public ICollection<SmartLockCollectionDto> SmartLockUsers { get; set; }
        = new List<SmartLockCollectionDto>();

        
    }
}