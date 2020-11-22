using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("BookingModules")]    
    public class BookingModule
    {
        public int BookingId { get; set; }
        public Booking Booking { get; set; }
        public int ModuleId { get; set; }
        public Module Module { get; set; }
    }
}