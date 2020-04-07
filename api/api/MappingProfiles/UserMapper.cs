using System;
using System.Linq;
using AutoMapper;

namespace api.MappingProfiles
{
    public class UserMapper : Profile
    {
        public UserMapper()
        {
            CreateMap<Entities.User, Microsoft.Graph.User>();

            CreateMap<Microsoft.Graph.User, Entities.User>();
            
            CreateMap<Models.UserDto, Microsoft.Graph.User>();
            CreateMap<Microsoft.Graph.User, Models.UserDto>();
            
            
            CreateMap<Entities.User, Models.UserDto>();
            CreateMap<Models.UserDto, Entities.User>();
            
         
        }
    }
}