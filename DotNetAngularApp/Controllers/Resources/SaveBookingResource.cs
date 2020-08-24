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
        public int RoomId { get; set; }

        [Required]
        public DateTime BookDate { get; set; }

        public ICollection<int> Modules { get; set; }

        //Lecturer

        public ICollection<int> TimeSlots { get; set; }

        public SaveBookingResource()
        {
            Modules = new Collection<int>();
            TimeSlots = new Collection<int>();
        }
    }
}