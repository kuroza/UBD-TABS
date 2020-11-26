using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DotNetAngularApp.Persistence
{
    public class SemesterRepository : ISemesterRepository
    {
        private readonly TabsDbContext context;
        public SemesterRepository(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Semester>> GetAllSemesters()
        {
            return await context.Semesters
                .OrderByDescending(s => s.Session)
                .ToListAsync();
        }

        public async Task<Semester> GetSemester(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Semesters.FindAsync(id);

            return await context.Semesters
                .SingleOrDefaultAsync(s => s.Id == id);
        }

        public void Add(Semester semester)
        {
            context.Semesters.Add(semester);
        }

        public void Remove(Semester semester)
        {
            context.Remove(semester);
        }
    }
}