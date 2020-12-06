using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface IBookingRepository
    {
        void Add(Booking booking);
        void Remove(Booking booking);
        bool BookingRoomExist(Booking booking);
        bool BookingOfferingExist(Booking booking);
        bool EditBookingRoomExist(Booking booking);
        bool EditBookingOfferingExist(Booking booking);
        Task<IEnumerable<Booking>> GetAllBookings();
        Task<Booking> GetBooking(int id, bool includeRelated = true);
    }
}