using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Models
{
    [Table("Bookings")]
    public class Booking
    {
        // [Display(Name = "Booking Id")]
        public int Id { get; set; }

        [Required]
        // [Display(Name = "Select Building")]
        public int BuildingId { get; set; }

        [Required]
        // [Display(Name = "Select Room")]
        public int RoomId { get; set; }

        [Required]
        // [Display(Name = "Date")]
        [DataType(DataType.Date)] //get date only from view?
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
        public DateTime BookDate { get; set; }
        
        [Required]
        // [Display(Name = "Select Time Slot")]
        public byte TimeSlotId { get; set; }

        // [Display(Name = "Staff Name")]
        public string StaffName { get; set; }

        // [Display(Name = "Module Code")]
        public string ModuleCode { get; set; }

        // //for timeslot
        // public virtual Room Room { get; set; }

        // public virtual Building Building { get; set; }

        // public virtual TimeSlot TimeSlot { get; set; }
    }
}