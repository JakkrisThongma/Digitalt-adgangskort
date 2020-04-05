using System.Collections.Generic;
using api.Entities;

namespace api.Models
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public int MobilePhone { get; set; }
        public string Email { get; set; }
        public string JobTitle { get; set; }
        public string officeLocation { get; set; }
        
        public List<Group> Groups { get; set; }
        public List<SmartLock> Locks { get; set; }
    }
}