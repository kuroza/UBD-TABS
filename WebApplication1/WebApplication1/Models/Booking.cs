using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Booking
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Select Building")]
        public int BuildingId { get; set; }

        [Required]
        [Display(Name = "Select Room")]
        public int RoomId { get; set; }

        [Required]
        [Display(Name = "Select Date")]
        public DateTime BookDate { get; set; }

        //public TimeSlot TimeSlot { get; set; } // TimeSlot <- navigation property, navigate from one type to another
        
        [Required]
        [Display(Name = "Select Time Slot")]
        public byte TimeSlotId { get; set; } // as foreign key?

        public int ModuleId { get; set; }

        public int StaffId { get; set; }
    }
}
