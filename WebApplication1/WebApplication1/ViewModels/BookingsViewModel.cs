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

        //public Room Room { get; set; }

        public TimeSlot TimeSlot { get; set; }

        public IEnumerable<Booking> ConfirmedBookings { get; set; }

        public IEnumerable<SelectListItem> BuildingList { get; set; }

        public IEnumerable<SelectListItem> RoomList { get; set; }

        //public IEnumerable<SelectListItem> SelectedRoom { get; set; }
    }
}
