using System.Threading.Tasks;
using DotNetAngularApp.Models;

namespace DotNetAngularApp.Persistence
{
    public interface IBookingRepository
    {
        Task<Booking> GetBooking(int id);
    }
}