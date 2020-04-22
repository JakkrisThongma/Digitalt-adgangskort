using System;
using api.ValidationAttributes;

namespace api.Models
{
    public class GroupCollectionDto
    {
        [NonEmptyGuid]
        public Guid GroupId { get; set; }
    }
}