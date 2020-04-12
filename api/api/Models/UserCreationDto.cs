using System;
using api.Types;
using api.ValidationAttributes;

namespace api.Models
{
    public class UserCreationDto
    {
        [NonEmptyGuid]
        public Guid Id { get; set; }
   
        public Status Status { get; set; }
        
    }
}