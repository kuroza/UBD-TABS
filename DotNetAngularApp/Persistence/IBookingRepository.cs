using System.Threading.Tasks;
using DotNetAngularApp.Models;

namespace DotNetAngularApp.Persistence
{
    public interface IBookingRepository
    {
        void Add(Booking booking);
        Task<Booking> GetBooking(int id, bool includeRelated = true);
        void Remove(Booking booking);
    }
}