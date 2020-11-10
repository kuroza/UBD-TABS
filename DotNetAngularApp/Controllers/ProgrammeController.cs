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
using System.Net.Http;
using System.Net;

namespace DotNetAngularApp.Controllers
{
    [Route("/api/programmes")]
    public class ProgrammesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IProgrammeRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public ProgrammesController(IMapper mapper, IProgrammeRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet("/api/allprogrammes")]
        public async Task<IEnumerable<ProgrammeResource>> GetAllProgrammes()
        {
            var programmes = await repository.GetAllProgrammes();

            return mapper.Map<IEnumerable<Programme>, IEnumerable<ProgrammeResource>>(programmes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProgramme(int id)
        {
            var programme = await repository.GetProgramme(id);

            if (programme == null)
                return NotFound();

            var programmeResource = mapper.Map<Programme, ProgrammeResource>(programme);

            return Ok(programmeResource);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> CreateProgramme([FromBody] SaveProgrammeResource programmeResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var programme = mapper.Map<SaveProgrammeResource, Programme>(programmeResource);

            var existName = await repository.ProgrammeNameExist(programme);
            
            if (existName != null)
                return Conflict("Programme name already exists.");

            repository.Add(programme);
            await unitOfWork.CompleteAsync();

            programme = await repository.GetProgramme(programme.Id);

            var result = mapper.Map<Programme, ProgrammeResource>(programme);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> DeleteProgramme(int id)
        {
            var programme = await repository.GetProgramme(id, includeRelated: false);

            if (programme == null)
                return NotFound();

            repository.Remove(programme);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> UpdateProgramme(int id, [FromBody] SaveProgrammeResource programmeResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var programme = await repository.GetProgramme(id);

            if (programme == null)
                return NotFound();

            programme = mapper.Map<SaveProgrammeResource, Programme>(programmeResource, programme);
            
            var exist = await repository.EditProgrammeExist(programme);
            if (exist != null)
                return Conflict("Programme details already exist.");

            await unitOfWork.CompleteAsync();
            
            programme = await repository.GetProgramme(programme.Id);

            var result = mapper.Map<Programme, ProgrammeResource>(programme);

            return Ok(result);
        }
    }
}