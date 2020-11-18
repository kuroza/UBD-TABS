using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace DotNetAngularApp.Controllers.Resources
{
    public class SaveBookingResource
    {
        public int Id { get; set; }

        public int SemesterId { get; set; }

        [Required]
        public DateTime BookDate { get; set; }

        [Required]
        public ICollection<int> Rooms { get; set; }

        [Required]
        public ICollection<int> TimeSlots { get; set; }

        [Required]
        public ICollection<int> Modules { get; set; }

        public string Purpose { get; set; }

        public SaveBookingResource()
        {
            Rooms = new Collection<int>();
            TimeSlots = new Collection<int>();
            Modules = new Collection<int>();
        }
    }
}