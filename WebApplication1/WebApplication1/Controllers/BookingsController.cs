using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using WebApplication1.Models;
using WebApplication1.ViewModels;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class BookingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BookingsController(ApplicationDbContext context)
        {
            _context = context; // connection to database
        }

        public IActionResult Index()
        {
            var bookings = _context.Bookings.ToList();

            return View(bookings);
        }

        public ActionResult New() // page for selecting building, room and date
        {
            var viewModel = new BookingDropdownViewModel // put these list into a viewmodel before sending them to view
            {
                Buildings = _context.Buildings.ToList(), // list the details from database using context
                Rooms = _context.Rooms.ToList()
            };

            return View(viewModel); // returns the list from database
        }

        [HttpPost]
        public ActionResult Next(BookingDropdownViewModel model) // when the next button is clicked, then go to Next page
        {
            var building = new Building
            {
                Id = model.SelectedBuildingId // gets the selected Id from view, then pass to building object
            };

            var viewModel = new NewBookingViewModel
            {
                Buildings = building // pass the building object to view model
            };

            return View(viewModel);
        }

        //[HttpPost]
        //public ActionResult Next(BookingDropdownViewModel model) // when the next button is clicked, then go to Next page
        //{
        //    var selectedBuildingId = model.SelectedBuildingId;

        //    //query from database

        //    return View();
        //}

        public ActionResult TimeSlot()
        {
            var timeSlots = _context.TimeSlots.ToList();

            return View(timeSlots);
        }
    }
}