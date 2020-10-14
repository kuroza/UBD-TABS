using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using DotNetAngularApp.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Controllers
{
    [Route("/api/modules")]
    public class ModulesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IModuleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public ModulesController(IMapper mapper, IModuleRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateModule([FromBody] SaveModuleResource moduleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var module = mapper.Map<SaveModuleResource, Module>(moduleResource);

            repository.Add(module);
            await unitOfWork.CompleteAsync();

            module = await repository.GetModule(module.Id);

            var result = mapper.Map<Module, ModuleResource>(module);

            return Ok(result);
        }

        [HttpGet("/api/allmodules")]
        public async Task<IEnumerable<ModuleResource>> GetAllModules()
        {
            var modules = await repository.GetAllModules();

            return mapper.Map<IEnumerable<Module>, IEnumerable<ModuleResource>>(modules);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetModule(int id)
        {
            var module = await repository.GetModule(id);

            if (module == null)
                return NotFound();

            var moduleResource = mapper.Map<Module, ModuleResource>(module);

            return Ok(moduleResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModule(int id)
        {
            var module = await repository.GetModule(id, includeRelated: false);

            if (module == null)
                return NotFound();

            repository.Remove(module);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateModule(int id, [FromBody] SaveModuleResource moduleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var module = await repository.GetModule(id);

            if (module == null)
                return NotFound();

            mapper.Map<SaveModuleResource, Module>(moduleResource, module);

            await unitOfWork.CompleteAsync();
            
            module = await repository.GetModule(module.Id);

            var result = mapper.Map<Module, ModuleResource>(module);

            return Ok(result);
        }
    }
}