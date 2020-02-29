using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create(Booking booking)
        //{
        //    _context.Bookings.Add(booking);
        //    _context.SaveChanges();

        //    return RedirectToAction("Index", "Bookings");
        //}

        [HttpPost]
        public ActionResult SearchRoomAndDate(Booking booking)
        {
            //var viewModel = new BookingsViewModel
            //{
            //   BuildingId = booking.BuildingId,
            //   RoomId = booking.RoomId,
            //   BookDate = booking.BookDate
            //};

            return RedirectToAction("TestTimeSlot", "Bookings", booking);
        }

        [HttpGet]
        public ActionResult TestTimeSlot(Booking booking)
        {
            //can i put all the code from searchroomdate in here?
            IEnumerable<Booking> _booking = _context.Bookings //this will actually show booked slots, not all the unavailable ones
                                                .Where(b => b.RoomId == booking.RoomId)
                                                .Where(b => b.BookDate == booking.BookDate)
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
                    {
                        slot.IsBooked = false;
                    }
                    else
                    {
                        slot.IsBooked = true;
                        break;
                    }
                }
            }

            var viewModel = new BookingsViewModel
            {
                TimeSlotList = _timeSlot, //to display list of time slots in view
                //store all individually or store directly into Booking booking?
                //ConfirmedBookings = _booking, //where's this used?
                BuildingId = booking.BuildingId,
                RoomId = booking.RoomId,
                BookDate = booking.BookDate
            };

            return View(viewModel);
        }

        [HttpPost] //so is the parameter for viewmodel not getting anything?
        public ActionResult TestTimeSlot(BookingsViewModel bookingsViewModel) //int roomId, DateTime bookDate //Booking booking
        {
            if (bookingsViewModel.TimeSlotList.Count(x => x.IsSelected) == 0)
            {
                //return "You didn't select any time slot";
                //here, return an error to view that none is selected
                return RedirectToAction("TestTimeSlot", "Bookings");
            }
            else
            {
                //StringBuilder sb = new StringBuilder();
                //sb.Append("You selected - ");
                foreach (var timeSlot in bookingsViewModel.TimeSlotList) //NullReferenceException: Object reference not set to an instance of an object.
            {
                    if (timeSlot.IsSelected == true)
                    {
                        //sb.Append(timeSlot.StartTime + " to " + timeSlot.EndTime + ", ");
                        //here, get the time slot Id, store in booking.TimeSlotId
                        var booking = new Booking
                        {
                            BuildingId = bookingsViewModel.BuildingId,
                            RoomId = bookingsViewModel.RoomId,
                            BookDate = bookingsViewModel.BookDate,
                            TimeSlotId = timeSlot.Id
                        };
                        //here, iterate to Add each booking into Bookings? or just Add 1 booking?
                        _context.Bookings.Add(booking);
                    }
                }
                //sb.Remove(sb.ToString().LastIndexOf(","), 1);
                //return sb.ToString();
                _context.SaveChanges();

                return RedirectToAction("Index", "Bookings");
            }
        }

        //[HttpPost]
        //public ActionResult TestTimeSlot(Booking booking) //int roomId, DateTime bookDate //Booking booking
        //{
        //    _context.Bookings.Add(booking);
        //    _context.SaveChanges();

        //    return RedirectToAction("Index", "Bookings");
        //}

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