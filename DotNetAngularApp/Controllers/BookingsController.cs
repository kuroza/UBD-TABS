using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DotNetAngularApp.Controllers
{
    [Route("/api/bookings")]
    public class BookingsController : Controller
    {
        private readonly IMapper mapper;
        private readonly IBookingRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public BookingsController(IMapper mapper, IBookingRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> CreateBooking([FromBody] SaveBookingResource bookingResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var booking = mapper.Map<SaveBookingResource, Booking>(bookingResource);

            var roomExist = repository.BookingRoomExist(booking);
            var offeringExist = repository.BookingOfferingExist(booking);
            if (roomExist && offeringExist)
                return Conflict("The room and module is already taken");
            else if (roomExist)
                return Conflict("The room is already taken");
            else if (offeringExist)
                return Conflict("The module is already booked in the same time slot");

            repository.Add(booking);
            await unitOfWork.CompleteAsync();

            booking = await repository.GetBooking(booking.Id);

            var result = mapper.Map<Booking, BookingResource>(booking);

            return Ok(result);
        }

        [HttpPost("/api/bookings/confirm")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> ConfirmCreateBooking([FromBody] SaveBookingResource bookingResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var booking = mapper.Map<SaveBookingResource, Booking>(bookingResource);

            repository.Add(booking);
            await unitOfWork.CompleteAsync();

            booking = await repository.GetBooking(booking.Id);

            var result = mapper.Map<Booking, BookingResource>(booking);

            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> UpdateBooking(int id, [FromBody] SaveBookingResource bookingResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var booking = await repository.GetBooking(id);

            if (booking == null)
                return NotFound();

            mapper.Map<SaveBookingResource, Booking>(bookingResource, booking);

            var roomExist = repository.EditBookingRoomExist(booking);
            var offeringExist = repository.EditBookingOfferingExist(booking);
            if (roomExist && offeringExist)
                return Conflict("The room and module is already taken");
            else if (roomExist)
                return Conflict("The room is already taken");
            else if (offeringExist)
                return Conflict("The module is already booked in the same time slot");

            await unitOfWork.CompleteAsync();
            
            booking = await repository.GetBooking(booking.Id);

            var result = mapper.Map<Booking, BookingResource>(booking);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await repository.GetBooking(id, includeRelated: false);

            if (booking == null)
                return NotFound();

            repository.Remove(booking);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooking(int id)
        {
            var booking = await repository.GetBooking(id);

            if (booking == null)
                return NotFound();

            var bookingResource = mapper.Map<Booking, BookingResource>(booking);

            return Ok(bookingResource);
        }

        [HttpGet("/api/allbookings")]
        public async Task<IEnumerable<BookingResource>> GetAllBookings()
        {
            var bookings = await repository.GetAllBookings();

            return mapper.Map<IEnumerable<Booking>, IEnumerable<BookingResource>>(bookings);
        }
    }
}
