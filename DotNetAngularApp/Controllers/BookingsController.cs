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
    [Authorize]
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
        // [Authorize("create:bookings")]
        public async Task<IActionResult> CreateBooking([FromBody] SaveBookingResource bookingResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var booking = mapper.Map<SaveBookingResource, Booking>(bookingResource);

            // todo check for clashes: query from repository
            // if (repository.CheckBooking(booking))
            // {
            //     return Conflict();
            // }

            repository.Add(booking);
            await unitOfWork.CompleteAsync();

            booking = await repository.GetBooking(booking.Id);

            var result = mapper.Map<Booking, BookingResource>(booking);

            return Ok(result);
        }

        [HttpPut("{id}")]
        // [Authorize("update:bookings")]
        public async Task<IActionResult> UpdateBooking(int id, [FromBody] SaveBookingResource bookingResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var booking = await repository.GetBooking(id);

            if (booking == null)
                return NotFound();

            mapper.Map<SaveBookingResource, Booking>(bookingResource, booking);

            await unitOfWork.CompleteAsync();
            
            booking = await repository.GetBooking(booking.Id);

            var result = mapper.Map<Booking, BookingResource>(booking);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        // [Authorize("delete:bookings")]
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
        // [Authorize("read:bookings")]
        public async Task<IActionResult> GetBooking(int id)
        {
            var booking = await repository.GetBooking(id);

            if (booking == null)
                return NotFound();

            var bookingResource = mapper.Map<Booking, BookingResource>(booking);

            return Ok(bookingResource);
        }

        [HttpGet]
        // [Authorize("read:bookings")]
        public async Task<QueryResultResource<BookingResource>> GetBookings(BookingQueryResource filterResource)
        {
            var filter = mapper.Map<BookingQueryResource, BookingQuery>(filterResource);
            var queryResult = await repository.GetBookings(filter);

            return mapper.Map<QueryResult<Booking>, QueryResultResource<BookingResource>>(queryResult);
        }

        [HttpGet("/api/allbookings")]
        // [Authorize("read:bookings")]
        public async Task<IEnumerable<BookingResource>> GetAllBookings()
        {
            var bookings = await repository.GetAllBookings();

            return mapper.Map<IEnumerable<Booking>, IEnumerable<BookingResource>>(bookings);
        }
    }
}
