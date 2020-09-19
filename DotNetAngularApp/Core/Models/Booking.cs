using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("Bookings")]
    public class Booking
    {
        public int Id { get; set; }

        [Required]
        public int RoomId { get; set; } // ! change to collection

        public Room Room { get; set; }

        [Required]
        public DateTime BookDate { get; set; } // ! might need to change this to a collection if using recurring

        public ICollection<BookingTimeSlot> TimeSlots { get; set; }

        public ICollection<BookingModule> Modules { get; set; }

        public Booking()
        {
            TimeSlots = new Collection<BookingTimeSlot>();
            Modules = new Collection<BookingModule>();
        }
    }
}