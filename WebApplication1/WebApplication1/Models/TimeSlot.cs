using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class TimeSlot
    {
        public byte Id { get; set; }

        [DisplayFormat(DataFormatString = "{0:hh}:{0:mm}", ApplyFormatInEditMode = true)]
        [Display(Name = "Start Time")]
        public TimeSpan StartTime { get; set; }

        [DisplayFormat(DataFormatString = "{0:hh}:{0:mm}", ApplyFormatInEditMode = true)]
        [Display(Name = "End Time")]
        public TimeSpan EndTime { get; set; }

        public bool IsBooked { get; set; }

        public bool IsSelected { get; set; }

    }
}
