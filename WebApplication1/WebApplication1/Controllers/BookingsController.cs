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
            _context = context;
        }

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create(Booking booking)
        //{
        //    _context.Bookings.Add(booking);
        //    _context.SaveChanges();

        //    return RedirectToAction("Index", "Bookings");
        //}

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
        public ActionResult SearchRoomAndDate(Booking booking)
        {
            var viewModel = new BookingsViewModel
            {
                BuildingId = booking.BuildingId,
                RoomId = booking.RoomId,
                BookDate = booking.BookDate
            };

            return RedirectToAction("TestTimeSlot", "Bookings", viewModel);
        }

        [HttpGet]
        public ActionResult TestTimeSlot(BookingsViewModel searchViewModel)
        {
            //get all the records from Booking on RoomId and BookDate, sort by TimeSlotId, then store in an enumerable
            IEnumerable<Booking> _booking = _context.Bookings
                                                .Where(b => b.RoomId == searchViewModel.RoomId)
                                                .Where(b => b.BookDate == searchViewModel.BookDate)
                                                .Include(b => b.Building) //using eager loading to show the property names
                                                .Include(b => b.Room)
                                                .Include(b => b.TimeSlot)
                                                .OrderBy(b => b.TimeSlotId)
                                                .ToList();

            //get all the records from TimeSlots and store in an enumerable
            IEnumerable<TimeSlot> _timeSlot = _context.TimeSlots.ToList();

            //set IsBooked = true if the time slot is booked
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

            //get time slots where they are not booked
            IEnumerable<TimeSlot> availableTimeSlots = _timeSlot.Where(x => x.IsBooked == false).ToList();

            //store the queries and selected values into a view model
            var viewModel = new BookingsViewModel
            {
                TimeSlotList = _timeSlot,
                AvailableTimeSlots = availableTimeSlots,
                //store all individually or store directly into Booking booking?
                BuildingId = searchViewModel.BuildingId,
                RoomId = searchViewModel.RoomId,
                BookDate = searchViewModel.BookDate
            };

            return View(viewModel);
        }

        //[HttpPost] //so is the parameter for viewmodel not getting anything?
        //public ActionResult TestTimeSlot(BookingsViewModel bookingsViewModel) //Booking booking
        //{
        //    if (bookingsViewModel.TimeSlotList.Count(x => x.IsSelected) == 0)
        //    {
        //        //here, return an error to view that none is selected
        //        return RedirectToAction("TestTimeSlot", "Bookings");
        //    }
        //    else
        //    {
        //        foreach (var timeSlot in bookingsViewModel.TimeSlotList) //NullReferenceException: Object reference not set to an instance of an object.
        //        {
        //            if (timeSlot.IsSelected == true)
        //            {
        //                //here, get the time slot Id, store in booking.TimeSlotId
        //                var booking = new Booking
        //                {
        //                    BuildingId = bookingsViewModel.BuildingId,
        //                    RoomId = bookingsViewModel.RoomId,
        //                    BookDate = bookingsViewModel.BookDate,
        //                    TimeSlotId = timeSlot.Id
        //                };
        //                _context.Bookings.Add(booking);
        //            }
        //        }
        //        _context.SaveChanges();

        //        return RedirectToAction("Index", "Bookings");
        //    }
        //}

        [HttpPost]
        public ActionResult TestTimeSlot(Booking booking, BookingsViewModel model) //Booking booking
        {
            var bk = new Booking
            {
                BuildingId = model.BuildingId,
                RoomId = model.RoomId,
                BookDate = model.BookDate,
                TimeSlotId = booking.TimeSlotId
            };
            _context.Bookings.Add(bk);
            _context.SaveChanges();

            return RedirectToAction("Index", "Bookings");
        }

        public ActionResult TimeSlot()
        {
            IEnumerable<TimeSlot> timeSlot = _context.TimeSlots.ToList(); //lists all the time slots

            return View(timeSlot);
        }
    }
}