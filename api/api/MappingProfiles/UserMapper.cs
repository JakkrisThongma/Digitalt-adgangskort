using System;
using System.Linq;
using api.Types;
using AutoMapper;

namespace api.MappingProfiles
{
    public class UserMapper : Profile
    {
        public UserMapper()
        {
            CreateMap<Entities.User, Microsoft.Graph.User>();
            CreateMap<Entities.User, Models.UserDto>();
            
            
            CreateMap<Microsoft.Graph.User, Models.UserDto>();
            CreateMap<Microsoft.Graph.User, Entities.User>();
         
            CreateMap<Models.UserDto, Microsoft.Graph.User>();
            CreateMap<Models.UserDto, Entities.User>();
            CreateMap<Models.UserCreationDto, Entities.User>();
            CreateMap<Models.UserModificationDto, Entities.User>();


            CreateMap<Status, string>().ConvertUsing(src => src.ToString().ToLower());
            CreateMap<string, Status>().ConvertUsing(src =>  (Status)Enum.Parse(typeof(Status), src, true));

        }
    }
}