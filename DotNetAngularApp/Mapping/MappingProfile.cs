using System.Linq;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            // <Source, target>
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            CreateMap<Faculty, FacultyResource>();
            CreateMap<Course, CourseResource>();
            CreateMap<Building, BuildingResource>();
            CreateMap<Building, KeyValuePairResource>();
            CreateMap<Room, RoomResource>();
            CreateMap<TimeSlot, TimeSlotResource>();
            CreateMap<Module, ModuleResource>();
            CreateMap<Lecturer, LecturerResource>();
            CreateMap<Booking, SaveBookingResource>()
                .ForMember(br => br.TimeSlots, opt => opt.MapFrom(b => b.TimeSlots.Select(bt => bt.TimeSlotId)))
                .ForMember(br => br.Modules, opt => opt.MapFrom(b => b.Modules.Select(bt => bt.ModuleId)));
            CreateMap<Booking, BookingResource>()
                .ForMember(br => br.Building, opt => opt.MapFrom(b => b.Room.Building))
                // include datetime here? for what ah.. aku lupa
                .ForMember(br => br.TimeSlots, opt => opt.MapFrom(b => b.TimeSlots.Select(bt => new TimeSlotResource { Id = bt.TimeSlot.Id, StartTime = bt.TimeSlot.StartTime, EndTime = bt.TimeSlot.EndTime }))) // load the association class
                .ForMember(br => br.Modules, opt => opt.MapFrom(b => b.Modules.Select(bt => bt.ModuleId ))); // ? select by ModuleResource?
                // map Room here?

            // API Resource to Domain, saving to database
            CreateMap<BookingQueryResource, BookingQuery>();
            CreateMap<SaveBookingResource, Booking>()
                .ForMember(b => b.Id, opt => opt.Ignore())
                .ForMember(b => b.TimeSlots, opt => opt.Ignore()) // ? what is ignore() for?
                .AfterMap((br, b) => {
                    var removedTimeSlots = b.TimeSlots.Where(t => !br.TimeSlots.Contains(t.TimeSlotId)).ToList();
                    foreach (var t in removedTimeSlots)
                        b.TimeSlots.Remove(t);

                    var addedTimeSlots = br.TimeSlots.Where(id => !b.TimeSlots.Any(t => t.TimeSlotId == id)).Select(id => new BookingTimeSlot { TimeSlotId = id });
                    foreach (var t in addedTimeSlots)
                        b.TimeSlots.Add(t);

                    var removedModules = b.Modules.Where(m => !br.Modules.Contains(m.ModuleId)).ToList();
                    foreach (var m in removedModules)
                        b.Modules.Remove(m);

                    var addedModules = br.Modules.Where(id => !b.Modules.Any(m => m.ModuleId == id)).Select(id => new BookingModule { ModuleId = id });
                    foreach (var m in addedModules)
                        b.Modules.Add(m);
                });
        }
    }
}