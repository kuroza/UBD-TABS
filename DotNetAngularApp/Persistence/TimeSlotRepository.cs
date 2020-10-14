using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Persistence
{
    public class TimeSlotRepository : ITimeSlotRepository
    {
        private readonly TabsDbContext context;
        public TimeSlotRepository(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<TimeSlot>> GetAllTimeSlots()
        {
            return await context.TimeSlots.ToListAsync();
        }

        public async Task<TimeSlot> GetTimeSlot(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.TimeSlots.FindAsync(id);

            return await context.TimeSlots.SingleOrDefaultAsync(t => t.Id == id);
        }

        public void Add(TimeSlot timeSlot)
        {
            context.TimeSlots.Add(timeSlot);
        }

        public void Remove(TimeSlot timeSlot)
        {
            context.Remove(timeSlot);
        }
    }
}