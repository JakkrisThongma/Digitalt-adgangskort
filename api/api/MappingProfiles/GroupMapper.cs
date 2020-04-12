using api.Types;
using AutoMapper;
using System;

namespace api.MappingProfiles
{
    public class GroupMapper : Profile
    {
        public GroupMapper()
        {
            CreateMap<Entities.Group, Microsoft.Graph.Group>();
            CreateMap<Entities.Group, Models.GroupDto>();
            
            CreateMap<Microsoft.Graph.Group, Models.AzureAdGroupDto>();
            CreateMap<Microsoft.Graph.Group, Models.GroupDto>();
            CreateMap<Microsoft.Graph.Group, Entities.Group>();
            
            CreateMap<Models.GroupDto, Microsoft.Graph.Group>();
            CreateMap<Models.GroupDto, Entities.Group>();
            CreateMap<Models.GroupCreationDto, Entities.Group>();
            CreateMap<Models.GroupModificationDto, Entities.Group>();

            CreateMap<Status, string>().ConvertUsing(src => src.ToString().ToLower());
            CreateMap<string, Status>().ConvertUsing(src => (Status)Enum.Parse(typeof(Status), src, true));
        }
    }
}