using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface IFacultyRepository
    {
        void Add(Faculty faculty);
        void Remove(Faculty faculty);
        Task<Faculty> FacultyNameExist(Faculty faculty);
        Task<Faculty> EditFacultyExist(Faculty faculty);
        Task<IEnumerable<Faculty>> GetAllFaculties();
        Task<Faculty> GetFaculty(int id, bool includeRelated = true);
    }
}