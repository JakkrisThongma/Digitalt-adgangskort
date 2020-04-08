using AutoMapper;

namespace api.MappingProfiles
{
    public class GroupMapper : Profile
    {
        public GroupMapper()
        {
            CreateMap<Entities.Group, Microsoft.Graph.Group>();
            CreateMap<Microsoft.Graph.Group, Entities.Group>();
            
            CreateMap<Models.GroupDto, Microsoft.Graph.Group>();
            CreateMap<Microsoft.Graph.Group, Models.GroupDto>();
            
            CreateMap<Entities.Group, Models.GroupDto>();
            CreateMap<Models.GroupDto, Entities.Group>();
        }
    }
}