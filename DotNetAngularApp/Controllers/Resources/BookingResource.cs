using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class BookingResource
    {
        public int Id { get; set; }
        
        public ICollection<OfferingResource> Offerings { get; set; } // ! Maybe just send the OfferingId

        public ICollection<BookDateResource> BookDates { get; set; }

        public ICollection<RoomResource> Rooms { get; set; }

        public ICollection<TimeSlotResource> TimeSlots { get; set; }

        public string Purpose { get; set; }

        public BookingResource()
        {
            Offerings = new Collection<OfferingResource>();
            BookDates = new Collection<BookDateResource>();
            Rooms = new Collection<RoomResource>();
            TimeSlots = new Collection<TimeSlotResource>();
        }
    }
}