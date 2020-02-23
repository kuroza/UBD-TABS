using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
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

        // GET: Bookings
        public async Task<IActionResult> Index()
        {
            return View(await _context.Bookings.Include(x => x.Room).Include(x => x.TimeSlot).ToListAsync());
        }

        public ActionResult New() // page for selecting building, room and date
        {
            ViewBag.BuildingList = new SelectList(GetBuildingList(), "Id", "Name");
            return View();
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
        [ValidateAntiForgeryToken]
        public ActionResult Create(Booking booking)
        {
            _context.Bookings.Add(booking);
            _context.SaveChanges();

            return RedirectToAction("Index", "Bookings");
        }

        public ActionResult Next(int RoomId, DateTime BookDate) //Next page lists all timeslots //int RoomId, DateTime BookDate
        {
            //get roomid and bookdate as parameters
            //get from database Booking table, then compare roomid and bookdate, store the result in a list
            //iterate the result list, get the timeslot
            //show timeslots and check manually if the timeslot is correct
            IEnumerable<Booking> bookingList = _context.Bookings.Where(x => x.RoomId == RoomId).Where(x => x.BookDate == BookDate).ToList(); //get the date

            return View();
        }

        public ActionResult TimeSlot()
        {
            //forall set IsBooked=false
            //update TimeSlots table according to Next()
            //if the TimeSlotId appears in the Next() result, set IsBooked=true

            IEnumerable<TimeSlot> timeSlot = _context.TimeSlots.ToList(); //lists all the time slots

            ViewData["IsBooked"] = "true";

            return View(timeSlot);
        }

        public ActionResult GetConfirmedBookings()
        {
            ViewData["IsBooked"] = "true"; 

            return View(ViewData["IsBooked"]);
        }
    }
}