using System;

namespace api.Models
{
    public class AdminAccessDto
    {
   
        public Guid Id { get; set; }
        public Guid SmartLockId { get; set; }
        public string SmartLockTitle { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Info { get; set; }
        public bool IsValid { get; set; }
        public DateTimeOffset Time { get; set; }
    }
}