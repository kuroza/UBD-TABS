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

        public IEnumerable<Building> GetBuildingList()
        {
            return _context.Buildings.ToList();
        }

        public ActionResult GetRoomList(int buildingId)
        {
            //IEnumerable<Room> roomList = _context.Rooms.Where(x => x.BuildingId == buildingId).ToList();
            //IEnumerable<SelectListItem> selectRoomList = new SelectList(roomList, "Id", "Name");
            //var viewModel = new BookingsViewModel
            //{
            //    RoomList = selectRoomList
            //};

            IEnumerable<Room> selectList = _context.Rooms.Where(x => x.BuildingId == buildingId).ToList();
            ViewBag.Slist = new SelectList(selectList, "Id", "Name");

            return PartialView("DisplayRooms");
        }

        public ActionResult New() // page for selecting building, room and date
        {
        //    IEnumerable<SelectListItem> buildingList = new SelectList(GetBuildingList(), "Id", "Name");
        //    var viewModel = new BookingsViewModel
        //    {
        //        BuildingList = buildingList
        //    };
        //    return View(viewModel);

            ViewBag.BuildingList = new SelectList(GetBuildingList(), "Id", "Name");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Booking booking)
        {
            //if (!ModelState.IsValid) //for form validation, if not valid, return same view
            //{
            //    //since I'm not using a viewmodel at New(), just return the method?
            //    var model = new Booking
            //    {
            //        BuildingId = booking.BuildingId,
            //        RoomId = booking.RoomId,
            //        BookDate = booking.BookDate
            //    };
            //    return View("New", model);
            //}

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

        [HttpGet]
        public ActionResult TestTimeSlot() //int roomId, DateTime bookDate
        {
            DateTime bookDate = new DateTime(2020, 02, 15);
            var booking = _context.Bookings
                            .Where(b => b.RoomId == 1)
                            .Where(b => b.BookDate == bookDate)
                            .Include(b => b.Room) //this will help to show the room name
                            .Include(b => b.TimeSlot) //this will help to show the starttime and endtime
                            .OrderBy(b => b.TimeSlotId)
                            .ToList();

            var viewModel = new BookingsViewModel
            {
                ConfirmedBookings = booking
            };

            return View(viewModel);
        }

        public ActionResult TimeSlot()
        {
            //forall set IsBooked=false
            //update TimeSlots table according to Next()
            //if the TimeSlotId appears in the Next() result, set IsBooked=true

            IEnumerable<TimeSlot> timeSlot = _context.TimeSlots.ToList(); //lists all the time slots

            return View(timeSlot);
        }

        //public ActionResult GetConfirmedBookings()
        //{
        //    ViewData["IsBooked"] = "true"; 

        //    return View(ViewData["IsBooked"]);
        //}
    }
}