using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.ViewModels
{
    public class BookingsViewModel
    {
        public Booking Booking { get; set; }

        public int BuildingId { get; set; } //to get the selected from view

        public int RoomId { get; set; }

        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy}")]
        public DateTime BookDate { get; set; }

        public TimeSlot TimeSlot { get; set; } //

        public IEnumerable<TimeSlot> TimeSlotList { get; set; } //

        public IEnumerable<TimeSlot> AvailableTimeSlots { get; set; }

        //public IEnumerable<TimeSlot> SelectedTimeSlots { get; set; }

        //public IEnumerable<Booking> ConfirmedBookings { get; set; }

        //public IEnumerable<SelectListItem> BuildingList { get; set; } //was used for cascading

        //public IEnumerable<SelectListItem> RoomList { get; set; } //was used for cascading

        //public IEnumerable<SelectListItem> SelectedRoom { get; set; }

        //public Room Room { get; set; }
    }
}
