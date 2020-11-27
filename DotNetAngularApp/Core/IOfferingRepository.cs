using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface IOfferingRepository
    {
        void Add(Offering offering);
        void Remove(Offering offering);
        bool ModuleOfferingExist(Offering offering);
        // bool EditOfferingExist(Offering offering);
        Task<IEnumerable<Offering>> GetAllOfferings();
        Task<Offering> GetOffering(int id, bool includeRelated = true);
        Task<Offering> GetModuleOffering(int id, bool includeRelated = true);
    }
}