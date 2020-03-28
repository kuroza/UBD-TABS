using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Models;

namespace DotNetAngularApp.Mapping
{
    public class MappingProfile : Profile //how does AutoMapper know how to map properties of one class to another? create a mapping profile.
    {
        public MappingProfile()
        {
            CreateMap<Building, BuildingResource>(); //AutoMapper scans the properties of the 2 types. if the prop names match, it'll be auto map. if not, need to supply additional config
            CreateMap<Room, RoomResource>(); //also create a map between room and room resource
            CreateMap<TimeSlot, TimeSlotResource>();
        }
    }
}