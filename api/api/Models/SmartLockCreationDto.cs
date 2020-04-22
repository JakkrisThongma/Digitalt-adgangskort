using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using api.Types;
using api.ValidationAttributes;

namespace api.Models
{
	public class SmartLockCreationDto
	{
		[Required]
		[MaxLength(100, ErrorMessage = "The title can't include more than 100 characters.")]
		public string Title { get; set; }
		[MaxLength(1000, ErrorMessage = "The description can't include more than 1000 characters.")]
		public string Description { get; set; }
		[MaxLength(100, ErrorMessage = "The manufacture Id can't include more than 100 characters.")]
		public string ManufactureId { get; set; }
		public Status Status { get; set; }
		
		public ICollection<UserCollectionDto> SmartLockUsers { get; set; }
			= new List<UserCollectionDto>();
		
		public ICollection<GroupCollectionDto> SmartLockGroups { get; set; }
			= new List<GroupCollectionDto>();
		
	}
}
