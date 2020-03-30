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
        private readonly IBookingRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public BookingsController(IMapper mapper, IBookingRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] SaveBookingResource bookingResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var booking = mapper.Map<SaveBookingResource, Booking>(bookingResource);

            repository.Add(booking);
            await unitOfWork.CompleteAsync();

            // await context.Rooms.Include(r => r.Building).SingleOrDefaultAsync(r => r.Id == booking.RoomId); //add the objects in the context, explicitly load that this booking is related to

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

            var booking = await repository.GetBooking(id); //1st call

            if (booking == null)
                return NotFound();

            mapper.Map<SaveBookingResource, Booking>(bookingResource, booking); //when mapping a bookingResource to booking, use a booking object that we load from db

            await unitOfWork.CompleteAsync(); //2nd call
            
            booking = await repository.GetBooking(booking.Id); //without this there's an error that says automapper cannot map //refetch this vehicle object //3rd call

            var result = mapper.Map<Booking, BookingResource>(booking); //after saving the changes, map the Booking to BookingResource

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await repository.GetBooking(id, includeRelated: false); //get a booking with this id

            if (booking == null) //check if the booking is null
                return NotFound();

            repository.Remove(booking); //otherwise, remove from context
            await unitOfWork.CompleteAsync(); //save

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