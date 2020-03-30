using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("BookingTimeSlots")]
    public class BookingTimeSlot
    {
        public int BookingId { get; set; }
        public int TimeSlotId { get; set; }
        public Booking Booking { get; set; }
        public TimeSlot TimeSlot { get; set; }
    }
}