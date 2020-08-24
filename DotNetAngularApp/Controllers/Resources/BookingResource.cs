using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    public class BookingResource
    {
        public int Id { get; set; }
        public ICollection<ModuleResource> Modules { get; set; }
        // Lecturer
        public DateTime BookDate { get; set; }
        public ICollection<TimeSlotResource> TimeSlots { get; set; }
        public KeyValuePairResource Building { get; set; }
        public RoomResource Room { get; set; }

        public BookingResource()
        {
            Modules = new Collection<ModuleResource>();
            TimeSlots = new Collection<TimeSlotResource>();
        }
    }
}