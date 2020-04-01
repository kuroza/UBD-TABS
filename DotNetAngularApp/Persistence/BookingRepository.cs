using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;
using DotNetAngularApp.Extensions;

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

            return await context.Bookings //read booking from db
                .Include(b => b.TimeSlots) //eager load TimeSlots here
                    .ThenInclude(bt => bt.TimeSlot) //eager load nested objects
                .Include(b => b.Room) //eager load room also
                    .ThenInclude(r => r.Building) //when eager loading the room, we should also include the building
                .SingleOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<Booking>> GetBookings(BookingQuery queryObj)
        {
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

            var columnsMap = new Dictionary<string, Expression<Func<Booking, object>>>()
            {
                ["building"] = b => b.Room.Building.Name,
                ["room"] = b => b.Room.Name,
                ["contactName"] = b => b.ContactName
            };

            query = query.ApplyOrdering(queryObj, columnsMap);

            return await query.ToListAsync();
        }

        // //if you want to only load a Booking and its Room
        // public async Task<Booking> GetBookingWithRoom(int id)
        // {
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