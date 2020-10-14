using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Persistence
{
    public class ModuleRepository : IModuleRepository
    {
        private readonly TabsDbContext context;
        public ModuleRepository(TabsDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Module>> GetAllModules()
        {
            return await context.Modules
                .Include(m => m.Lecturers)
                    .ThenInclude(ml => ml.Lecturer)
                .ToListAsync();
        }

        public async Task<Module> GetModule(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Modules.FindAsync(id);

            return await context.Modules
                .Include(m => m.Lecturers)
                    .ThenInclude(ml => ml.Lecturer)
                .SingleOrDefaultAsync(m => m.Id == id);
        }

        public void Add(Module module)
        {
            context.Modules.Add(module);
        }

        public void Remove(Module module)
        {
            context.Remove(module);
        }
    }
}