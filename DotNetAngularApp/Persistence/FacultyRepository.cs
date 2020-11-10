using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Persistence
{
    public class FacultyRepository : IFacultyRepository
    {
        private readonly TabsDbContext context;
        public FacultyRepository(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Faculty>> GetAllFaculties()
        {
            return await context.Faculties
                .ToListAsync();
        }

        public async Task<Faculty> GetFaculty(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Faculties.FindAsync(id);

            return await context.Faculties
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public void Add(Faculty faculty)
        {
            context.Faculties.Add(faculty);
        }

        public void Remove(Faculty faculty)
        {
            context.Remove(faculty);
        }

        public async Task<Faculty> FacultyNameExist(Faculty faculty)
        {
            return await context.Faculties.FirstOrDefaultAsync(p => p.Name == faculty.Name);
        }

        public async Task<Faculty> EditFacultyExist(Faculty faculty)
        {
            return await context.Faculties.FirstOrDefaultAsync(p => p.Name == faculty.Name && p.Id != faculty.Id);
        }
    }
}