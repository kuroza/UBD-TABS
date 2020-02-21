using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.ViewModels
{
    public class BookingDropdownViewModel
    {
        [Display(Name = "Select Building")]
        public int BuildingId { get; set; }

        [Display(Name = "Select Room")]
        public int RoomId { get; set; }

        [Display(Name = "Select Date")]
        public DateTime BookingDate { get; set; }
    }
}
