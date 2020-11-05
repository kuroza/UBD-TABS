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
    [Route("/api/buildings")]
    public class BuildingsController : Controller
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IBuildingRepository repository;
        public BuildingsController(IMapper mapper, IBuildingRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpGet("/api/allbuildings")]
        public async Task<IEnumerable<BuildingResource>> GetAllBuildings()
        {
            var buildings = await repository.GetAllBuildings();

            return mapper.Map<IEnumerable<Building>, IEnumerable<BuildingResource>>(buildings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBuilding(int id)
        {
            var building = await repository.GetBuilding(id);

            if (building == null)
                return NotFound();

            var buildingResource = mapper.Map<Building, BuildingResource>(building);

            return Ok(buildingResource);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> CreateBuilding([FromBody] SaveBuildingResource buildingResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var building = mapper.Map<SaveBuildingResource, Building>(buildingResource);

            var existName = await repository.BuildingNameExist(building);
            if (existName != null)
                return Conflict("Building name already exists.");

            repository.Add(building);
            await unitOfWork.CompleteAsync();

            building = await repository.GetBuilding(building.Id);

            var result = mapper.Map<Building, BuildingResource>(building);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> DeleteBuilding(int id)
        {
            var building = await repository.GetBuilding(id, includeRelated: false);

            if (building == null)
                return NotFound();

            repository.Remove(building);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public async Task<IActionResult> UpdateBuilding(int id, [FromBody] SaveBuildingResource buildingResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var building = await repository.GetBuilding(id);

            if (building == null)
                return NotFound();

            mapper.Map<SaveBuildingResource, Building>(buildingResource, building);

            await unitOfWork.CompleteAsync();

            building = await repository.GetBuilding(building.Id);

            var result = mapper.Map<Building, BuildingResource>(building);

            return Ok(result);
        }
    }
}