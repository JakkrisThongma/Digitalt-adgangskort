using System;
using System.Collections.Generic;
using api.Entities;

namespace api.Models
{
    public class SmartLockDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ManufactureId { get; set; }
        
    }
}