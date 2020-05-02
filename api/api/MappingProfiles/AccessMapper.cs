using AutoMapper;

namespace api.MappingProfiles
{
    public class AccessMapper : Profile
    {
        public AccessMapper()
        {
            CreateMap<Entities.Access, Models.AccessLogDto>();
            CreateMap<Models.AccessLogDto, Models.AccessLogDto>();
            
            CreateMap<Entities.SmartLock, Models.AccessLogDto>()
                .ForMember(
                    dest => dest.SmartLockTitle,
                    opt => opt.MapFrom(src => src.Title)
                );
            CreateMap<Models.AccessLogDto, Entities.Access>();
            CreateMap<Microsoft.Graph.User, Models.AccessLogDto>()
                .ForMember(
                    dest => dest.UserName,
                    opt => opt.MapFrom(src => src.DisplayName)
                );
            
        }
    }
}