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
    [Route("/api/lecturers")]
    public class LecturersController : Controller
    {
        private readonly IMapper mapper;
        private readonly ILecturerRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public LecturersController(IMapper mapper, ILecturerRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet("/api/alllecturers")]
        public async Task<IEnumerable<LecturerResource>> GetAllLecturers()
        {
            var lecturers = await repository.GetAllLecturers();

            return mapper.Map<IEnumerable<Lecturer>, IEnumerable<LecturerResource>>(lecturers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLecturer(int id)
        {
            var lecturer = await repository.GetLecturer(id);

            if (lecturer == null)
                return NotFound();

            var lecturerResource = mapper.Map<Lecturer, LecturerResource>(lecturer);

            return Ok(lecturerResource);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> CreateLecturer([FromBody] SaveLecturerResource lecturerResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var lecturer = mapper.Map<SaveLecturerResource, Lecturer>(lecturerResource);

            var existName = await repository.LecturerNameExist(lecturer);

            if (existName != null)
                return Conflict("Lecturer name already exists.");

            repository.Add(lecturer);
            await unitOfWork.CompleteAsync();

            lecturer = await repository.GetLecturer(lecturer.Id);

            var result = mapper.Map<Lecturer, LecturerResource>(lecturer);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> DeleteLecturer(int id)
        {
            var lecturer = await repository.GetLecturer(id, includeRelated: false);

            if (lecturer == null)
                return NotFound();

            repository.Remove(lecturer);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> UpdateLecturer(int id, [FromBody] SaveLecturerResource lecturerResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var lecturer = await repository.GetLecturer(id);

            if (lecturer == null)
                return NotFound();

            mapper.Map<SaveLecturerResource, Lecturer>(lecturerResource, lecturer);

            await unitOfWork.CompleteAsync();

            lecturer = await repository.GetLecturer(lecturer.Id);

            var result = mapper.Map<Lecturer, LecturerResource>(lecturer);

            return Ok(result);
        }
    }
}