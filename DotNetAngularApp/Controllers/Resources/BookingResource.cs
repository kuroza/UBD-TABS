using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class BookingResource
    {
        public int Id { get; set; }

        public KeyValuePairResource Building { get; set; }

        public DateTime BookDate { get; set; }

        public ICollection<TimeSlotResource> TimeSlots { get; set; }
        
        public ICollection<ModuleResource> Modules { get; set; }

        // public RoomResource Room { get; set; } // ! change to collection

        public ICollection<RoomResource> Rooms { get; set; }

        public BookingResource()
        {
            TimeSlots = new Collection<TimeSlotResource>();
            Modules = new Collection<ModuleResource>();
            Rooms = new Collection<RoomResource>();
        }
    }
}