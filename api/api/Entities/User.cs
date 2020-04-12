using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using api.Types;

namespace api.Entities
{
    [Table("Users")]
    public class User
    {
        public User()
        {
            SmartLockUsers = new List<SmartLockUser>();
            CreationDate = new DateTimeOffset(DateTime.Now);
        }
        
        [Key] 
        public Guid Id { get; set; }
        public Status Status { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public DateTimeOffset? LastModificationDate { get; set; }
        public ICollection<SmartLockUser> SmartLockUsers { get; set; }
    }
}