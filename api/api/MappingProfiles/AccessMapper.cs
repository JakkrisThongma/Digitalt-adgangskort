using AutoMapper;

namespace api.MappingProfiles
{
    public class AccessMapper : Profile
    {
        public AccessMapper()
        {
            CreateMap<Entities.Access, Models.AdminAccessDto>();
            CreateMap<Models.AdminAccessDto, Models.AdminAccessDto>();
            
            CreateMap<Entities.SmartLock, Models.AdminAccessDto>()
                .ForMember(
                    dest => dest.SmartLockTitle,
                    opt => opt.MapFrom(src => src.Title)
                );
            CreateMap<Models.AdminAccessDto, Entities.Access>();
            CreateMap<Microsoft.Graph.User, Models.AdminAccessDto>()
                .ForMember(
                    dest => dest.UserName,
                    opt => opt.MapFrom(src => src.DisplayName)
                )
                .ForMember(x => x.Id, opt => opt.Ignore());
            
        }
    }
}