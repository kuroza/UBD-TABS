using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class BookingResource
    {
        public int Id { get; set; }

        public string Session { get; set; }

        // public KeyValuePairResource Building { get; set; }

        public ICollection<BookDateResource> BookDates { get; set; }

        public ICollection<RoomResource> Rooms { get; set; }

        public ICollection<TimeSlotResource> TimeSlots { get; set; }

        public ICollection<ModuleResource> Modules { get; set; }

        public string Purpose { get; set; }

        public BookingResource()
        {
            BookDates = new Collection<BookDateResource>();
            Rooms = new Collection<RoomResource>();
            TimeSlots = new Collection<TimeSlotResource>();
            Modules = new Collection<ModuleResource>();
        }
    }
}