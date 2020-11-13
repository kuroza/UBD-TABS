using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DotNetAngularApp.Persistence
{
    public class MajorRepository : IMajorRepository
    {
        private readonly TabsDbContext context;
        public MajorRepository(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Major>> GetAllMajors()
        {
            return await context.Majors
                .Include(p => p.Faculty)
                .Include(p => p.Modules)
                .OrderBy(p => p.Name)
                .ToListAsync();
        }

        public async Task<Major> GetMajor(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Majors.FindAsync(id);

            return await context.Majors
                .Include(p => p.Faculty)
                .Include(p => p.Modules)
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public void Add(Major major)
        {
            context.Majors.Add(major);
        }

        public void Remove(Major major)
        {
            context.Remove(major);
        }

        public async Task<Major> MajorNameExist(Major major)
        {
            return await context.Majors.FirstOrDefaultAsync(p => p.Name == major.Name);
        }

        public async Task<Major> EditMajorExist(Major major)
        {
            return await context.Majors.FirstOrDefaultAsync(p => p.Name == major.Name && p.Id != major.Id);
        }
    }
}