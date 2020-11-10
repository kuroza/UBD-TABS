using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Persistence
{
    public class ProgrammeRepository : IProgrammeRepository
    {
        private readonly TabsDbContext context;
        public ProgrammeRepository(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Programme>> GetAllProgrammes()
        {
            return await context.Programmes
                .Include(p => p.Faculty)
                .ToListAsync();
        }

        public async Task<Programme> GetProgramme(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Programmes.FindAsync(id);

            return await context.Programmes
                .Include(p => p.Faculty)
                .SingleOrDefaultAsync(p => p.Id == id);
        }

        public void Add(Programme programme)
        {
            context.Programmes.Add(programme);
        }

        public void Remove(Programme programme)
        {
            context.Remove(programme);
        }

        public async Task<Programme> ProgrammeNameExist(Programme programme)
        {
            return await context.Programmes.FirstOrDefaultAsync(p => p.Name == programme.Name);
        }

        public async Task<Programme> EditProgrammeExist(Programme programme)
        {
            return await context.Programmes.FirstOrDefaultAsync(p => p.Name == programme.Name && p.Id != programme.Id);
        }
    }
}