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
                .Include(b => b.Semester)
                .Include(b => b.TimeSlots)
                    .ThenInclude(bt => bt.TimeSlot)
                .Include(b => b.Room)
                    .ThenInclude(r => r.Building)
                .Include(b => b.Modules)
                    .ThenInclude(bm => bm.Module)
                        .ThenInclude(m => m.Lecturers)
                            .ThenInclude(l => l.Lecturer)
                .SingleOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            return await context.Bookings
                .Include(b => b.Semester)
                .Include(b => b.Room)
                    .ThenInclude(r => r.Building)
                .Include(b => b.TimeSlots)
                    .ThenInclude(bt => bt.TimeSlot)
                .Include(b => b.Modules)
                    .ThenInclude(bm => bm.Module)
                        .ThenInclude(m => m.Lecturers)
                            .ThenInclude(l => l.Lecturer)
                .ToListAsync();
        }

        // * for booking table
        public async Task<QueryResult<Booking>> GetBookings(BookingQuery queryObj)
        {
            var result = new QueryResult<Booking>();

            var query = context.Bookings
            // include semester
                .Include(b => b.Room)
                    .ThenInclude(r => r.Building)
                .Include(b => b.TimeSlots)
                    .ThenInclude(bt => bt.TimeSlot)
                .Include(b => b.Modules)
                    .ThenInclude(bm => bm.Module)
                        .ThenInclude(m => m.Lecturers)
                            .ThenInclude(l => l.Lecturer)
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
            };

            query = query.ApplyOrdering(queryObj, columnsMap);

            result.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            result.Items = await query.ToListAsync();

            return result;
        }

        public void Add(Booking booking)
        {
            context.Bookings.Add(booking);
        }

        public void Remove(Booking booking)
        {
            context.Remove(booking);
        }

        public bool BookingExist(Booking booking)
        {
            var resultContext = context.Bookings
                .Where(b => b.Room.Id == booking.RoomId && b.BookDate == booking.BookDate)
                .SelectMany(b => b.TimeSlots.Select(bt => bt.TimeSlotId))
                .AsEnumerable();

            var resultInput = booking.TimeSlots.Select(bt => bt.TimeSlotId);

            if (resultContext.Intersect(resultInput).Count() > 0)
                return true;
            else
                return false;
        }

        public bool EditBookingExist(Booking booking)
        {
            var resultContext = context.Bookings
                .Where(b => b.Room.Id == booking.RoomId && b.BookDate == booking.BookDate && b.Id != booking.Id)
                .SelectMany(b => b.TimeSlots.Select(bt => bt.TimeSlotId))
                .AsEnumerable();

            var resultInput = booking.TimeSlots.Select(bt => bt.TimeSlotId);

            if (resultContext.Intersect(resultInput).Count() > 0)
                return true;
            else
                return false;
        }
    }
}