using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DotNetAngularApp.Controllers.Resources;
using DotNetAngularApp.Core.Models;
using DotNetAngularApp.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DotNetAngularApp.Controllers
{
    [AllowAnonymous]
    public class FacultiesController : Controller
    {
        private readonly TabsDbContext context;
        private readonly IMapper mapper;
        public FacultiesController(TabsDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("/api/faculties")]
        public async Task<IEnumerable<FacultyResource>> GetFaculties()
        {
            var faculties = await context.Faculties.Include(f => f.Courses).ToListAsync();
            // map to api resources instead of returning domain classes
            return mapper.Map<List<Faculty>, List<FacultyResource>>(faculties); // <source type, target type>(faculties object)
        }
    }
}