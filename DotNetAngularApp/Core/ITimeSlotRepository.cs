using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface ITimeSlotRepository
    {
        void Add(TimeSlot timeSlot);
        void Remove(TimeSlot timeSlot);
        Task<IEnumerable<TimeSlot>> GetAllTimeSlots();
        Task<TimeSlot> GetTimeSlot(int id, bool includeRelated = true);
    }
}