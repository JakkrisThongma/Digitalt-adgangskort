using System;
using api.ValidationAttributes;

namespace api.Models
{
    public class UserCollectionCreationDto
    {
        [NonEmptyGuid]
        public Guid UserId { get; set; }
    }
}