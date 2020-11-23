using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveBookingResource
    {
        public int Id { get; set; }

        [Required]
        public ICollection<int> Offerings { get; set; }

        [Required]
        public ICollection<DateTime> BookDates { get; set; }

        [Required]
        public ICollection<int> Rooms { get; set; }

        [Required]
        public ICollection<int> TimeSlots { get; set; }

        public string Purpose { get; set; }

        public SaveBookingResource()
        {
            Offerings = new Collection<int>();
            BookDates = new Collection<DateTime>();
            Rooms = new Collection<int>();
            TimeSlots = new Collection<int>();
        }
    }
}