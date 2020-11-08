using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Persistence
{
    public class BuildingRepository : IBuildingRepository
    {
        private readonly TabsDbContext context;
        public BuildingRepository(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Building>> GetAllBuildings()
        {
            return await context.Buildings
                .Include(b => b.Rooms)
                .ToListAsync();
        }

        public async Task<Building> GetBuilding(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Buildings.FindAsync(id);

            return await context.Buildings.SingleOrDefaultAsync(l => l.Id == id);
        }

        public void Add(Building building)
        {
            context.Buildings.Add(building);
        }

        public void Remove(Building building)
        {
            context.Remove(building);
        }

        public async Task<Building> BuildingNameExist(Building building)
        {
            return await context.Buildings.FirstOrDefaultAsync(b => b.Name == building.Name);
        }

        public async Task<Building> EditBuildingExist(Building building)
        {
            return await context.Buildings.FirstOrDefaultAsync(b => b.Name == building.Name && b.Id != building.Id);
        }
    }
}