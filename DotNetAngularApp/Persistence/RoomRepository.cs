using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Persistence
{
    public class RoomRepository : IRoomRepository
    {
        private readonly TabsDbContext context;
        public RoomRepository(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Room>> GetAllRooms()
        {
            return await context.Rooms
                .Include(r => r.Building)
                .ToListAsync();
        }

        public async Task<Room> GetRoom(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Rooms.FindAsync(id);

            return await context.Rooms
                .Include(r => r.Building)
                .SingleOrDefaultAsync(r => r.Id == id);
        }

        public void Add(Room room)
        {
            context.Rooms.Add(room);
        }

        public void Remove(Room room)
        {
            context.Remove(room);
        }

        public async Task<Room> RoomNameExist(Room room)
        {
            return await context.Rooms.FirstOrDefaultAsync(r => r.Name == room.Name);
        }

        public async Task<Room> EditRoomExist(Room room)
        {
            return await context.Rooms.FirstOrDefaultAsync(r => r.Name == room.Name && r.Id != room.Id);
        }
    }
}