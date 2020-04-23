using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Core.Models;
using DotNetAngularApp.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Controllers
{
    public class BuildingsController : Controller
    {
        private readonly TabsDbContext context;
        private readonly IMapper mapper;
        public BuildingsController(TabsDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/buildings")]
        public async Task<IEnumerable<BuildingResource>> GetBuildings()
        {
            var buildings = await context.Buildings.Include(b => b.Rooms).ToListAsync();

            return mapper.Map<List<Building>, List<BuildingResource>>(buildings);
        }
    }
}