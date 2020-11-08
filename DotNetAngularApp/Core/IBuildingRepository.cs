using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface IBuildingRepository
    {
        void Add(Building building);
        void Remove(Building building);
        Task<Building> BuildingNameExist(Building building);
        Task<Building> EditBuildingExist(Building building);
        Task<IEnumerable<Building>> GetAllBuildings();
        Task<Building> GetBuilding(int id, bool includeRelated = true);
    }
}