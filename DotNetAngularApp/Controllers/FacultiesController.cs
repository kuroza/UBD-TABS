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
    [Route("/api/faculties")]
    public class FacultiesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IFacultyRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public FacultiesController(IMapper mapper, IFacultyRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet("/api/allfaculties")]
        public async Task<IEnumerable<FacultyResource>> GetAllFaculties()
        {
            var faculties = await repository.GetAllFaculties();

            return mapper.Map<IEnumerable<Faculty>, IEnumerable<FacultyResource>>(faculties);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFaculty(int id)
        {
            var faculty = await repository.GetFaculty(id);

            if (faculty == null)
                return NotFound();

            var facultyResource = mapper.Map<Faculty, FacultyResource>(faculty);

            return Ok(facultyResource);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> CreateFaculty([FromBody] SaveFacultyResource facultyResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var faculty = mapper.Map<SaveFacultyResource, Faculty>(facultyResource);

            var nameExist = await repository.FacultyNameExist(faculty);
            
            if (nameExist != null)
                return Conflict("Faculty name already exists");

            repository.Add(faculty);
            await unitOfWork.CompleteAsync();

            faculty = await repository.GetFaculty(faculty.Id);

            var result = mapper.Map<Faculty, FacultyResource>(faculty);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> DeleteFaculty(int id)
        {
            var faculty = await repository.GetFaculty(id, includeRelated: false);

            if (faculty == null)
                return NotFound();

            repository.Remove(faculty);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> UpdateFaculty(int id, [FromBody] SaveFacultyResource facultyResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var faculty = await repository.GetFaculty(id);

            if (faculty == null)
                return NotFound();

            faculty = mapper.Map<SaveFacultyResource, Faculty>(facultyResource, faculty);
            
            var nameExist = await repository.EditFacultyExist(faculty);
            if (nameExist != null)
                return Conflict("Faculty details already exist");

            await unitOfWork.CompleteAsync();
            
            faculty = await repository.GetFaculty(faculty.Id);

            var result = mapper.Map<Faculty, FacultyResource>(faculty);

            return Ok(result);
        }
    }
}