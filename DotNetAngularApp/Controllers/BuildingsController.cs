using System.Collections.Generic;
using System.Threading.Tasks;
using DotNetAngularApp.Models;
using DotNetAngularApp.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Controllers
{
    public class BuildingsController : Controller
    {
        private readonly TabsDbContext context;
        public BuildingsController(TabsDbContext context)
        {
            this.context = context;
        }


        [HttpGet("/api/buildings")]
        public async Task<IEnumerable<Building>> GetBuildings()
        {
            return await context.Buildings.Include(b => b.Rooms).ToListAsync();
        }
    }
}