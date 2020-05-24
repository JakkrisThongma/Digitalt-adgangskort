using System;
using System.Collections.Generic;

namespace api.Models
{
    public class AzureAdUserDto
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string GivenName { get; set; } 
        public string Surname { get; set; }
        public string UserPrincipalName { get; set; }
        public string MobilePhone { get; set; }
        public string Mail { get; set; }
        public string JobTitle { get; set; }
        public string OfficeLocation { get; set; }
        public List<string> BusinessPhones { get; set; }
        public bool AddedToDb { get; set; }


    }
}