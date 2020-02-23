using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.ViewModels
{
    public class BookingsViewModel
    {
        public Booking Bookings { get; set; }

        public Room Rooms { get; set; }

        [Display(Name = "Book Date")]
        public Booking BookDate { get; set; }

        public TimeSlot TimeSlots { get; set; }
    }
}
