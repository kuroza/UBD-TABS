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

        [HttpPost]
        public ActionResult Next() // when the next button is clicked, then go to timeslot page
        {
            //get roomid and bookdate
            //get from database Booking table, then compare roomid and bookdate, store the result in a list
            //iterate the result list, get the timeslot
            //show timeslots and check manually if the timeslot is correct

            return View();
        }

        public IActionResult Index()
        {
            var bookings = _context.Bookings.ToList();

            return View(bookings);
        }

        public ActionResult TimeSlot()
        {
            //forall set IsBooked=false
            //update timeslot table according to Next()
            //if the timeslotid appears in the Next() result, set IsBooked=true

            var timeSlots = _context.TimeSlots.ToList();

            return View(timeSlots);
        }
    }
}