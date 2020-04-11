using api.Types;
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
            CreationDate = new DateTimeOffset(DateTime.Now);
        }

        [Key] public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ManufactureId { get; set; }
        public Status Status { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public DateTimeOffset? LastModificationDate { get; set; }
        public ICollection<SmartLockGroup> SmartLockGroups { get; set; }
        public ICollection<SmartLockUser> SmartLockUsers { get; set; }
    }
}