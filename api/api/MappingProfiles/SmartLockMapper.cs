using api.Types;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.MappingProfiles
{
	public class SmartLockMapper : Profile
	{
        public SmartLockMapper()
		{
            CreateMap<Entities.SmartLock, Models.SmartLockDto>();

            CreateMap<Models.SmartLockDto, Entities.SmartLock>();
            CreateMap<Models.SmartLockCreationDto, Entities.SmartLock>();
            CreateMap<Models.SmartLockModificationDto, Entities.SmartLock>();

            CreateMap<Status, string>().ConvertUsing(src => src.ToString().ToLower());
            CreateMap<string, Status>().ConvertUsing(src => (Status)Enum.Parse(typeof(Status), src, true));
        }
	}
}
