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

        // [Required]
        // [StringLength(255)]
        // public string ContactName { get; set; } // ! change to lecturer name

        // [StringLength(255)]
        // public string ContactEmail { get; set; }

        // [StringLength(255)]
        // public string ContactPhone { get; set; }
        
        // [StringLength(255)]
        // public string Purpose { get; set; } // ! change to module

        public ICollection<BookingTimeSlot> TimeSlots { get; set; }

        // [Required]
        public ICollection<BookingModule> Modules { get; set; }

        public Booking()
        {
            TimeSlots = new Collection<BookingTimeSlot>();
            Modules = new Collection<BookingModule>();
        }
    }
}