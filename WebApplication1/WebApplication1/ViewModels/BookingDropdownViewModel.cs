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
        [Required]
        public IEnumerable<Building> Buildings { get; set; }

        public int SelectedBuildingId { get; set; }

        [Required]
        public IEnumerable<Room> Rooms { get; set; }

        [Required]
        [Display(Name = "Select Date")]
        public DateTime BookingDate { get; set; }
    }
}
