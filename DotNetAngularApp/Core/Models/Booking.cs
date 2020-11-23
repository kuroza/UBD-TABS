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
        public ICollection<BookingOffering> Offerings { get; set; }

        [Required]
        public ICollection<BookDate> BookDates { get; set; }

        [Required]
        public ICollection<BookingRoom> Rooms { get; set; }

        [Required]
        public ICollection<BookingTimeSlot> TimeSlots { get; set; }

        [StringLength(255)]
        public string Purpose { get; set; }

        public Booking()
        {
            Offerings = new Collection<BookingOffering>();
            BookDates = new Collection<BookDate>();
            Rooms = new Collection<BookingRoom>();
            TimeSlots = new Collection<BookingTimeSlot>();
        }
    }
}