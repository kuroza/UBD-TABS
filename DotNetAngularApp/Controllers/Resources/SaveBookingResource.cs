using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace DotNetAngularApp.Controllers.Resources
{
    //for CreateBooking() and UpdateBooking()
    public class SaveBookingResource
    {
        public int Id { get; set; }

        [Required]
        public int RoomId { get; set; } //only send the Id

        [Required]
        public DateTime BookDate { get; set; }

        [Required]
        public ContactResource Contact { get; set; }
        
        [StringLength(255)]
        public string Purpose { get; set; }

        public ICollection<int> TimeSlots { get; set; } //can select multiple TimeSlotId

        public SaveBookingResource()
        {
            TimeSlots = new Collection<int>();
        }
    }
}