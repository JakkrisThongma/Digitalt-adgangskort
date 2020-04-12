using System;

namespace api.Models
{
    public class AzureAdGroupDto
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Description { get; set; }
        public DateTimeOffset CreatedDateTime { get; set; }
        
    }
}