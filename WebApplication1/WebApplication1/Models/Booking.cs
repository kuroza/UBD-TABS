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
        public int RoomId { get; set; }

        [Required]
        public TimeSlot TimeSlot { get; set; } // TimeSlot <- navigation property, navigate from one type to another
        //public byte TimeSlotId { get; set; } // as foreign key

        public DateTime BookDate { get; set; }

        public int ModuleId { get; set; }

        public int StaffId { get; set; }
    }
}
