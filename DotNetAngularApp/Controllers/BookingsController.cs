using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotNetAngularApp.Controllers
{
    [Route("/api/bookings")]
    public class BookingsController : Controller
    {
        private readonly IMapper mapper;
        public BookingsController(IMapper mapper)
        {
            this.mapper = mapper;
        }

        [HttpPost]
        public IActionResult CreateBooking([FromBody] BookingResource bookingResource)
        {
            var booking = mapper.Map<BookingResource, Booking>(bookingResource);

            return Ok(booking); //Ok() inherited from base controller. this will serialize as json object.
        }
    }
}