using System.Collections.Generic;
using api.Entities;

namespace api.Models
{
    public class GroupDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsDeleted { get; set; }
        public List<User> Users { get; set; }
        public List<SmartLock> Locks { get; set; }
    }
}