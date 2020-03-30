using System.Threading.Tasks;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Models;
using DotNetAngularApp.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Controllers
{
    [Route("/api/bookings")]
    public class BookingsController : Controller
    {
        private readonly IMapper mapper;
        private readonly TabsDbContext context;
        private readonly IBookingRepository repository;
        public BookingsController(IMapper mapper, TabsDbContext context, IBookingRepository repository)
        {
            this.repository = repository;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] SaveBookingResource bookingResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var booking = mapper.Map<SaveBookingResource, Booking>(bookingResource);

            context.Bookings.Add(booking);
            await context.SaveChangesAsync();

            await context.Rooms.Include(r => r.Building).SingleOrDefaultAsync(r => r.Id == booking.RoomId); //add the objects in the context, explicitly load that this booking is related to

            //load the TimeSlots that this booking is related to
            booking = await repository.GetBooking(booking.Id);

            var result = mapper.Map<Booking, BookingResource>(booking); //to return a complete representation of the booking

            return Ok(result); //Ok() inherited from base controller. this will serialize as json object.
        }

        [HttpPut("{id}")] // /api/bookings/{id}
        public async Task<IActionResult> UpdateBooking(int id, [FromBody] SaveBookingResource bookingResource) //id from route, and bookingResource from body
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var booking = await repository.GetBooking(id);

            if (booking == null)
                return NotFound();

            mapper.Map<SaveBookingResource, Booking>(bookingResource, booking); //when mapping a bookingResource to booking, use a booking object that we load from db

            await context.SaveChangesAsync();
            //missing something here, 500 internal server error
            var result = mapper.Map<Booking, BookingResource>(booking); //after saving the changes, map the Booking to BookingResource

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await context.Bookings.FindAsync(id); //get a booking with this id

            if (booking == null) //check if the booking is null
                return NotFound();

            context.Remove(booking); //otherwise, remove from context
            await context.SaveChangesAsync(); //save

            return Ok(id); //return Ok with the same Id
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooking(int id)
        {
            var booking = await repository.GetBooking(id);

            if (booking == null)
                return NotFound();

            var bookingResource = mapper.Map<Booking, BookingResource>(booking); //if have booking object, map it to resource and return it

            return Ok(bookingResource);
        }
    }
}