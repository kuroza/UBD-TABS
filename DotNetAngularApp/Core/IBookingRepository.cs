using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface IBookingRepository
    {
        void Add(Booking booking);
        Task<IEnumerable<Booking>> GetAllBookings();
        Task<Booking> GetBooking(int id, bool includeRelated = true);
        Task<QueryResult<Booking>> GetBookings(BookingQuery filter);
        void Remove(Booking booking);
    }
}