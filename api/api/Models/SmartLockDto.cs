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
        public string Status { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public DateTimeOffset LastModificationDate { get; set; }

    }
}