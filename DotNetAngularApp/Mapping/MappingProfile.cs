using System.Linq;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Models;

namespace DotNetAngularApp.Mapping
{
    public class MappingProfile : Profile //how does AutoMapper know how to map properties of one class to another? create a mapping profile.
    {
        public MappingProfile()
        {
            //Domain to API Resource
            CreateMap<Building, BuildingResource>(); //AutoMapper scans the properties of the 2 types. if the prop names match, it'll be auto map. if not, need to supply additional config
            CreateMap<Building, KeyValuePairResource>();
            CreateMap<Room, RoomResource>(); //also create a map between room and room resource
            CreateMap<TimeSlot, TimeSlotResource>();
            CreateMap<Booking, SaveBookingResource>()
                .ForMember(br => br.Contact, opt => opt.MapFrom(b => new ContactResource { Name = b.ContactName, Email = b.ContactEmail, Phone = b.ContactPhone }))
                .ForMember(br => br.TimeSlots, opt => opt.MapFrom(b => b.TimeSlots.Select(bt => bt.TimeSlotId)));
            CreateMap<Booking, BookingResource>() //mapping between Booking class and BookingResource
                .ForMember(br => br.Building, opt => opt.MapFrom(b => b.Room.Building)) //when eager loading the room, we should also include the building
                .ForMember(br => br.Contact, opt => opt.MapFrom(b => new ContactResource { Name = b.ContactName, Email = b.ContactEmail, Phone = b.ContactPhone }))
                .ForMember(br => br.TimeSlots, opt => opt.MapFrom(b => b.TimeSlots.Select(bt => new TimeSlotResource { Id = bt.TimeSlot.Id, StartTime = bt.TimeSlot.StartTime, EndTime = bt.TimeSlot.EndTime }))); //load the association class

            //API Resource to Domain
            CreateMap<SaveBookingResource, Booking>()
                .ForMember(b => b.Id, opt => opt.Ignore()) //to ignore mapping this Id property
                .ForMember(b => b.ContactName, opt => opt.MapFrom(br => br.Contact.Name))
                .ForMember(b => b.ContactEmail, opt => opt.MapFrom(br => br.Contact.Email))
                .ForMember(b => b.ContactPhone, opt => opt.MapFrom(br => br.Contact.Phone))
                .ForMember(b => b.TimeSlots, opt => opt.Ignore())
                .AfterMap((br, b) => {
                    //Remove unselected timeSlots
                    var removedTimeSlots = b.TimeSlots.Where(t => !br.TimeSlots.Contains(t.TimeSlotId)).ToList();
                    foreach (var t in removedTimeSlots)
                        b.TimeSlots.Remove(t);

                    //Add new timeSlots
                    var addedTimeSlots = br.TimeSlots.Where(id => !b.TimeSlots.Any(t => t.TimeSlotId == id)).Select(id => new BookingTimeSlot { TimeSlotId = id });
                    foreach (var t in addedTimeSlots)
                        b.TimeSlots.Add(t);
                });
        }
    }
}