﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("SmartLockGroups")]
    public class SmartLockGroup
    {
        public SmartLockGroup()
        {
            CreationDate = new DateTimeOffset(DateTime.Now);
        }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
        public Guid SmartLockId { get; set; }
        public SmartLock SmartLock { get; set; }
        public DateTimeOffset CreationDate { get; set; }
    }
}