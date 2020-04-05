using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("Groups")]
    public class Group
    {
        public Group()
        {
            SmartLockGroups = new List<SmartLockGroup>();
        }

        [Key] public Guid Id { get; set; }

        public List<SmartLockGroup> SmartLockGroups { get; set; }
    }
}