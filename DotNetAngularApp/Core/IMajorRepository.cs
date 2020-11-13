using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface IMajorRepository
    {
        void Add(Major major);
        void Remove(Major major);
        Task<Major> MajorNameExist(Major major);
        Task<Major> EditMajorExist(Major major);
        Task<IEnumerable<Major>> GetAllMajors();
        Task<Major> GetMajor(int id, bool includeRelated = true);
    }
}