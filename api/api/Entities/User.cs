using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("Users")]
    public class User
    {
        public User()
        {
            SmartLockUsers = new List<SmartLockUser>();
        }

        [Key] public Guid Id { get; set; }

        public ICollection<SmartLockUser> SmartLockUsers { get; set; }
    }
}