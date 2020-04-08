using api.Types;
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
            CreationDate = new DateTimeOffset(DateTime.Now);
        }

        [Key] 
        public Guid Id { get; set; }
        public Status Status { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public DateTimeOffset LastModificationDate { get; set; }
        public ICollection<SmartLockGroup> SmartLockGroups { get; set; }
    }
}