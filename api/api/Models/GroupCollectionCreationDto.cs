using System;
using api.ValidationAttributes;

namespace api.Models
{
    public class GroupCollectionCreationDto
    {
        [NonEmptyGuid]
        public Guid GroupId { get; set; }
    }
}