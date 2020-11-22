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
                .Include(b => b.BookDates)
                .Include(b => b.TimeSlots)
                    .ThenInclude(bt => bt.TimeSlot)
                .Include(b => b.Rooms)
                    .ThenInclude(br => br.Room)
                        .ThenInclude(r => r.Building)
                .Include(b => b.Modules)
                    .ThenInclude(bm => bm.Module)
                        // .ThenInclude(m => m.Lecturers)
                        //     .ThenInclude(l => l.Lecturer)
                .Include(b => b.Modules)
                    .ThenInclude(bm => bm.Module)
                        .ThenInclude(m => m.Major)
                .SingleOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            return await context.Bookings
                .Include(b => b.Semester)
                .Include(b => b.BookDates)
                .Include(b => b.Rooms)
                    .ThenInclude(br => br.Room)
                        .ThenInclude(r => r.Building)
                .Include(b => b.TimeSlots)
                    .ThenInclude(bt => bt.TimeSlot)
                .Include(b => b.Modules)
                    .ThenInclude(bm => bm.Module)
                        // .ThenInclude(m => m.Lecturers)
                        //     .ThenInclude(l => l.Lecturer)
                .Include(b => b.Modules)
                    .ThenInclude(bm => bm.Module)
                        .ThenInclude(m => m.Major)
                .OrderBy(b => b.Id)
                .ToListAsync();
        }

        // * for booking table
        public async Task<QueryResult<Booking>> GetBookings(BookingQuery queryObj)
        {
            var result = new QueryResult<Booking>();

            var query = context.Bookings
                .Include(b => b.Rooms)
                    .ThenInclude(br => br.Room)
                        .ThenInclude(r => r.Building)
                .Include(b => b.TimeSlots)
                    .ThenInclude(bt => bt.TimeSlot)
                .Include(b => b.Modules)
                    .ThenInclude(bm => bm.Module)
                        // .ThenInclude(m => m.Lecturers)
                        //     .ThenInclude(l => l.Lecturer)
                .Include(b => b.Modules)
                    .ThenInclude(bm => bm.Module)
                        .ThenInclude(m => m.Major)
                .AsQueryable();

            if (queryObj.BuildingId.HasValue)
                query = query.Where(b => b.Rooms.Any(br => br.Room.BuildingId == queryObj.BuildingId.Value));
            
            if (queryObj.RoomId.HasValue)
                query = query.Where(b => b.Rooms.Any(br => br.Room.Id == queryObj.RoomId.Value));

            // Dictionary for storing keys (strings) and values (from context)
            // Expression<> is a type of lambda expression
            // Func, the input for lambda expression here is Booking  // i.e. booking.Room.Name
            var columnsMap = new Dictionary<string, Expression<Func<Booking, object>>>()
            {
                ["building"] = b => b.Rooms.Select(br => br.Room.Building.Name),
                ["room"] = b => b.Rooms.Select(br => br.Room.Name),
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

        public bool BookingRoomExist(Booking booking)
        {
            var result = context.Bookings
                .Where(b => b.Rooms.Select(br => br.Room.Id).Any(x => booking.Rooms.Select(br => br.RoomId).Contains(x)))
                .Where(b => b.BookDates.Select(bd => bd.Date).Any(x => booking.BookDates.Select(bd => bd.Date).Contains(x)))
                .Where(b => b.TimeSlots.Select(bt => bt.TimeSlot.Id).Any(x => booking.TimeSlots.Select(bt => bt.TimeSlotId).Contains(x)))
                .Count();

            if (result > 0)
                return true;
            else
                return false;
        }

        public bool BookingModuleExist(Booking booking)
        {
            var result = context.Bookings
                .Where(b => b.Modules.Select(bm => bm.Module.Id).Any(x => booking.Modules.Select(bm => bm.ModuleId).Contains(x)))
                .Where(b => b.BookDates.Select(bd => bd.Date).Any(x => booking.BookDates.Select(bd => bd.Date).Contains(x)))
                .Where(b => b.TimeSlots.Select(bt => bt.TimeSlot.Id).Any(x => booking.TimeSlots.Select(bt => bt.TimeSlotId).Contains(x)))
                .Count();

            if (result > 0)
                return true;
            else
                return false;
        }

        // public bool EditBookingExist(Booking booking)
        // {
        //     var result = context.Bookings
        //         .Where(b => b.Id != booking.Id)
        //         .Where(b => b.Modules.Select(bm => bm.Module.Id).Any(x => booking.Modules.Select(bm => bm.ModuleId).Contains(x)))
        //         .Where(b => b.BookDates.Select(bd => bd.Date).Any(x => booking.BookDates.Select(bd => bd.Date).Contains(x)))
        //         .Where(b => b.TimeSlots.Select(bt => bt.TimeSlot.Id).Any(x => booking.TimeSlots.Select(bt => bt.TimeSlotId).Contains(x)))
        //         .Count();

        //     if (result > 0)
        //         return true;
        //     else
        //         return false;
        // }
    }
}