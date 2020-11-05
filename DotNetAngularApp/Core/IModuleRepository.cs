using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Core.Models;

namespace DotNetAngularApp.Core
{
    public interface IModuleRepository
    {
        void Add(Module module);
        void Remove(Module module);
        Task<Module> ModuleNameExist(Module module);
        Task<Module> ModuleCodeExist(Module module);
        Task<IEnumerable<Module>> GetAllModules();
        Task<Module> GetModule(int id, bool includeRelated = true);
    }
}