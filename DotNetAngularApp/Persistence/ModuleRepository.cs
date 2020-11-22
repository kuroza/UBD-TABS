using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
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
                .Include(m => m.Major)
                .OrderBy(m => m.Code)
                .ToListAsync();
        }

        public async Task<Module> GetModule(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Modules.FindAsync(id);

            return await context.Modules
                .Include(m => m.Major)
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

        public async Task<Module> ModuleNameExist(Module module)
        {
            return await context.Modules.FirstOrDefaultAsync(m => m.Name == module.Name);
        }

        public async Task<Module> ModuleCodeExist(Module module)
        {
            return await context.Modules.FirstOrDefaultAsync(m => m.Code == module.Code);
        }

        public async Task<Module> EditModuleExist(Module module)
        {
            return await context.Modules.FirstOrDefaultAsync(m => m.Name == module.Name && m.Code == module.Code && m.Id != module.Id);
        }
    }
}