using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DotNetAngularApp.Controllers.Resources
{
    //for GetBooking()
    public class BookingResource
    {
        public int Id { get; set; }

        // public int RoomId { get; set; } //only used as the foreign key property in domain class

        public RoomResource Room { get; set; }

        public KeyValuePairResource Building { get; set; }

        public DateTime BookDate { get; set; }

        public ContactResource Contact { get; set; }
        
        public string Purpose { get; set; }

        public ICollection<TimeSlotResource> TimeSlots { get; set; }

        public BookingResource()
        {
            TimeSlots = new Collection<TimeSlotResource>();
        }
    }
}