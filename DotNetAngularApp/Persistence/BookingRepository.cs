using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;
using DotNetAngularApp.Extensions;
using System.Collections;

namespace DotNetAngularApp.Persistence
{
    public class BookingRepository : IBookingRepository
    {
        private readonly TabsDbContext context;
        public BookingRepository(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task<Booking> GetBooking(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Bookings.FindAsync(id);

            return await context.Bookings
                .Include(b => b.TimeSlots)
                    .ThenInclude(bt => bt.TimeSlot)
                .Include(b => b.Room)
                    .ThenInclude(r => r.Building)
                .SingleOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            return await context.Bookings
                .Include(b => b.Room)
                    .ThenInclude(r => r.Building)
                .Include(b => b.TimeSlots)
                    .ThenInclude(bt => bt.TimeSlot)
                .ToListAsync();
        }

        public async Task<QueryResult<Booking>> GetBookings(BookingQuery queryObj)
        {
            var result = new QueryResult<Booking>();

            var query = context.Bookings
                .Include(b => b.Room)
                    .ThenInclude(r => r.Building)
                .Include(b => b.TimeSlots)
                    .ThenInclude(bt => bt.TimeSlot)
                .AsQueryable();

            if (queryObj.BuildingId.HasValue)
                query = query.Where(b => b.Room.BuildingId == queryObj.BuildingId.Value);
            
            if (queryObj.RoomId.HasValue)
                query = query.Where(b => b.RoomId == queryObj.RoomId.Value);

            // Dictionary for storing keys (strings) and values (from context)
            // Expression<> is a type of lambda expression
            // Func, the input for lambda expression here is Booking  // i.e. booking.Room.Name
            var columnsMap = new Dictionary<string, Expression<Func<Booking, object>>>()
            {
                ["building"] = b => b.Room.Building.Name,
                ["room"] = b => b.Room.Name,
                ["contactName"] = b => b.ContactName
            };

            query = query.ApplyOrdering(queryObj, columnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            result.Items = await query.ToListAsync();

            return result;
        }

        // todo: Check if no clash
        // public bool CheckBooking(Booking booking)
        // {
        //     // get booked timeSlots from db for room and date
        //     var result = context.Bookings
        //         .Where(b => b.RoomId == booking.RoomId && b.BookDate == booking.BookDate)
        //         .Include(b => b.TimeSlots)
        //          .ThenInclude(ts => ts.TimeSlotId)
        //         .AsQueryable();

        //     List<int> context_tId = new List<int>();
        //     // iterate timeSlots to get the booked ID
        //     foreach (var b in result)
        //     {
        //         foreach (var t in b.TimeSlots)
        //         {
        //             context_tId.Add(t.TimeSlotId);
        //         }
        //     }

        //     List<int> tId = new List<int>();
        //     // iterate to get ID from booking request
        //     foreach (var timeSlots in booking.TimeSlots)
        //     {
        //         tId.Add(timeSlots.TimeSlotId);
        //     }

        //     // compare the timeSlots ID
        //     foreach (var i in context_tId)
        //     {
        //         if (tId.Contains(i))
        //             return true;
        //     }

        //     return false;
        // }

        public void Add(Booking booking)
        {
            context.Bookings.Add(booking);
        }

        public void Remove(Booking booking)
        {
            context.Remove(booking);
        }
    }
}