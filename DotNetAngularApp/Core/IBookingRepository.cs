using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface IBookingRepository
    {
        void Add(Booking booking);
        Task<Booking> GetBooking(int id, bool includeRelated = true);
        Task<IEnumerable<Booking>> GetBookings();
        void Remove(Booking booking);
    }
}