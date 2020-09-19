using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveBookingResource
    {
        public int Id { get; set; }

        [Required]
        public DateTime BookDate { get; set; }

        public ICollection<int> TimeSlots { get; set; }

        public ICollection<int> Modules { get; set; }

        // [Required]
        // public int RoomId { get; set; } // ? how to get the IDs into a collection

        [Required]
        public ICollection<int> Rooms { get; set; }

        public SaveBookingResource()
        {
            TimeSlots = new Collection<int>();
            Modules = new Collection<int>();
            Rooms = new Collection<int>();
        }
    }
}