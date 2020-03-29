using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Models
{
    [Table("TimeSlots")]
    public class TimeSlot
    {
        public byte Id { get; set; }

        //[DisplayFormat(DataFormatString = "{0:hh}:{0:mm}", ApplyFormatInEditMode = true)]
        public DateTime StartTime { get; set; }

        //[DisplayFormat(DataFormatString = "{0:hh}:{0:mm}", ApplyFormatInEditMode = true)]
        public DateTime EndTime { get; set; }

        //public bool IsBooked { get; set; }
    }
}