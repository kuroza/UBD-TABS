using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAngularApp.Models
{
    [Table("TimeSlots")]
    public class TimeSlot
    {
        public byte Id { get; set; }

        [DisplayFormat(DataFormatString = "{0:hh}:{0:mm}", ApplyFormatInEditMode = true)]
        // [Display(Name = "Start Time")]
        public TimeSpan StartTime { get; set; }

        [DisplayFormat(DataFormatString = "{0:hh}:{0:mm}", ApplyFormatInEditMode = true)]
        // [Display(Name = "End Time")]
        public TimeSpan EndTime { get; set; }

        public bool IsBooked { get; set; }
    }
}