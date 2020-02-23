using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Booking
    {
        [Display(Name = "Booking Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Building")]
        public int BuildingId { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        [Display(Name = "Select Date")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime BookDate { get; set; }
        
        [Required]
        [Display(Name = "Select Time Slot")]
        public byte TimeSlotId { get; set; }

        [Display(Name = "Staff Name")]
        public string StaffName { get; set; }

        [Display(Name = "Module Code")]
        public string ModuleCode { get; set; }

        public bool IsBooked { get; set; }

        public virtual Room Room { get; set; }

        public virtual TimeSlot TimeSlot { get; set; }
    }
}
