using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("SmartLockUsers")]
    public class SmartLockUser
    {
        public SmartLockUser()
        {
            CreationDate = new DateTimeOffset(DateTime.Now);
        }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid SmartLockId { get; set; }
        public SmartLock SmartLock { get; set; }
        public DateTimeOffset CreationDate { get; set; }
    }
}