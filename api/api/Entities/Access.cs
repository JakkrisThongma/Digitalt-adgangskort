using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.ValidationAttributes;

namespace api.Entities
{
    [Table("AccessLog")]
    public class Access
    {
        public Access()
        {
            Time = new DateTimeOffset(DateTime.Now);
        }
        
        [Key] 
        [NonEmptyGuid]
        public Guid Id { get; set; }
        [NonEmptyGuid]
        public Guid UserId { get; set; }
        [NonEmptyGuid]
        public Guid SmartLockId { get; set; }
        public bool IsValid { get; set; }
        public string Info { get; set; }
        public DateTimeOffset Time { get; set; }
    }
}