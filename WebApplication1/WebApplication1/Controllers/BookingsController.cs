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
            //i think in order to use BookingsViewModel in Index.cshtml, this below IEnumerable must be put in BookingsViewModel
            return View(await _context.Bookings.Include(x => x.Building).Include(x => x.Room).Include(x => x.TimeSlot).ToListAsync());
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

        public ActionResult New() // display page for selecting building, room and date
        {
            ViewBag.BuildingList = new SelectList(GetBuildingList(), "Id", "Name");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Booking booking)
        {
            _context.Bookings.Add(booking);
            _context.SaveChanges();

            return RedirectToAction("Index", "Bookings");
        }

        [HttpPost]
        public ActionResult SearchRoomAndDate(Booking booking)
        {
            var viewModel = new BookingsViewModel
            {
               BuildingId  = booking.BuildingId,
               RoomId = booking.RoomId,
               BookDate = booking.BookDate
            };

            return RedirectToAction("TestTimeSlot", "Bookings", viewModel);
        }

        [HttpGet]
        public ActionResult TestTimeSlot(BookingsViewModel searchViewModel)
        {
            IEnumerable<Booking> _booking = _context.Bookings //this will actually show booked slots, not all the unavailable ones
                                                .Where(b => b.RoomId == searchViewModel.RoomId)
                                                .Where(b => b.BookDate == searchViewModel.BookDate)
                                                .Include(b => b.Building)
                                                .Include(b => b.Room) //helps to show the room name
                                                .Include(b => b.TimeSlot) //helps to show the starttime and endtime
                                                .OrderBy(b => b.TimeSlotId)
                                                .ToList();

            IEnumerable<TimeSlot> _timeSlot = _context.TimeSlots.ToList();

            foreach (var slot in _timeSlot)
            {
                foreach(var book in _booking)
                {
                    if (slot.Id != book.TimeSlotId)
                        slot.IsBooked = false;
                    else
                        slot.IsBooked = true;
                }
            }

            //I think the problem of only 1 checkbox disabled lies from the foreach loop
            //It only disabled the last 

            var viewModel = new BookingsViewModel
            {
                TimeSlots = _timeSlot,
                ConfirmedBookings = _booking,
                BuildingId = searchViewModel.BuildingId,
                RoomId = searchViewModel.RoomId,
                BookDate = searchViewModel.BookDate
            };

            return View(viewModel);
        }

        [HttpPost]
        public ActionResult TestTimeSlot(Booking booking) //int roomId, DateTime bookDate //Booking booking
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

            return View(timeSlot);
        }
    }
}