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
    [Route("/api/majors")]
    public class MajorsController : Controller
    {
        private readonly IMapper mapper;
        private readonly IMajorRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public MajorsController(IMapper mapper, IMajorRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet("/api/allmajors")]
        public async Task<IEnumerable<MajorResource>> GetAllMajors()
        {
            var majors = await repository.GetAllMajors();

            return mapper.Map<IEnumerable<Major>, IEnumerable<MajorResource>>(majors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMajor(int id)
        {
            var major = await repository.GetMajor(id);

            if (major == null)
                return NotFound();

            var majorResource = mapper.Map<Major, MajorResource>(major);

            return Ok(majorResource);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> CreateMajor([FromBody] SaveMajorResource majorResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var major = mapper.Map<SaveMajorResource, Major>(majorResource);

            var nameExist = await repository.MajorNameExist(major);
            
            if (nameExist != null)
                return Conflict("Major name already exists");

            repository.Add(major);
            await unitOfWork.CompleteAsync();

            major = await repository.GetMajor(major.Id);

            var result = mapper.Map<Major, MajorResource>(major);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> DeleteMajor(int id)
        {
            var major = await repository.GetMajor(id, includeRelated: false);

            if (major == null)
                return NotFound();

            repository.Remove(major);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> UpdateMajor(int id, [FromBody] SaveMajorResource majorResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var major = await repository.GetMajor(id);

            if (major == null)
                return NotFound();

            major = mapper.Map<SaveMajorResource, Major>(majorResource, major);
            
            var nameExist = await repository.EditMajorExist(major);
            if (nameExist != null)
                return Conflict("Major details already exist");

            await unitOfWork.CompleteAsync();
            
            major = await repository.GetMajor(major.Id);

            var result = mapper.Map<Major, MajorResource>(major);

            return Ok(result);
        }
    }
}