using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface IProgrammeRepository
    {
        void Add(Programme programme);
        void Remove(Programme programme);
        Task<Programme> ProgrammeNameExist(Programme programme);
        Task<Programme> EditProgrammeExist(Programme programme);
        Task<IEnumerable<Programme>> GetAllProgrammes();
        Task<Programme> GetProgramme(int id, bool includeRelated = true);
    }
}