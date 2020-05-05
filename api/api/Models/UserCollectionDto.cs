using System;
using api.ValidationAttributes;

namespace api.Models
{
    public class UserCollectionDto
    {
        [NonEmptyGuid]
        public Guid UserId { get; set; }
    }
}