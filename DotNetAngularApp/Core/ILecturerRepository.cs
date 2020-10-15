using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface ILecturerRepository
    {
        void Add(Lecturer lecturer);
        void Remove(Lecturer lecturer);
        Task<IEnumerable<Lecturer>> GetAllLecturers();
        Task<Lecturer> GetLecturer(int id, bool includeRelated = true);
    }
}