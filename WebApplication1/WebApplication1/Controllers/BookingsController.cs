using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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

        public ActionResult New() // page for selecting building, room and date
        {
            ViewBag.BuildingList = new SelectList(GetBuildingList(), "Id", "Name");
            return View(); // returns the list from database
        }

        public IEnumerable<Building> GetBuildingList()
        {
            return _context.Buildings.ToList();
        }

        public ActionResult GetRoomList(int buildingId)
        {
            IEnumerable<Room> selectList = _context.Rooms.Where(x => x.BuildingId == buildingId).ToList();
            ViewBag.Slist = new SelectList(selectList, "Id", "Name");
            return PartialView("DisplayRooms");
        }

        //[HttpPost]
        //public ActionResult Next(BookingDropdownViewModel model) // when the next button is clicked, then go to Next page
        //{
        //    var selectedBuildingId = model.SelectedBuildingId;

        //    //insert into database

        //    return View();
        //}

        public IActionResult Index()
        {
            var bookings = _context.Bookings.ToList();

            return View(bookings);
        }

        public ActionResult TimeSlot()
        {
            var timeSlots = _context.TimeSlots.ToList();

            return View(timeSlots);
        }
    }
}