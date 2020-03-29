// using System;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

// namespace DotNetAngularApp.Models
// {
//     [Table("Bookings")]
//     public class Booking
//     {
//         public int Id { get; set; }

//         public Room Room { get; set; }

//         [Required]
//         public int RoomId { get; set; }

//         public TimeSlot TimeSlot { get; set; }
        
//         [Required]
//         public byte TimeSlotId { get; set; }

//         [Required]
//         // [DataType(DataType.Date)] //get date only from view?
//         // [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}", ApplyFormatInEditMode = true)]
//         public DateTime BookDate { get; set; }

//         [StringLength(255)]
//         public string StaffName { get; set; }

//         [StringLength(255)]
//         public string Purpose { get; set; }
//     }
// }