// using System;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

// namespace DotNetAngularApp.Models
// {
//     [Table("Bookings")]
//     public class Booking
//     {
//         public int Id { get; set; }

//         [Required]
//         public int BuildingId { get; set; }

//         [Required]
//         public int RoomId { get; set; }

//         [Required]
//         [DataType(DataType.Date)] //get date only from view?
//         [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
//         public DateTime BookDate { get; set; }
        
//         [Required]
//         public byte TimeSlotId { get; set; }

//         public string StaffName { get; set; }

//         public string ModuleCode { get; set; }

//         // //for timeslot
//         // public virtual Room Room { get; set; }

//         // public virtual Building Building { get; set; }

//         // public virtual TimeSlot TimeSlot { get; set; }
//     }
// }