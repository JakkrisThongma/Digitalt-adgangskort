using System.Collections.Generic;
using api.Entities;

namespace api.Models
{
    public class SmartLockDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ManufactureId { get; set; }

        public List<User> Users { get; set; }
        public List<Group> Groups { get; set; }
    }
}