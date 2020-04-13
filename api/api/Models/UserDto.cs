using System;
using System.Collections.Generic;
using api.Entities;
using api.Types;

namespace api.Models
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string GivenName { get; set; } 
        public string Surname { get; set; }
        public string UserPrincipalName { get; set; }
        public string MobilePhone { get; set; }
        public string Mail { get; set; }
        public string JobTitle { get; set; }
        public string OfficeLocation { get; set; }
        public Status Status { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public DateTimeOffset? LastModificationDate { get; set; }
        public string PhotoBase64String { get; set; }


    }
}