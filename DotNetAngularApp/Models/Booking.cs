using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Models
{
    [Table("Bookings")]
    public class Booking
    {
        public int Id { get; set; }

        [Required]
        public int RoomId { get; set; }

        public Room Room { get; set; }
        
        // [Required]
        // public int TimeSlotId { get; set; }

        [Required]
        public DateTime BookDate { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }

        [StringLength(255)]
        public string ContactEmail { get; set; }

        [StringLength(255)]
        public string ContactPhone { get; set; }
        
        [StringLength(255)]
        public string Purpose { get; set; }

        public ICollection<BookingTimeSlot> TimeSlots { get; set; }

        public Booking()
        {
            TimeSlots = new Collection<BookingTimeSlot>();
        }
    }
}