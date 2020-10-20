using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface ISemesterRepository
    {
        void Add(Semester semester);
        void Remove(Semester semester);
        Task<IEnumerable<Semester>> GetAllSemesters();
        Task<Semester> GetSemester(int id, bool includeRelated = true);
    }
}