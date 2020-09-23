using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Core.Models;
using DotNetAngularApp.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Controllers
{
    public class ModulesController : Controller
    {
        private readonly TabsDbContext context;
        private readonly IMapper mapper;
        public ModulesController(TabsDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/modules")]
        public async Task<IEnumerable<ModuleResource>> GetModules()
        {
            var modules = await context.Modules
                .Include(m => m.Lecturers)
                    .ThenInclude(ml => ml.Lecturer)
                .ToListAsync();

            return mapper.Map<List<Module>, List <ModuleResource>>(modules);
            // return modules;
        }
    }
} 