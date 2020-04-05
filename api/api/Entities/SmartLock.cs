using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("SmartLocks")]
    public class SmartLock
    {
        public SmartLock()
        {
            SmartLockGroups = new List<SmartLockGroup>();
            SmartLockUsers = new List<SmartLockUser>();
        }

        [Key] public Guid Id { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }

        public string ManufactureId { get; set; }
        public List<SmartLockGroup> SmartLockGroups { get; set; }
        public List<SmartLockUser> SmartLockUsers { get; set; }
    }
}