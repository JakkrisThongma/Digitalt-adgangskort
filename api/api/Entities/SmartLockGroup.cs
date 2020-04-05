using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("SmartLockGroup")]
    public class SmartLockGroup
    {
        public Guid GroupId { get; set; }
        public Group Group { get; set; }

        public Guid SmartLockId { get; set; }
        public SmartLock SmartLock { get; set; }
    }
}