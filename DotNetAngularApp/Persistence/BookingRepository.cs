using System.Threading.Tasks;
using DotNetAngularApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Persistence
{
    public class BookingRepository : IBookingRepository
    {
        private readonly TabsDbContext context;
        public BookingRepository(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task<Booking> GetBooking(int id)
        {
            return await context.Bookings //read booking from db
                .Include(b => b.TimeSlots) //eager load TimeSlots here
                    .ThenInclude(bt => bt.TimeSlot) //eager load nested objects
                .Include(b => b.Room) //eager load room also
                    .ThenInclude(r => r.Building) //when eager loading the room, we should also include the building
                .SingleOrDefaultAsync(b => b.Id == id);
        }
    }
}