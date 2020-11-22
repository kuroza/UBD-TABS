using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Core;
using DotNetAngularApp.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DotNetAngularApp.Controllers
{
    [Route("/api/offerings")]
    public class OfferingsController : Controller
    {
        private readonly IMapper mapper;
        private readonly IOfferingRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public OfferingsController(IMapper mapper, IOfferingRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> CreateOffering([FromBody] SaveOfferingResource offeringResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var offering = mapper.Map<SaveOfferingResource, Offering>(offeringResource);

            // var roomTaken = repository.BookingRoomExist(booking);
            // var moduleTaken = repository.BookingModuleExist(booking);
            // if (roomTaken)
            //     return Conflict("The room is already taken.");
            // else if (moduleTaken)
            //     return Conflict("The module is already booked in the same time slot.");

            repository.Add(offering);
            await unitOfWork.CompleteAsync();

            offering = await repository.GetOffering(offering.Id);

            var result = mapper.Map<Offering, OfferingResource>(offering);

            return Ok(result);
        }

        [HttpPost("/api/offerings/confirm")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> ConfirmCreateOffering([FromBody] SaveOfferingResource offeringResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var offering = mapper.Map<SaveOfferingResource, Offering>(offeringResource);

            repository.Add(offering);
            await unitOfWork.CompleteAsync();

            offering = await repository.GetOffering(offering.Id);

            var result = mapper.Map<Offering, OfferingResource>(offering);

            return Ok(result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> UpdateOffering(int id, [FromBody] SaveOfferingResource offeringResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var offering = await repository.GetOffering(id);

            if (offering == null)
                return NotFound();

            mapper.Map<SaveOfferingResource, Offering>(offeringResource, offering);

            // var exist = repository.EditBookingExist(booking);
            // if (exist)
            //     return Conflict("The room in this time slot is already taken.");

            await unitOfWork.CompleteAsync();
            
            offering = await repository.GetOffering(offering.Id);

            var result = mapper.Map<Offering, OfferingResource>(offering);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> DeleteOffering(int id)
        {
            var offering = await repository.GetOffering(id, includeRelated: false);

            if (offering == null)
                return NotFound();

            repository.Remove(offering);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOffering(int id)
        {
            var offering = await repository.GetOffering(id);

            if (offering == null)
                return NotFound();

            var offeringResource = mapper.Map<Offering, OfferingResource>(offering);

            return Ok(offeringResource);
        }

        [HttpGet("/api/allofferings")]
        public async Task<IEnumerable<OfferingResource>> GetAllOfferings()
        {
            var offerings = await repository.GetAllOfferings();

            return mapper.Map<IEnumerable<Offering>, IEnumerable<OfferingResource>>(offerings);
        }
    }
}
