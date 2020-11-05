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
    [Route("/api/timeslots")]
    public class TimeSlotsController : Controller
    {
        private readonly IMapper mapper;
        private readonly ITimeSlotRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public TimeSlotsController(IMapper mapper, ITimeSlotRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpGet("/api/alltimeslots")]
        public async Task<IEnumerable<TimeSlotResource>> GetAllTimeSlots()
        {
            var timeSlots = await repository.GetAllTimeSlots();

            return mapper.Map<IEnumerable<TimeSlot>, IEnumerable<TimeSlotResource>>(timeSlots);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTimeSlot(int id)
        {
            var timeSlot = await repository.GetTimeSlot(id);

            if (timeSlot == null)
                return NotFound();

            var timeSlotResource = mapper.Map<TimeSlot, TimeSlotResource>(timeSlot);

            return Ok(timeSlotResource);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> CreateTimeSlot([FromBody] SaveTimeSlotResource timeSlotResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var timeSlot = mapper.Map<SaveTimeSlotResource, TimeSlot>(timeSlotResource);

            repository.Add(timeSlot);
            await unitOfWork.CompleteAsync();

            timeSlot = await repository.GetTimeSlot(timeSlot.Id);

            var result = mapper.Map<TimeSlot, TimeSlotResource>(timeSlot);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> DeleteTimeSlot(int id)
        {
            var timeSlot = await repository.GetTimeSlot(id, includeRelated: false);

            if (timeSlot == null)
                return NotFound();

            repository.Remove(timeSlot);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> UpdateTimeSlot(int id, [FromBody] SaveTimeSlotResource timeSlotResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var timeSlot = await repository.GetTimeSlot(id);

            if (timeSlot == null)
                return NotFound();

            mapper.Map<SaveTimeSlotResource, TimeSlot>(timeSlotResource, timeSlot);

            await unitOfWork.CompleteAsync();

            timeSlot = await repository.GetTimeSlot(timeSlot.Id);

            var result = mapper.Map<TimeSlot, TimeSlotResource>(timeSlot);

            return Ok(result);
        }
    }
}