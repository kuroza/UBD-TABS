using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("BookingOfferings")]
    public class BookingOffering
    {
        public int BookingId { get; set; }
        public Booking Booking { get; set; }
        public int OfferingId { get; set; }
        public Offering Offering { get; set; }
    }
}