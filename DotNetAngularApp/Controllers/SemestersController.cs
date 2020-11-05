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
    [Route("/api/semesters")]
    public class SemestersController : Controller
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly ISemesterRepository repository;
        public SemestersController(IMapper mapper, ISemesterRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpGet("/api/allsemesters")]
        public async Task<IEnumerable<SemesterResource>> GetAllSemesters()
        {
            var semesters = await repository.GetAllSemesters();

            return mapper.Map<IEnumerable<Semester>, IEnumerable<SemesterResource>>(semesters);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSemester(int id)
        {
            var semester = await repository.GetSemester(id);

            if (semester == null)
                return NotFound();

            var semesterResource = mapper.Map<Semester, SemesterResource>(semester);

            return Ok(semesterResource);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> CreateSemester([FromBody] SaveSemesterResource semesterResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var semester = mapper.Map<SaveSemesterResource, Semester>(semesterResource);

            repository.Add(semester);
            await unitOfWork.CompleteAsync();

            semester = await repository.GetSemester(semester.Id);

            var result = mapper.Map<Semester, SemesterResource>(semester);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> DeleteSemester(int id)
        {
            var semester = await repository.GetSemester(id, includeRelated: false);

            if (semester == null)
                return NotFound();

            repository.Remove(semester);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> UpdateSemester(int id, [FromBody] SaveSemesterResource semesterResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var semester = await repository.GetSemester(id);

            if (semester == null)
                return NotFound();

            mapper.Map<SaveSemesterResource, Semester>(semesterResource, semester);

            await unitOfWork.CompleteAsync();

            semester = await repository.GetSemester(semester.Id);

            var result = mapper.Map<Semester, SemesterResource>(semester);

            return Ok(result);
        }
    }
}