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
using AutoMapper.QueryableExtensions;
using DotNetAngularApp.Controllers.Resources;

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
                .Include(b => b.BookDates)
                .Include(b => b.Rooms)
                    .ThenInclude(br => br.Room)
                        .ThenInclude(r => r.Building)
                .Include(b => b.TimeSlots)
                    .ThenInclude(bt => bt.TimeSlot)
                .Include(b => b.Offerings)
                    .ThenInclude(bo => bo.Offering)
                        .ThenInclude(o => o.Module)
                            .ThenInclude(m => m.Major)
                .SingleOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            return await context.Bookings
                .Include(b => b.BookDates)
                .Include(b => b.Rooms)
                    .ThenInclude(br => br.Room)
                        .ThenInclude(r => r.Building)
                .Include(b => b.TimeSlots)
                    .ThenInclude(bt => bt.TimeSlot)
                .Include(b => b.Offerings)
                    .ThenInclude(bo => bo.Offering)
                        .ThenInclude(o => o.Module)
                            .ThenInclude(m => m.Major)
                .OrderBy(b => b.Id)
                .ToListAsync();
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

        // public bool BookingModuleExist(Booking booking)
        // {
        //     var result = context.Bookings
        //         .Where(b => b.Modules.Select(bm => bm.Module.Id).Any(x => booking.Modules.Select(bm => bm.ModuleId).Contains(x)))
        //         .Where(b => b.BookDates.Select(bd => bd.Date).Any(x => booking.BookDates.Select(bd => bd.Date).Contains(x)))
        //         .Where(b => b.TimeSlots.Select(bt => bt.TimeSlot.Id).Any(x => booking.TimeSlots.Select(bt => bt.TimeSlotId).Contains(x)))
        //         .Count();

        //     if (result > 0)
        //         return true;
        //     else
        //         return false;
        // }

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