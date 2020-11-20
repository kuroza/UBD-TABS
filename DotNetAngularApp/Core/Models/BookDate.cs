using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Core.Models
{
    [Table("BookDates")]    
    public class BookDate
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int BookingId { get; set; }
    }
}