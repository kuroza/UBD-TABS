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
            CreateMap<Booking, SaveBookingResource>()
                .ForMember(br => br.TimeSlots, opt => opt.MapFrom(b => b.TimeSlots.Select(bt => bt.TimeSlotId)));
                //.ForMember(br => br.Contact, opt => opt.MapFrom(b => new ContactResource { Name = b.ContactName, Email = b.ContactEmail, Phone = b.ContactPhone }))
            CreateMap<Booking, BookingResource>()
                .ForMember(br => br.Building, opt => opt.MapFrom(b => b.Room.Building))
                .ForMember(br => br.TimeSlots, opt => opt.MapFrom(b => b.TimeSlots.Select(bt => new TimeSlotResource { Id = bt.TimeSlot.Id, StartTime = bt.TimeSlot.StartTime, EndTime = bt.TimeSlot.EndTime }))); //load the association class
                // .ForMember(br => br.Contact, opt => opt.MapFrom(b => new ContactResource { Name = b.ContactName, Email = b.ContactEmail, Phone = b.ContactPhone }))

            //API Resource to Domain, saving to database
            CreateMap<BookingQueryResource, BookingQuery>();
            CreateMap<SaveBookingResource, Booking>()
                .ForMember(b => b.Id, opt => opt.Ignore())
                // .ForMember(b => b.ContactName, opt => opt.MapFrom(br => br.Contact.Name))
                // .ForMember(b => b.ContactEmail, opt => opt.MapFrom(br => br.Contact.Email))
                // .ForMember(b => b.ContactPhone, opt => opt.MapFrom(br => br.Contact.Phone))
                .ForMember(b => b.TimeSlots, opt => opt.Ignore()) // ?
                .AfterMap((br, b) => {
                    var removedTimeSlots = b.TimeSlots.Where(t => !br.TimeSlots.Contains(t.TimeSlotId)).ToList();
                    foreach (var t in removedTimeSlots)
                        b.TimeSlots.Remove(t);

                    var addedTimeSlots = br.TimeSlots.Where(id => !b.TimeSlots.Any(t => t.TimeSlotId == id)).Select(id => new BookingTimeSlot { TimeSlotId = id });
                    foreach (var t in addedTimeSlots)
                        b.TimeSlots.Add(t);
                });
        }
    }
}