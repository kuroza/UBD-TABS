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

        // public async Task<QueryResult<Module>> GetModules(ModuleQuery queryObj)
        // {
        //     var result = new QueryResult<Module>();

        //     var query = context.Modules
        //         .Include(m => m.Lecturers)
        //             .ThenInclude(ml => ml.Lecturer)
        //         .AsQueryable();

        //     if (queryObj.LecturerId.HasValue)
        //         query = query.Where(m => m.Module.LecturerId == queryObj.BuildingId.Value);
            
        //     if (queryObj.RoomId.HasValue)
        //         query = query.Where(b => b.RoomId == queryObj.RoomId.Value);

        //     // Dictionary for storing keys (strings) and values (from context)
        //     // Expression<> is a type of lambda expression
        //     // Func, the input for lambda expression here is Booking  // i.e. booking.Room.Name
        //     var columnsMap = new Dictionary<string, Expression<Func<Module, object>>>()
        //     {
        //         ["building"] = b => b.Room.Building.Name,
        //         ["room"] = b => b.Room.Name,
        //     };

        //     query = query.ApplyOrdering(queryObj, columnsMap);

        //     result.TotalItems = await query.CountAsync();

        //     query = query.ApplyPaging(queryObj);

        //     result.Items = await query.ToListAsync();

        //     return result;
        // }

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
    }
}