using System.Collections.Generic;
using api.Entities;

namespace api.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int MobilePhone { get; set; }
        public string Email { get; set; }
        public string JobTitle { get; set; }
        public string OfficeLocation { get; set; }

    }
}