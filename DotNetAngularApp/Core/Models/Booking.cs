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
        public int RoomId { get; set; }

        public Room Room { get; set; }

        [Required]
        public DateTime BookDate { get; set; }

        [Required]
        public ICollection<BookingModule> Modules { get; set; }

        public Module Module { get; set; }

        [Required]
        public ICollection<BookingTimeSlot> TimeSlots { get; set; }

        public Booking()
        {
            Modules = new Collection<BookingModule>();
            TimeSlots = new Collection<BookingTimeSlot>();
        }
    }
}