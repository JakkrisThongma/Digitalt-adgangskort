using System;
using System.Collections.Generic;
using api.Types;

namespace api.Models
{
    public class UserModificationDto
    {
        public Status Status { get; set; }
        public ICollection<SmartLockCollectionDto> SmartLockUsers { get; set; }
            = new List<SmartLockCollectionDto>();
        
    }
}