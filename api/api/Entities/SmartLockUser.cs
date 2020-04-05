using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("SmartLockUser")]
    public class SmartLockUser
    {
        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid SmartLockId { get; set; }
        public SmartLock SmartLock { get; set; }
    }
}