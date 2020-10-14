using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface IRoomRepository
    {
        void Add(Room room);
        void Remove(Room room);
        Task<IEnumerable<Room>> GetAllRooms();
        Task<Room> GetRoom(int id, bool includeRelated = true);
    }
}